# ✅ Vercel Deployment Checklist

## Pre-Deployment (Local Testing)

- [ ] Run `npm run dev` and verify no errors
- [ ] Test login with your credentials
- [ ] Test dashboard loads correctly
- [ ] Test logout functionality
- [ ] Verify rate limiting (try 6+ failed logins)

## Create Upstash Redis Account

- [ /] Go to https://console.upstash.com
- [/ ] Sign up (GitHub recommended)
- [/ ] Create new Redis database
- [ /] Copy **REDIS_URL** 
- [ ] Copy **REDIS_REST_TOKEN**

## Prepare for Vercel

- [ ] Check `.gitignore` includes `.env`
- [ ] Verify `vercel.json` exists
- [ ] Verify all code changes are committed to Git
- [ ] Have your domain ready (if using custom domain)

## Deploy to Vercel

### Option 1: CLI Deployment
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Auto-Deploy
1. Push to GitHub
2. Connect repo to Vercel
3. Click "Deploy"

## Configure Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| ADMIN_USERNAME | Your admin username |
| ADMIN_PASSWORD | Your secure password |
| ALLOWED_ORIGINS | `https://your-domain.vercel.app` |
| REDIS_URL | From Upstash |
| REDIS_REST_TOKEN | From Upstash |

## Post-Deployment Testing

- [ ] Visit deployment URL
- [ ] Test login works
- [ ] Test dashboard loads
- [ ] Test logout works
- [ ] Check Vercel logs for errors

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` locally, commit `package-lock.json` |
| "Redis connection failed" | Check REDIS_URL and REDIS_REST_TOKEN are correct |
| "Login not working" | Verify ADMIN_USERNAME and ADMIN_PASSWORD in Vercel |
| "Sessions not persisting" | Ensure Redis environment variables are set |

## Files Updated for Vercel

✅ `api/admin-login.js` - Redis support with fallback
✅ `server.js` - Async auth middleware
✅ `.env.example` - Redis config template
✅ `vercel.json` - Vercel deployment config
✅ `VERCEL_DEPLOYMENT.md` - Detailed deployment guide

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Upstash Docs: https://docs.upstash.com
- Express Guide: https://expressjs.com

---

**Estimated Deployment Time:** 10-15 minutes

**Questions?** Check VERCEL_DEPLOYMENT.md for detailed troubleshooting
