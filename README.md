# Rumah Penghulu Abu Seman - Pillars Educational Website

An interactive educational website about the traditional Malay architecture of Rumah Penghulu Abu Seman, featuring 3D models, videos, and analytics tracking.

## Features

- 📱 Responsive design with multi-language support (English, Malay, Chinese)
- 🎨 Interactive 3D model viewer
- 📊 Visitor engagement analytics with local JSON storage
- 🎯 Quiz integration
- 💬 Feedback collection
- 🚀 Deploy anywhere - no database service required!

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### 3. Access the Dashboard

View analytics at http://localhost:3000/dashboard.html

## 💾 Data Storage

This project uses **local JSON file storage** (`data/clicks.json`) instead of a cloud database. This means:

✅ No external database setup required  
✅ Deploy to any hosting platform (not just Vercel)  
✅ Easy to backup and migrate  
✅ Perfect for low-to-medium traffic sites  

For detailed setup instructions, see [LOCAL_SETUP.md](LOCAL_SETUP.md)

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
├── quiz.html               # Quiz page
├── dashboard.html          # Analytics dashboard
├── server.js               # Local development server
├── styles.css              # Styles
├── public/                 # Static assets
│   ├── pillar_3D_model.glb
│   └── rumah-penghulu-abu-seman-3d.mp4
├── api/                    # API endpoints
│   ├── track-click.js      # Track button clicks
│   └── get-stats.js        # Retrieve analytics
├── data/
│   └── clicks.json         # Local JSON database (auto-created)
├── package.json
└── README.md
```

## How Analytics Work

1. When visitors click on buttons (3D Model, Feedback, Quiz), a tracking event is sent to `/api/track-click`
2. The API endpoint stores the click count in `data/clicks.json`
3. The dashboard fetches statistics from `/api/get-stats`
4. All data is stored locally - no cloud database needed!

**Tracked Metrics:**
- Total clicks
- 3D model views
- Quiz button clicks
- Quiz starts and completions
- Feedback submissions
- Engagement and completion rates

## License

MIT License - Feel free to use this for educational purposes.

## Credits

- Badan Warisan Malaysia - 3D Construction Video
- Traditional Malay Architecture Heritage

