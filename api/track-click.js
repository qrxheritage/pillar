// Vercel Serverless Function to track button clicks
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { buttonType } = req.body;

    if (!buttonType) {
      return res.status(400).json({ error: 'Button type is required' });
    }

    // Increment the specific button click count
    const clickCount = await kv.incr(`clicks:${buttonType}`);
    
    // Also increment total clicks
    await kv.incr('clicks:total');

    // Record timestamp
    const timestamp = new Date().toISOString();
    await kv.lpush(`clicks:${buttonType}:history`, timestamp);
    
    // Keep only last 1000 entries
    await kv.ltrim(`clicks:${buttonType}:history`, 0, 999);

    return res.status(200).json({
      success: true,
      buttonType,
      clickCount,
      timestamp
    });

  } catch (error) {
    console.error('Error tracking click:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

