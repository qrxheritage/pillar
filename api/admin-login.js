// Admin login authentication using Supabase
import crypto from 'crypto';
import { createSession } from './supabase-client.js';

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_EXPIRY_HOURS = 24; // Token expires after 24 hours

// Simple token generation
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

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
      const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
      
      try {
        await createSession(username, token, expiresAt);
        
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          token: token,
          expiresIn: TOKEN_EXPIRY_HOURS * 3600
        });
      } catch (error) {
        console.error('Failed to create session:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to create session'
        });
      }
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
