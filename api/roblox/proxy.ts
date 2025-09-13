import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(request: VercelRequest, response: VercelResponse) {
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

  const fullRobloxUrl = `${robloxApiBaseUrl}/${robloxPath}${request.url?.includes('?') ? '&' + request.url.split('?')[1].split('&').filter(param => !param.startsWith('service=') && !param.startsWith('robloxPath=')).join('&') : ''}`;

  try {
    const headersToForward: Record<string, string> = {};
    for (const key in request.headers) {
      if (!['host', 'connection', 'content-length', 'x-vercel-forwarded-for', 'x-real-ip', 'x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto', 'x-vercel-deployment-url'].includes(key.toLowerCase())) {
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
      if (!['transfer-encoding', 'content-encoding', 'set-cookie'].includes(name.toLowerCase())) {
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