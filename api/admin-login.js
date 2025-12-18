// Admin login authentication
import crypto from 'crypto';
import 'dotenv/config';
import { Redis } from '@upstash/redis';

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_EXPIRY_HOURS = 24; // Token expires after 24 hours

// Initialize Redis client if available (for Vercel deployment)
let redis = null;
try {
  if (process.env.REDIS_URL) {
    redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.log('Redis not available, using in-memory sessions');
}

// Simple token generation
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Store active sessions (in-memory fallback for local development)
export const activeSessions = new Map();

// Session storage abstraction
const SessionStore = {
  async set(token, data) {
    const expiryTime = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    const sessionData = { ...data, expiryTime };
    
    if (redis) {
      // Store in Redis with expiration
      await redis.setex(`session:${token}`, TOKEN_EXPIRY_HOURS * 3600, JSON.stringify(sessionData));
    } else {
      // Fall back to in-memory storage
      activeSessions.set(token, sessionData);
    }
  },

  async get(token) {
    if (redis) {
      const data = await redis.get(`session:${token}`);
      return data ? JSON.parse(data) : null;
    } else {
      return activeSessions.get(token);
    }
  },

  async delete(token) {
    if (redis) {
      await redis.del(`session:${token}`);
    } else {
      activeSessions.delete(token);
    }
  },

  async exists(token) {
    if (redis) {
      const exists = await redis.exists(`session:${token}`);
      return exists === 1;
    } else {
      return activeSessions.has(token);
    }
  }
};

export default async function handler(req, res) {
  // Set CORS headers - restrict to allowed origins from server.js
  const origin = req.headers.origin || 'http://localhost:3000';
  const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
  
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username and password are required' 
      });
    }

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate session token
      const token = generateToken();
      
      await SessionStore.set(token, {
        username: username,
        loginTime: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token: token,
        expiresIn: TOKEN_EXPIRY_HOURS * 3600
      });
    } else {
      // Invalid credentials
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
}

// Export function to verify token
export async function verifyToken(token) {
  if (!token) return false;
  
  try {
    const session = await SessionStore.get(token);
    
    if (!session) {
      return false;
    }
    
    // Check if token has expired
    if (Date.now() > session.expiryTime) {
      await SessionStore.delete(token);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

// Export function to logout (invalidate token)
export async function logout(token) {
  if (token) {
    await SessionStore.delete(token);
  }
}
