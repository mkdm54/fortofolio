import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { userId } = request.query;

  if (!userId) {
    return response.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const robloxApiUrl = `https://users.roblox.com/v1/users/${userId}`;
    const robloxResponse = await fetch(robloxApiUrl);

    if (!robloxResponse.ok) {
      const errorText = await robloxResponse.text();
      console.error(`Roblox API error for user ${userId}: ${robloxResponse.status} - ${errorText}`);
      return response.status(robloxResponse.status).json({ error: `Failed to fetch user data from Roblox: ${errorText}` });
    }

    const data = await robloxResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error in Vercel Serverless Function:', error);
    return response.status(500).json({ error: 'Internal server error while fetching Roblox user data.' });
  }
}