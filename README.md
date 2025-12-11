# Rumah Penghulu Abu Seman - Pillars Educational Website

An interactive educational website about the traditional Malay architecture of Rumah Penghulu Abu Seman, featuring 3D models, videos, and analytics tracking.

## Features

- 📱 Responsive design with multi-language support (English, Malay, Chinese)
- 🎨 Interactive 3D model viewer
- 📊 Visitor engagement analytics
- 🎯 Quiz integration
- 💬 Feedback collection

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel KV (for Analytics)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select your existing project
3. Go to **Storage** → **Create Database** → **KV**
4. Name it something like "pillar-analytics"
5. Copy the environment variables provided
6. Add them to your Vercel project settings

### 3. Local Development

To run locally with the Python server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

To test with Vercel serverless functions locally:

```bash
npm run dev
```

### 4. Deploy to Vercel

```bash
npm run deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Analytics Dashboard

Access the analytics dashboard at `/dashboard.html` to view:
- Total clicks on all interactive elements
- 3D model views
- Feedback form submissions
- Quiz attempts
- Completion rate (percentage of 3D model viewers who took the quiz)

## Project Structure

```
Pillar/
├── index.html              # Main website
├── dashboard.html          # Analytics dashboard
├── public/                 # Static assets
│   ├── pillar_3D_model.glb
│   └── rumah-penghulu-abu-seman-3d.mp4
├── api/                    # Vercel serverless functions
│   ├── track-click.js      # Track button clicks
│   └── get-stats.js        # Retrieve analytics
├── package.json
├── vercel.json            # Vercel configuration
└── README.md
```

## How Analytics Work

1. When visitors click on buttons (3D Model, Feedback, Quiz), a tracking event is sent to `/api/track-click`
2. The serverless function stores the click count in Vercel KV (Redis)
3. The dashboard fetches statistics from `/api/get-stats`
4. Completion rate = (Quiz Clicks / 3D Model Views) × 100%

## Environment Variables (Vercel KV)

These are automatically added when you create a Vercel KV database:

```
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
KV_URL
```

## License

MIT License - Feel free to use this for educational purposes.

## Credits

- Badan Warisan Malaysia - 3D Construction Video
- Traditional Malay Architecture Heritage

