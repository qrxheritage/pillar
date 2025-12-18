// Verify admin authentication

// Simple in-memory session storage (in production, use Redis or database)
const activeSessions = new Map();

export function verifyToken(token) {
  return activeSessions.has(token);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        authenticated: false 
      });
    }

    // For this simple implementation, any valid session storage token is accepted
    // In production, verify against your session storage
    const isValid = token && token.length > 0;

    return res.status(200).json({
      success: true,
      authenticated: isValid
    });

  } catch (error) {
    console.error('Auth verification error:', error);
    return res.status(500).json({ 
      success: false,
      authenticated: false 
    });
  }
}
