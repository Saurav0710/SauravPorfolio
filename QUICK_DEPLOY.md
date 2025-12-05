# Quick Deploy to Vercel & Render

**Fastest way to get your portfolio live in 10 minutes!**

## ⚡ Quick Start

### For Vercel (Frontend) - 5 minutes

```
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo "SauravPorfolio"
4. Add environment variables:
   - VITE_SUPABASE_URL=your_url
   - VITE_SUPABASE_ANON_KEY=your_key
5. Click Deploy ✅
```

**Live in 2-3 minutes!**

---

### For Render (Backend) - 5 minutes

```
1. Go to https://render.com
2. Click "New Web Service"
3. Connect GitHub & select SauravPorfolio
4. Set Root Directory: ./backend
5. Build: npm install
6. Start: npm start
7. Add environment variables:
   - PORT=3000
   - DB_HOST=your_db_host
   - DB_USER=your_username
   - DB_PASSWORD=your_password
   - DB_NAME=portfolio_db
   - JWT_SECRET=generate_random_string
   - CORS_ORIGIN=https://your-vercel-url.vercel.app
8. Click Create ✅
```

**Live in 2-3 minutes!**

---

## 🔗 Connect Frontend to Backend

Update your API calls to use Render URL:

```typescript
// In your React code
const API_BASE = 'https://saurav-portfolio-api.onrender.com'
```

Then push to GitHub - Vercel auto-redeploys!

---

## 📱 Your Live Portfolio

- Frontend: `https://saurav-portfolio.vercel.app`
- Backend: `https://saurav-portfolio-api.onrender.com`
- GitHub: `https://github.com/patiltejas180/SauravPorfolio`

---

## ⚠️ Important Notes

1. **Large Video Files**: Not in the repo to avoid GitHub limits
   - Store on Cloudinary, AWS S3, or YouTube
   - Reference via URLs in code

2. **Render Free Tier**: Sleeps after 15 mins inactivity
   - Upgrade to $7/month Paid plan to keep always active
   - Or use render.com cron job to keep awake

3. **Environment Variables**: Double-check these before deploying!

4. **Database**: 
   - MySQL database must exist before backend runs
   - Render can provide PostgreSQL (easier setup)

---

## 🚀 Deploy in One Click

- **Vercel**: Push to GitHub → Auto-deploys
- **Render**: Push to GitHub → Auto-redeploys

That's it! Your portfolio is now live!

