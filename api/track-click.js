// Track button clicks and quiz completions using Supabase
import { trackClick, trackQuizCompletion } from './supabase-client.js';

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
    const { buttonType, score, percentage } = req.body;

    if (!buttonType) {
      return res.status(400).json({ error: 'Button type is required' });
    }

    const timestamp = new Date().toISOString();

    // Track quiz completion with score data
    if (buttonType === 'quiz-complete' && score !== undefined && score !== null) {
      try {
        await trackQuizCompletion(score, percentage, 10); // Assuming 10 questions
        await trackClick(buttonType);
        
        return res.status(200).json({
          success: true,
          buttonType,
          score,
          percentage,
          timestamp
        });
      } catch (error) {
        console.error('Error tracking quiz completion:', error);
        // Continue to track as regular click if Supabase fails
      }
    }

    // Track regular click
    try {
      await trackClick(buttonType);
      
      return res.status(200).json({
        success: true,
        buttonType,
        timestamp
      });
    } catch (error) {
      console.error('Error tracking click:', error);
      return res.status(500).json({ 
        error: 'Failed to track click',
        details: error.message 
      });
    }

  } catch (error) {
    console.error('Error tracking click:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
