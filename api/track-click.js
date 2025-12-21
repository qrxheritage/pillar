// Local JSON-based function to track button clicks
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRedisClient, getJson, setJson } from './redis-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data file (local fallback)
const DATA_FILE = path.join(__dirname, '..', 'data', 'clicks.json');

// Initialize data structure
function initializeData() {
  return {
    total: 0,
    buttons: {},
    history: {}
  };
}

// Local filesystem read/write (fallback)
function ensureLocalFile() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    try { fs.mkdirSync(dataDir, { recursive: true }); } catch (e) {}
  }
  if (!fs.existsSync(DATA_FILE)) {
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(initializeData(), null, 2)); } catch (e) {}
  }
}

function readLocalData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      ensureLocalFile();
      return initializeData();
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local data:', error);
    return initializeData();
  }
}

function writeLocalData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing local data:', error);
    throw error;
  }
}

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

    // Determine storage method: Redis if configured, otherwise local file
    const redis = getRedisClient();
    let data;

    if (redis) {
      data = await getJson('pillar:clicks', initializeData());
      if (!data) data = initializeData();
    } else {
      data = readLocalData();
    }

    // Initialize button data if it doesn't exist
    if (!data.buttons[buttonType]) {
      data.buttons[buttonType] = 0;
    }
    if (!data.history[buttonType]) {
      data.history[buttonType] = [];
    }

    // Increment counts
    data.buttons[buttonType]++;
    data.total++;

    // Record timestamp
    const timestamp = new Date().toISOString();
    
    // For quiz completion, store score data
    if (buttonType === 'quiz-complete' && score !== undefined && score !== null) {
      if (!data.quizScores) {
        data.quizScores = [];
      }
      console.log('Storing quiz score:', { score, percentage, timestamp });
      data.quizScores.push({
        score: score,
        percentage: percentage,
        timestamp: timestamp
      });
      
      // Keep only last 1000 scores
      if (data.quizScores.length > 1000) {
        data.quizScores = data.quizScores.slice(-1000);
      }
    } else if (buttonType === 'quiz-complete') {
      console.log('Quiz completion received without score data:', { score, percentage });
    }
    
    data.history[buttonType].push(timestamp);

    // Keep only last 1000 entries
    if (data.history[buttonType].length > 1000) {
      data.history[buttonType] = data.history[buttonType].slice(-1000);
    }

    // Write updated data
    if (redis) {
      try {
        await setJson('pillar:clicks', data);
      } catch (err) {
        console.error('Failed to write to Redis, falling back to local file:', err);
        try { writeLocalData(data); } catch (e) { console.error('Local fallback failed:', e); }
      }
    } else {
      writeLocalData(data);
    }

    return res.status(200).json({
      success: true,
      buttonType,
      clickCount: data.buttons[buttonType],
      timestamp
    });

  } catch (error) {
    console.error('Error tracking click:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
