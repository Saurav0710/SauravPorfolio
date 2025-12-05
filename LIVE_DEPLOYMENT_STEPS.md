# 🚀 Live Deployment - Step by Step

Your portfolio is ready to deploy! Here are the exact steps to get it live on **Vercel** and **Render**.

---

## ✅ STEP 1: Deploy Frontend to Vercel (5 minutes)

### Open Vercel
- Go to https://vercel.com
- Sign in with GitHub (if not logged in, create free account)

### Import Repository
1. Click **"New Project"** (blue button, top right)
2. Under "Import Git Repository"
3. Search for: **SauravPorfolio**
4. Click the repository → **"Import"**

### Configure Project
The page should show:
- **Framework**: Vite ✓
- **Build Command**: `npm run build` ✓
- **Output Directory**: `dist` ✓

This is automatically detected - no changes needed!

### Add Environment Variables
1. Scroll down to **"Environment Variables"**
2. Click **"Add"** and enter these:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `your_supabase_project_url` (from Supabase dashboard)

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`  
- Value: `your_anon_key` (from Supabase dashboard)

### Deploy!
- Click **"Deploy"** button (blue, bottom right)
- Wait 2-3 minutes for deployment to complete

✅ **Your frontend is LIVE!**
- URL: `https://saurav-portfolio.vercel.app`
- (Replace with your actual Vercel URL)

---

## ✅ STEP 2: Deploy Backend to Render (5 minutes)

### Open Render
- Go to https://render.com
- Sign in with GitHub (if not logged in, create free account)

### Create New Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Select **SauravPorfolio** repository
4. Click **"Connect"**

### Configure Service

**Basic Settings:**
- Name: `saurav-portfolio-api`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: **Free**

### Set Root Directory (Important!)
- Root Directory: `./backend`

### Add Environment Variables
1. Click **"Environment"** tab
2. Add these variables:

```
PORT=3000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=portfolio_db
JWT_SECRET=saurav_portfolio_secret_2024
CORS_ORIGIN=https://saurav-portfolio.vercel.app
NODE_ENV=production
```

Replace the values with your actual database credentials.

### Deploy!
- Click **"Create Web Service"** (blue button)
- Wait 3-5 minutes for deployment to complete

✅ **Your backend is LIVE!**
- URL: `https://saurav-portfolio-api.onrender.com`

---

## ✅ STEP 3: Connect Frontend & Backend

### Update API URLs in Frontend
You need to replace any local API calls with your Render URL.

**In your React code**, find API calls and update:

**Before:**
```typescript
const API_BASE = 'http://localhost:5000'
```

**After:**
```typescript
const API_BASE = 'https://saurav-portfolio-api.onrender.com'
```

### Push Changes
1. Open terminal in your project
2. Run:
```bash
git add .
git commit -m "chore: Update API URL to production Render endpoint"
git push origin main
```

✅ **Vercel automatically redeploys** - Your portfolio now talks to the live backend!

---

## 🎉 YOUR PORTFOLIO IS LIVE!

### Access Your Live Sites:

**Frontend:**
```
https://saurav-portfolio.vercel.app
```

**Backend API:**
```
https://saurav-portfolio-api.onrender.com
```

**GitHub Repository:**
```
https://github.com/patiltejas180/SauravPorfolio
```

---

## ⚡ Free Tier Important Notes

### Vercel (Frontend)
- ✅ Always free
- ✅ Unlimited deployments
- ✅ Instant updates on git push

### Render (Backend)
- ⏰ **Free tier goes to sleep** after 15 minutes of inactivity
- 💤 When someone visits, it wakes up (takes 30 seconds)
- 💰 Upgrade to **$7/month** Paid plan for always-on

---

## 📹 Video Files Note

Your video files are stored locally but not in the GitHub repository (to avoid GitHub file size limits).

**Options to handle videos:**
1. **Cloudinary** (Free tier available)
   - Upload videos there
   - Reference via CDN URLs

2. **AWS S3** 
   - Upload to S3 bucket
   - Reference via S3 URLs

3. **YouTube** (For background videos)
   - Upload unlisted videos
   - Embed via iframe

4. **Keep local** (Works fine for small projects)
   - Videos work locally in development
   - For production, use one of options above

---

## 🔧 Troubleshooting

### Vercel Shows Build Error
1. Go to Vercel Dashboard
2. Click on failed deployment
3. Check "Build Logs"
4. Common issues:
   - Missing environment variables
   - Node version mismatch
   - Missing dependencies

**Fix:** Add missing env vars and redeploy

### Render Backend Not Starting
1. Go to Render Dashboard
2. Click your service
3. Check "Logs" tab
4. Common issues:
   - Database not reachable
   - Missing environment variables
   - Wrong Node version

**Fix:** Verify all env variables and database connection

### API Calls Still Going to Localhost
1. Verify you updated API URL in React code
2. Pushed changes to GitHub
3. Vercel has redeployed (check deployment timestamp)
4. Clear browser cache (Ctrl + F5)

---

## 📊 Monitor Your Deployments

### Vercel Dashboard
- https://vercel.com/dashboard
- See all deployments
- View build logs
- Check performance

### Render Dashboard  
- https://dashboard.render.com
- View service status
- Check logs in real-time
- Monitor resource usage

---

## ✨ Next Steps (Optional)

1. **Add Custom Domain**
   - Vercel: Dashboard → Settings → Domains
   - Render: Settings → Custom Domain

2. **Enable Auto-Deployments**
   - Already enabled by default! 
   - Push to GitHub → Auto-deploys

3. **Set Up Monitoring**
   - Enable error tracking
   - Set up uptime alerts
   - Monitor performance

4. **Add Database**
   - Create MySQL database
   - Connect to Render backend
   - Run migrations

---

## 🎯 Summary

✅ Vercel frontend deployed: `https://saurav-portfolio.vercel.app`
✅ Render backend deployed: `https://saurav-portfolio-api.onrender.com`
✅ Frontend connected to backend
✅ Auto-deployments enabled

**Your portfolio is now LIVE to the world!** 🚀

