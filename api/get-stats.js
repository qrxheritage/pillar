// Get analytics statistics from Supabase
import { getClickStats, getQuizStats } from './supabase-client.js';

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
    // Get click statistics
    const clickStats = await getClickStats();
    if (!clickStats) {
      return res.status(500).json({ error: 'Failed to retrieve click statistics' });
    }

    // Get quiz statistics
    const quizStats = await getQuizStats();
    if (!quizStats) {
      return res.status(500).json({ error: 'Failed to retrieve quiz statistics' });
    }

    // Get quiz-related counts
    const quizClicks = clickStats.buttons['quiz'] || 0;
    const quizCompletions = clickStats.buttons['quiz-complete'] || 0;

    // Calculate completion rate
    const completionRate = quizClicks > 0 
      ? ((quizCompletions / quizClicks) * 100).toFixed(2) 
      : 0;

    return res.status(200).json({
      success: true,
      stats: {
        quizClicks,
        quizCompletions,
        completionRate: `${completionRate}%`,
        averageScore: quizStats.averageScore,
        averagePercentage: `${quizStats.averagePercentage}%`,
        totalAttempts: quizStats.totalAttempts
      },
      recentScores: quizStats.recentScores,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
