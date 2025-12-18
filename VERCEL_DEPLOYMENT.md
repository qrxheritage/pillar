# 🚀 Vercel Deployment Guide

## Step 1: Set Up Redis (Upstash)

1. Go to https://console.upstash.com
2. Sign up with GitHub/email
3. Create a new Redis database
4. Copy credentials:
   - **REDIS_URL** (looks like: `redis://default:password@host:port`)
   - **REDIS_REST_TOKEN** (for REST API access)

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option B: Using GitHub (Auto-deploy)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Continue to next steps

## Step 3: Configure Environment Variables on Vercel

In your Vercel project settings, add these environment variables:

```
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
ALLOWED_ORIGINS=https://your-domain.vercel.app,https://yourdomain.com
REDIS_URL=redis://default:your-password@your-host:your-port
REDIS_REST_TOKEN=your-rest-token
```

## Step 4: Test Deployment

1. Go to your Vercel deployment URL
2. Try logging in with your credentials
3. Check that:
   - ✅ Login works
   - ✅ Dashboard loads
   - ✅ Stats appear
   - ✅ Logout works

## Troubleshooting

### "Redis connection failed"
- Check `REDIS_URL` is correct
- Verify `REDIS_REST_TOKEN` is set
- Test Redis connection in Upstash dashboard

### "Cannot find module '@upstash/redis'"
- Run `npm install` locally
- Push updated `package-lock.json` to Git

### "Login not working"
- Check credentials in environment variables
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Look at function logs in Vercel dashboard

### Sessions not persisting
- Make sure Redis environment variables are configured
- Check Redis is running on Upstash
- Verify token appears in Redis: `redis-cli get session:*`

## Local Testing with Redis

To test locally with Redis before deployment:

1. Install Redis locally or use Docker
2. Get your local Redis URL: `redis://localhost:6379`
3. Update `.env`:
   ```
   REDIS_URL=redis://localhost:6379
   REDIS_REST_TOKEN=not-needed-locally
   ```
4. Run `npm run dev`

## File Structure

```
your-project/
├── api/
│   ├── admin-login.js          (✅ Updated with Redis)
│   ├── get-stats.js
│   ├── track-click.js
│   └── verify-auth.js
├── public/
│   ├── login.html
│   ├── dashboard.html
│   └── ...
├── server.js                    (✅ Updated for async auth)
├── .env                         (⚠️ Never commit - add to .gitignore)
├── .env.example                 (✅ Template for .env)
├── vercel.json                  (✅ Vercel config)
├── SECURITY.md
└── package.json
```

## What Changed for Vercel Compatibility

1. **Redis Integration** - Sessions stored in Redis instead of memory
2. **Async/Await** - Auth middleware now async due to Redis
3. **SessionStore Abstraction** - Works with both Redis and in-memory
4. **Vercel Config** - Added `vercel.json` for deployment settings
5. **Environment Variables** - All credentials use `.env`

## Cost Considerations

- **Vercel**: Free tier available, generous limits
- **Upstash Redis**: Free tier includes 10,000 commands/day
  - For typical admin dashboard: Well under free tier
  - Pro tier: $0.20 per 100k commands if you exceed

## Next Steps After Deployment

1. Update your domain DNS records to point to Vercel
2. Test login from multiple devices
3. Monitor function logs for errors
4. Set up automatic backups if needed
5. Consider adding activity logging

## Rollback / Troubleshooting

If something breaks after deployment:

```bash
# View logs
vercel logs

# Rollback to previous deployment
vercel rollback

# Redeploy latest code
vercel --prod
```
