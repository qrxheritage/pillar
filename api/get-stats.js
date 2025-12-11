// Vercel Serverless Function to get analytics statistics
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get all click counts
    const totalClicks = await kv.get('clicks:total') || 0;
    const modelClicks = await kv.get('clicks:3d-model') || 0;
    const feedbackClicks = await kv.get('clicks:feedback') || 0;
    const quizClicks = await kv.get('clicks:quiz') || 0;
    const quizStarts = await kv.get('clicks:quiz-start') || 0;
    const quizCompletions = await kv.get('clicks:quiz-complete') || 0;

    // Calculate completion rate (quiz completions / quiz button clicks)
    const completionRate = quizClicks > 0 
      ? ((quizCompletions / quizClicks) * 100).toFixed(2) 
      : 0;

    // Calculate quiz engagement (quiz starts / quiz button clicks)
    const engagementRate = quizClicks > 0
      ? ((quizStarts / quizClicks) * 100).toFixed(2)
      : 0;

    // Get recent click history for quiz
    const quizHistory = await kv.lrange('clicks:quiz:history', 0, 99) || [];

    return res.status(200).json({
      success: true,
      stats: {
        totalClicks,
        modelClicks,
        feedbackClicks,
        quizClicks,
        quizStarts,
        quizCompletions,
        completionRate: `${completionRate}%`,
        engagementRate: `${engagementRate}%`,
        recentQuizClicks: quizHistory.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

