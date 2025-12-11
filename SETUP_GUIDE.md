# Quick Setup Guide for Vercel Deployment with Analytics

## Step 1: Install Node.js Dependencies

Open your terminal in the Pillar folder and run:

```bash
npm install
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard (Recommended for beginners)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your Git repository (or upload the folder)
4. Vercel will automatically detect the configuration
5. Click "Deploy"

## Step 3: Set Up Vercel KV (Analytics Database)

**IMPORTANT:** Do this AFTER your first deployment

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on the "Storage" tab
3. Click "Create Database"
4. Select "KV" (Key-Value Store)
5. Name it: `pillar-analytics`
6. Click "Create"
7. Click "Connect to Project"
8. Select your project name
9. Click "Connect"

That's it! The environment variables are automatically added.

## Step 4: Redeploy

After connecting the KV database:

```bash
vercel --prod
```

Or click "Redeploy" in the Vercel dashboard.

## Step 5: Test Your Analytics

1. Visit your deployed site: `https://your-project.vercel.app`
2. Click on the buttons (3D Model, Feedback, Quiz)
3. Visit the dashboard: `https://your-project.vercel.app/dashboard.html`
4. You should see the click counts!

## Troubleshooting

### Analytics not working?

1. **Check if Vercel KV is connected:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Look for variables starting with `KV_`
   - If they don't exist, repeat Step 3

2. **Check browser console for errors:**
   - Open DevTools (F12)
   - Click on buttons and check if there are any red errors

3. **Verify API routes are deployed:**
   - Visit: `https://your-project.vercel.app/api/get-stats`
   - You should see JSON data (even if all zeros)

### 3D Model not loading?

- Make sure `public/pillar_3D_model.glb` exists
- Check browser console for errors
- Try opening the model directly: `https://your-project.vercel.app/public/pillar_3D_model.glb`

## Viewing Analytics

Access your analytics dashboard at:
```
https://your-project.vercel.app/dashboard.html
```

You'll see:
- 📊 Total Clicks
- 🎨 3D Model Views
- 💬 Feedback Submissions
- 🧠 Quiz Attempts
- 📈 Completion Rate (Model viewers who took the quiz)

## Free Tier Limits

Vercel KV Free Tier includes:
- 256 MB storage
- 3000 commands per day
- More than enough for your use case!

## Questions?

If you encounter any issues, check:
1. Vercel deployment logs
2. Browser console (F12)
3. Make sure all files are uploaded correctly

Good luck! 🚀

