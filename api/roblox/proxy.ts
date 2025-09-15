import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  console.log('Roblox proxy function invoked.');

  // Set CORS headers for all responses
  response.setHeader('Access-Control-Allow-Origin', 'https://just-about-me.vercel.app');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-TOKEN, Content-Type, Authorization');
  response.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  const { service, robloxPath } = request.query;

  if (!service || !robloxPath) {
    console.error('Missing service or robloxPath in query parameters.');
    return response.status(400).json({ error: 'Service and robloxPath are required query parameters.' });
  }

  let robloxApiBaseUrl: string;
  let useBufferForResponse = false; // Default to false

  switch (service) {
    case 'users':
      robloxApiBaseUrl = 'https://users.roblox.com';
      break;
    case 'thumbnails':
      robloxApiBaseUrl = 'https://thumbnails.roblox.com';
      useBufferForResponse = true; // Thumbnails API returns image data
      break;
    case 'friends':
      robloxApiBaseUrl = 'https://friends.roblox.com';
      break;
    case 'avatar':
      robloxApiBaseUrl = 'https://avatar.roblox.com';
      // Explicitly set useBufferForResponse to false for avatar, as it's expected to be JSON
      useBufferForResponse = false;
      break;
    case 'catalog':
      robloxApiBaseUrl = 'https://catalog.roblox.com';
      break;
    default:
      console.error(`Unsupported Roblox API service: ${service}`);
      return response.status(400).json({ error: `Unsupported Roblox API service: ${service}` });
  }

  // Construct the full Roblox URL, filtering out proxy-specific query parameters
  const queryParams = Object.keys(request.query)
    .filter(key => key !== 'service' && key !== 'robloxPath')
    .map(key => `${key}=${request.query[key]}`)
    .join('&');

  const fullRobloxUrl = `${robloxApiBaseUrl}/${robloxPath}${queryParams ? `?${queryParams}` : ''}`;

  try {
    const headersToForward: Record<string, string> = {};
    for (const key in request.headers) {
      // Filter out headers that should not be forwarded or are handled by Vercel
      if (!['host', 'connection', 'content-length', 'x-vercel-forwarded-for', 'x-real-ip', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto', 'x-vercel-deployment-url', 'origin', 'referer'].includes(key.toLowerCase())) {
        const headerValue = request.headers[key];
        if (typeof headerValue === 'string') {
          headersToForward[key] = headerValue;
        } else if (Array.isArray(headerValue)) {
          headersToForward[key] = headerValue.join(',');
        }
      }
    }

    // Add a default User-Agent if not present, or ensure it's forwarded
    if (!headersToForward['user-agent'] && request.headers['user-agent']) {
        headersToForward['user-agent'] = request.headers['user-agent'] as string;
    } else if (!headersToForward['user-agent']) {
        headersToForward['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'; // Generic user agent
    }

    // Only include body for POST/PUT requests if request.body exists
    const requestBody = (request.method === 'POST' || request.method === 'PUT') && request.body
      ? JSON.stringify(request.body)
      : undefined;

    // Log outgoing request details
    console.log(`Proxying ${request.method} request to: ${fullRobloxUrl}`);
    console.log('Request Headers (to Roblox):', headersToForward);
    if (requestBody) {
      console.log('Request Body (to Roblox):', requestBody);
    }

    const robloxResponse = await fetch(fullRobloxUrl, {
      method: request.method,
      headers: headersToForward,
      body: requestBody,
      // Removed redirect: 'manual' to allow node-fetch to follow redirects by default
    });

    // Log incoming response details from Roblox
    console.log(`Received response from Roblox API for ${fullRobloxUrl}: Status ${robloxResponse.status} ${robloxResponse.statusText}`);
    console.log('Response Headers from Roblox:', Object.fromEntries(robloxResponse.headers.entries()));

    // Forward Roblox's status code
    response.status(robloxResponse.status);

    robloxResponse.headers.forEach((value, name) => {
      // Filter out headers that might cause issues or are handled by Vercel/CORS
      if (!['transfer-encoding', 'content-encoding', 'set-cookie', 'access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers'].includes(name.toLowerCase())) {
        response.setHeader(name, value);
      }
    });

    const csrfToken = robloxResponse.headers.get('x-csrf-token');
    if (csrfToken) {
      response.setHeader('x-csrf-token', csrfToken);
      console.log('X-CSRF-TOKEN found and forwarded.');
    } else {
      console.log('X-CSRF-TOKEN not found in Roblox response headers.');
    }

    if (useBufferForResponse) {
      const data = await robloxResponse.buffer();
      response.send(data);
    } else {
      const contentType = robloxResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          const data = await robloxResponse.json();
          response.json(data);
        } catch (jsonError) {
          console.error(`Failed to parse Roblox response as JSON for ${fullRobloxUrl} (Status: ${robloxResponse.status}):`, jsonError);
          const textData = await robloxResponse.text();
          response.send(textData); // Send raw text if JSON parsing fails
        }
      } else {
        const textData = await robloxResponse.text();
        response.send(textData); // Send as text if not JSON
      }
    }

  } catch (error) {
    console.error(`Unhandled error in proxy for ${fullRobloxUrl}:`, error);
    // If an error occurs before we can get a status from Roblox, default to 500
    if (!response.headersSent) {
      response.status(500).json({ error: 'Internal server error while proxying Roblox API request.', details: (error as Error).message });
    }
  }
}