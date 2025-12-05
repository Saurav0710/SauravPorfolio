# Deployment Guide - Vercel & Render

This guide will help you deploy your Saurav Portfolio to **Vercel** (frontend) and **Render** (backend).

## Prerequisites

- GitHub account (repository is already set up)
- Vercel account (free tier available)
- Render account (free tier available)
- Node.js installed locally

## Part 1: Deploy Frontend to Vercel

### Step 1: Connect GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"** button
3. Search for and select your **SauravPorfolio** repository
4. Click **"Import"**

### Step 2: Configure Build Settings

Vercel should automatically detect your project as a Vite + React app.

- **Framework Preset**: Leave as-is (Vite)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

Click **"Environment Variables"** and add:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_key_here
```

(Get these values from your Supabase project settings)

### Step 4: Deploy

Click **"Deploy"** button. Vercel will:
- Pull your code from GitHub
- Install dependencies
- Build the project
- Deploy to a live URL

**Your frontend will be live at**: `https://yourusername.vercel.app`

---

## Part 2: Deploy Backend to Render

### Step 1: Prepare Backend Code

Before deploying, ensure your backend `package.json` has:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "build": "npm install"
  }
}
```

The backend code is already included in this repo under `/backend` directory.

### Step 2: Create Render Service

1. Go to [render.com](https://render.com) and sign up/sign in
2. Click **"New +"** and select **"Web Service"**
3. Connect your GitHub account if not already done
4. Select **SauravPorfolio** repository
5. Click **"Connect"**

### Step 3: Configure Service Details

Fill in the following:

- **Name**: `saurav-portfolio-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free tier

### Step 4: Set Environment Variables

Click **"Environment"** and add these variables:

```
PORT=3000
DB_HOST=your_database_host
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=portfolio_db
JWT_SECRET=generate_a_random_secret_key
CORS_ORIGIN=https://yourusername.vercel.app
NODE_ENV=production
```

### Step 5: Deploy

Click **"Create Web Service"**. Render will start deploying automatically.

**Your backend will be live at**: `https://saurav-portfolio-api.onrender.com`

---

## Part 3: Update Frontend to Use Deployed Backend

Once your Render backend is live:

1. Update your frontend code to use the Render API URL
2. Find any API calls and replace local URLs with your Render URL
3. Example:
   ```typescript
   // Before
   const API_URL = 'http://localhost:5000'
   
   // After
   const API_URL = 'https://saurav-portfolio-api.onrender.com'
   ```

4. Push changes to GitHub
5. Vercel will automatically redeploy

---

## Part 4: Database Setup on Render (Optional)

If you want to use Render's managed database:

1. In Render dashboard, create a **PostgreSQL** database
2. Copy the connection details
3. Update your backend environment variables
4. Run database migrations

---

## Troubleshooting

### Vercel Build Fails
- Check build logs: Go to Vercel → Deployments → Failed build → Logs
- Ensure all environment variables are set
- Run `npm run build` locally to test

### Render Service Not Starting
- Check render.log: Go to Render → Logs
- Verify Node.js version is compatible
- Ensure `npm start` command is correct

### CORS Issues
- Update `CORS_ORIGIN` environment variable on Render
- Ensure frontend URL is correctly configured

### Database Connection Issues
- Verify connection string is correct
- Check firewall rules allow Render IP
- Test with MySQL client locally first

---

## Live URLs

After deployment, you'll have:

- **Frontend**: https://saurav-portfolio.vercel.app
- **Backend API**: https://saurav-portfolio-api.onrender.com
- **GitHub**: https://github.com/patiltejas180/SauravPorfolio

---

## Important Notes

⚠️ **Large Files**: Video files are not included in the GitHub repository to avoid size limits. You can:
- Host videos separately on a CDN
- Store them in cloud storage (AWS S3, Azure Blob)
- Reference them via direct URLs in your code

✅ **Free Tier Limits**:
- **Vercel**: Always free, unlimited deployments
- **Render**: Free tier sleeps after 15 mins of inactivity (only production plan stays active)

📌 **Next Steps**:
- Configure custom domain if needed
- Set up CI/CD monitoring
- Enable automatic deployments on push
- Monitor logs and error tracking

