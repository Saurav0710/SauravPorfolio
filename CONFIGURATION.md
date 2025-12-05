# ⚙️ Configuration Summary

## Files Created for Deployment

### 1. **vercel.json**
Vercel's deployment configuration for the frontend.

**Contents:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "react",
  "env": {
    "VITE_SUPABASE_URL": "@vite_supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
  }
}
```

**What it does:**
- Tells Vercel how to build your project
- Specifies output directory (dist)
- Declares environment variables

---

### 2. **.vercelignore**
Tells Vercel which files/folders to ignore during deployment.

**Contents:**
```
backend
admin
.git
.env.local
.env.*.local
public/videos/
```

**Why:**
- Reduces deployment size
- Speeds up deployments
- Excludes large video files
- Excludes backend code (separate deployment)

---

### 3. **backend/Procfile**
Tells Render how to start your backend service.

**Contents:**
```
web: node src/index.js
```

**What it does:**
- Specifies the start command for Node.js
- Render reads this automatically
- Ensures correct process type (web)

---

### 4. **backend/render.yaml**
Render's Infrastructure as Code configuration.

**Contents:**
```yaml
services:
  - type: web
    name: saurav-portfolio-api
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 3000
      # ... more variables
databases:
  - name: portfolio-db
    databaseName: portfolio_db
    plan: free
```

**What it does:**
- Defines the web service configuration
- Specifies environment variables
- Configures database settings
- Declares resource plan (free tier)

---

## 📦 Project Structure for Deployment

```
SauravPorfolio/
├── Frontend (Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json         ← Vercel config
│   ├── .vercelignore       ← Vercel ignore list
│   └── tsconfig.json
│
├── Backend (Render)
│   └── backend/
│       ├── src/
│       ├── package.json
│       ├── Procfile        ← Render startup config
│       └── render.yaml     ← Render infrastructure config
│
└── Documentation
    ├── LIVE_DEPLOYMENT_STEPS.md   ← START HERE!
    ├── DEPLOYMENT_GUIDE.md
    ├── QUICK_DEPLOY.md
    ├── README_DEPLOYMENT.md
    ├── START_HERE.md
    └── CONFIGURATION.md (this file)
```

---

## 🔐 Environment Variables Overview

### Vercel Environment (Frontend)
Set in: Vercel Dashboard → Project Settings → Environment Variables

| Variable | Value | Source |
|----------|-------|--------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard |
| `VITE_SUPABASE_ANON_KEY` | Your public anonymous key | Supabase Dashboard |

### Render Environment (Backend)
Set in: Render Dashboard → Service Settings → Environment

| Variable | Value | Notes |
|----------|-------|-------|
| `PORT` | `3000` | Express server port |
| `DB_HOST` | Your database host | MySQL/PostgreSQL host |
| `DB_USER` | Database username | Connection credential |
| `DB_PASSWORD` | Database password | Connection credential |
| `DB_NAME` | `portfolio_db` | Database name |
| `JWT_SECRET` | Random secret string | For JWT token signing |
| `CORS_ORIGIN` | Your Vercel URL | e.g., https://...vercel.app |
| `NODE_ENV` | `production` | Deployment environment |

---

## 🚀 Build & Start Commands

### Frontend (Vercel)
```bash
# Build
npm run build
# Output: dist/ folder

# Development
npm run dev
```

### Backend (Render)
```bash
# Install
npm install

# Start
npm start
# Runs: node src/index.js
```

---

## 📊 Deployment Specifications

### Vercel (Frontend)
- **Platform**: Vercel (owned by Netlify)
- **Framework**: Vite + React
- **Node Version**: Auto-detected (18+)
- **Build Time**: ~1-2 minutes
- **Deploy Time**: ~1-2 minutes
- **Timeout**: 45 minutes
- **Pricing**: Free tier (unlimited deployments)

### Render (Backend)
- **Platform**: Render
- **Runtime**: Node.js
- **Database**: MySQL/PostgreSQL supported
- **Build Time**: ~2-3 minutes
- **Deploy Time**: ~1-2 minutes
- **Timeout**: 30 minutes
- **Pricing**: Free tier ($0/month, with sleep)
- **Always-On**: Paid plan ($7+/month)

---

## 🔄 Deployment Flow

```
1. Local Development
   ├── Make changes
   ├── Test locally
   └── Push to GitHub

2. GitHub
   ├── Receive push
   └── Trigger deployments

3. Vercel (Frontend)
   ├── Pull code
   ├── Run: npm install
   ├── Run: npm run build
   ├── Deploy dist/ folder
   └── Live at vercel.app

4. Render (Backend)
   ├── Pull code
   ├── Run: npm install (from backend/)
   ├── Start: npm start
   ├── Connect to database
   └── Live at onrender.com
```

---

## ✅ Deployment Checklist

**Before Deploying:**
- [ ] Supabase account created & configured
- [ ] Database credentials ready
- [ ] JWT secret generated
- [ ] Frontend repo clean and committed
- [ ] Backend code in `/backend` folder

**Vercel Deployment:**
- [ ] GitHub account linked to Vercel
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] Deployment URL accessible

**Render Deployment:**
- [ ] GitHub account linked to Render
- [ ] Render service created
- [ ] Root directory set to `./backend`
- [ ] Environment variables set
- [ ] Database connected (if using)
- [ ] Service running without errors

**Post-Deployment:**
- [ ] Frontend loads successfully
- [ ] Backend API responds
- [ ] Frontend & backend communicating
- [ ] Forms working
- [ ] Database queries successful

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails on Vercel | Missing dependencies | Run `npm install` locally, check errors |
| Can't find module | Node modules not installed | Add install command to build |
| Env vars not found | Variables not set in dashboard | Set in platform dashboard, not .env |
| CORS errors | Wrong origin | Update CORS_ORIGIN in Render |
| Database connection fails | Wrong credentials | Verify DB host, user, password |
| Render service sleeps | Free tier inactivity | Upgrade to paid plan or use cron |
| Large files fail | File size limits | Use Git LFS or host separately |

---

## 📈 Performance Optimization

### Frontend (Vercel)
```bash
# Optimize bundle
npm run build
# Check size: dist/ folder

# Enable image optimization
# Already done: Vite handles this

# Enable edge caching
# Already done: Vercel CDN
```

### Backend (Render)
```bash
# Optimize Node
NODE_ENV=production npm start
# Already set in env vars

# Use clustering (optional)
# Add pm2 or native clustering

# Database indexing (optional)
# Add indexes for frequently queried columns
```

---

## 🔗 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com
- **Supabase Docs**: https://supabase.com/docs

---

## 📞 Quick Reference

| Task | Link |
|------|------|
| **Deploy Frontend** | https://vercel.com |
| **Deploy Backend** | https://render.com |
| **Source Code** | https://github.com/patiltejas180/SauravPorfolio |
| **Step-by-Step Guide** | Read LIVE_DEPLOYMENT_STEPS.md |

---

**Next:** Open [LIVE_DEPLOYMENT_STEPS.md](./LIVE_DEPLOYMENT_STEPS.md) to start deploying! 🚀

