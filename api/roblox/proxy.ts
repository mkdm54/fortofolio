import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Set CORS headers for all responses
  response.setHeader('Access-Control-Allow-Origin', 'https://just-about-me.vercel.app'); // Mengganti '*' dengan domain Vercel spesifik Anda
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-TOKEN, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  const { service, robloxPath } = request.query;

  if (!service || !robloxPath) {
    return response.status(400).json({ error: 'Service and robloxPath are required query parameters.' });
  }

  let robloxApiBaseUrl: string;
  let useBufferForResponse = false;

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
      break;
    case 'catalog':
      robloxApiBaseUrl = 'https://catalog.roblox.com';
      break;
    default:
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

    const robloxResponse = await fetch(fullRobloxUrl, {
      method: request.method,
      headers: headersToForward,
      body: request.method === 'POST' || request.method === 'PUT' ? JSON.stringify(request.body) : undefined,
    });

    robloxResponse.headers.forEach((value, name) => {
      // Filter out headers that might cause issues or are handled by Vercel/CORS
      if (!['transfer-encoding', 'content-encoding', 'set-cookie', 'access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers'].includes(name.toLowerCase())) {
        response.setHeader(name, value);
      }
    });

    const csrfToken = robloxResponse.headers.get('x-csrf-token');
    if (csrfToken) {
      response.setHeader('x-csrf-token', csrfToken);
    }

    if (useBufferForResponse) {
      const data = await robloxResponse.buffer();
      response.status(robloxResponse.status).send(data);
    } else {
      const data = await robloxResponse.json();
      response.status(robloxResponse.status).json(data);
    }

  } catch (error) {
    console.error(`Error proxying request to ${fullRobloxUrl}:`, error);
    response.status(500).json({ error: 'Internal server error while proxying Roblox API request.' });
  }
}