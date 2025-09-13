import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { path } = request.query;
  const targetPath = Array.isArray(path) ? path.join('/') : path;

  const robloxApiBaseUrl = 'https://friends.roblox.com';
  const fullRobloxUrl = `${robloxApiBaseUrl}/${targetPath}${request.url?.includes('?') ? '?' + request.url.split('?')[1] : ''}`;

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

    const data = await robloxResponse.buffer();
    response.status(robloxResponse.status).send(data);

  } catch (error) {
    console.error(`Error proxying request to ${fullRobloxUrl}:`, error);
    response.status(500).json({ error: 'Internal server error while proxying Roblox API request.' });
  }
}