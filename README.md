# Saurav Jadhav Portfolio 🎬

A professional video editor portfolio website showcasing video editing work, GenAI ads, and brand films.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 🌐 Live Demo

- **Frontend**: [https://saurav-portfolio.vercel.app](https://saurav-portfolio.vercel.app)
- **GitHub**: [https://github.com/Saurav0710/SauravPorfolio](https://github.com/Saurav0710/SauravPorfolio)

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Quick Start (Local Development)](#-quick-start-local-development)
4. [Deployment Guide](#-deployment-guide)
   - [Frontend on Vercel](#step-1-deploy-frontend-to-vercel)
   - [Backend on Render](#step-2-deploy-backend-to-render)
   - [Database Setup (Supabase)](#step-3-setup-database-supabase)
5. [Video Hosting](#-video-hosting)
6. [Admin Panel](#-admin-panel)
7. [Environment Variables](#-environment-variables)
8. [Project Structure](#-project-structure)
9. [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- 🎥 **Video Portfolio** - Showcase YouTube videos and local video files
- 🤖 **GenAI Ads Section** - AI-generated advertisement samples
- 🎬 **Brand Films** - Professional brand film showcases
- 📱 **Responsive Design** - Works on all devices
- ⭐ **Animated UI** - Smooth scroll effects and stardust background
- 📧 **Contact Section** - Easy way to get in touch

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Video Storage | Cloudinary / AWS S3 |
| Hosting | Vercel (Frontend) + Render (Backend) |

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Saurav0710/SauravPorfolio.git
cd SauravPorfolio

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📦 Deployment Guide

### Step 1: Deploy Frontend to Vercel

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Saurav0710/SauravPorfolio)

#### Option B: Manual Deploy

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "New Project"** → Select `SauravPorfolio` repository

3. **Configure Build Settings:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=https://your-backend.onrender.com
   ```

5. **Click "Deploy"** ✅

Your frontend will be live at: `https://your-project.vercel.app`

---

### Step 2: Deploy Backend to Render

1. **Go to [render.com](https://render.com)** and sign in

2. **Click "New +"** → Select **"Web Service"**

3. **Connect your GitHub** and select `SauravPorfolio` repository

4. **Configure Service:**
   ```
   Name: saurav-portfolio-api
   Environment: Node
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

5. **Add Environment Variables:**
   ```
   PORT=3000
   NODE_ENV=production
   
   # Database (from Supabase)
   DATABASE_URL=postgresql://user:password@host:5432/database
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   ADMIN_EMAIL=admin@sauravjadhav.com
   ADMIN_PASSWORD=your-secure-admin-password
   
   # CORS
   CORS_ORIGIN=https://your-frontend.vercel.app
   
   # Video Storage (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

6. **Click "Create Web Service"** ✅

Your backend will be live at: `https://saurav-portfolio-api.onrender.com`

---

### Step 3: Setup Database (Supabase)

1. **Go to [supabase.com](https://supabase.com)** and create a new project

2. **Create Tables** - Run this SQL in Supabase SQL Editor:

```sql
-- Videos table
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  source VARCHAR(20) NOT NULL CHECK (source IN ('local', 'youtube')),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  cover_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (key, title, subtitle, display_order) VALUES
('youtube', 'YouTube Videos', 'Professional video editing showcasing advanced color grading and motion graphics', 1),
('genai', 'GenAI Ads', 'Professional AI-generated content showcasing cutting-edge generative technology', 2),
('brand', 'Brand Films', 'High-end brand films and client showcases', 3);
```

3. **Get Connection Details:**
   - Go to Project Settings → Database
   - Copy the connection string (URI)
   - Use this as `DATABASE_URL` in Render

4. **Get API Keys:**
   - Go to Project Settings → API
   - Copy `URL` → Use as `VITE_SUPABASE_URL`
   - Copy `anon public` key → Use as `VITE_SUPABASE_ANON_KEY`

---

## 🎥 Video Hosting

Since GitHub has a 100MB file limit, videos should be hosted externally:

### Option 1: Cloudinary (Recommended)

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Upload videos to Media Library
3. Copy video URLs and use in your project

```typescript
// Example video URL
const videoUrl = 'https://res.cloudinary.com/your-cloud/video/upload/v1234/video-name.mp4';
```

### Option 2: YouTube (For Public Videos)

1. Upload videos to YouTube
2. Use video ID in your project

```typescript
// Example YouTube video
{ source: 'youtube', videoUrl: 'dQw4w9WgXcQ' }
```

### Option 3: AWS S3 / Azure Blob

For enterprise-level hosting with more control.

---

## 👤 Admin Panel

### Accessing Admin Panel

1. Navigate to: `https://your-site.vercel.app/admin`
2. Login with admin credentials

### Default Admin Credentials

```
Email: admin@sauravjadhav.com
Password: (set in ADMIN_PASSWORD env variable)
```

### Admin Features

- ✅ Add/Edit/Delete videos
- ✅ Manage categories
- ✅ Upload video thumbnails
- ✅ Reorder content
- ✅ Toggle video visibility

### Creating Admin User (First Time)

Run this in Supabase SQL Editor:

```sql
-- Generate password hash (use bcrypt)
-- You can use: https://bcrypt-generator.com/

INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
  'admin@sauravjadhav.com',
  '$2a$12$your-bcrypt-hash-here',
  'Admin',
  'admin'
);
```

---

## 🔐 Environment Variables

### Frontend (.env)

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Backend API
VITE_API_URL=https://saurav-portfolio-api.onrender.com
```

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
ADMIN_EMAIL=admin@sauravjadhav.com
ADMIN_PASSWORD=your-secure-password

# CORS
CORS_ORIGIN=https://your-frontend.vercel.app

# Cloudinary (for video uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📁 Project Structure

```
SauravPorfolio/
├── public/
│   └── videos/           # Local video files (not in git)
│       ├── genai/
│       ├── brandFlim/
│       └── background logo/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   ├── Stardust.tsx
│   │   ├── BackgroundLogo.tsx
│   │   └── ScrollEffects.tsx
│   ├── data/
│   │   └── projectsData.ts
│   ├── pages/
│   │   └── ProjectPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── package.json
│   ├── Procfile
│   └── render.yaml
├── .gitignore
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

## 🔧 Troubleshooting

### Build Fails on Vercel

```bash
# Check locally first
npm run build

# Common fixes:
# 1. Check all imports are correct
# 2. Ensure environment variables are set
# 3. Check for TypeScript errors
```

### Backend Not Starting on Render

1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure `npm start` command is correct
4. Check Node.js version compatibility

### CORS Errors

Update `CORS_ORIGIN` in backend environment variables:
```
CORS_ORIGIN=https://your-actual-frontend-url.vercel.app
```

### Videos Not Loading

1. Check video URLs are correct
2. Verify Cloudinary/S3 permissions
3. Check browser console for errors
4. Ensure video format is supported (MP4 recommended)

### Database Connection Issues

1. Verify Supabase connection string
2. Check if database is active (free tier may pause)
3. Verify IP allowlist in Supabase settings

---

## 📞 Support

- **Email**: hello@sauravjadhav.com
- **GitHub Issues**: [Create Issue](https://github.com/Saurav0710/SauravPorfolio/issues)

---

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Made with ❤️ by Saurav Jadhav