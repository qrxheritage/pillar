// Local development server with API endpoints
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import trackClickHandler from './api/track-click.js';
import getStatsHandler from './api/get-stats.js';
import adminLoginHandler from './api/admin-login.js';
import { verifyToken, logout } from './api/admin-login.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting for login endpoint (prevent brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per windowMs
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration - restrict to allowed origins
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Middleware (now async due to Redis)
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (token && await verifyToken(token)) {
    next(); // Token is valid, proceed
  } else {
    // No token or invalid token
    res.redirect('/login.html');
  }
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve dashboard.html explicitly before API routes
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// API Routes
app.post('/api/track-click', async (req, res) => {
  await trackClickHandler(req, res);
});

app.get('/api/get-stats', authMiddleware, async (req, res) => {
  await getStatsHandler(req, res);
});

app.post('/api/admin-login', loginLimiter, async (req, res) => {
  await adminLoginHandler(req, res);
});

// Logout endpoint
app.post('/api/admin-logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    logout(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Catch-all for SPA routing - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`📝 Quiz: http://localhost:${PORT}/quiz.html`);
  console.log(`\n💾 Using local JSON file storage (data/clicks.json)`);
});
