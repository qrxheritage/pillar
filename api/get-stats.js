// Local JSON-based function to get analytics statistics
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data file
const DATA_FILE = path.join(__dirname, '..', 'data', 'clicks.json');

// Read data from JSON file
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {
        total: 0,
        buttons: {},
        history: {}
      };
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return {
      total: 0,
      buttons: {},
      history: {}
    };
  }
}

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
    // Read data
    const data = readData();

    // Get quiz-related counts only
    const quizClicks = data.buttons['quiz'] || 0;
    const quizCompletions = data.buttons['quiz-complete'] || 0;

    // Calculate completion rate (quiz completions / quiz button clicks)
    const completionRate = quizClicks > 0 
      ? ((quizCompletions / quizClicks) * 100).toFixed(2) 
      : 0;

    // Calculate average score
    let averageScore = 0;
    let averagePercentage = 0;
    if (data.quizScores && data.quizScores.length > 0) {
      const totalScore = data.quizScores.reduce((sum, item) => sum + item.score, 0);
      const totalPercentage = data.quizScores.reduce((sum, item) => sum + item.percentage, 0);
      averageScore = (totalScore / data.quizScores.length).toFixed(2);
      averagePercentage = (totalPercentage / data.quizScores.length).toFixed(2);
    }

    // Get recent scores (last 10)
    const recentScores = data.quizScores ? data.quizScores.slice(-10).reverse() : [];

    return res.status(200).json({
      success: true,
      stats: {
        quizClicks,
        quizCompletions,
        completionRate: `${completionRate}%`,
        averageScore: averageScore,
        averagePercentage: `${averagePercentage}%`,
        totalAttempts: data.quizScores ? data.quizScores.length : 0
      },
      recentScores: recentScores,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
