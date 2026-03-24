# Deployment Guide

## Overview

This project has two parts:
1. **Frontend (React)** - Deploy to Netlify
2. **Backend (Spring Boot)** - Deploy to Railway or Render

## 🎨 Frontend Deployment (Netlify)

### Step 1: Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect the settings from `netlify.toml`

### Step 2: Set Environment Variable

In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.railway.app` (your backend URL)

### Step 3: Deploy

Click "Deploy site" - Netlify will build and deploy automatically.

## 🚀 Backend Deployment (Railway)

### Step 1: Create Railway Project

1. Go to [Railway](https://railway.app)
2. Create new project
3. Connect your GitHub repository
4. **Important**: Set Root Directory to `backend` in Settings

### Step 2: Set Environment Variables

Add these in Railway:
```
MAIL_USERNAME=nuwangimahesha@gmail.com
MAIL_PASSWORD=cdhmlvvueiqycbfb
COMPANY_EMAIL=nuwangimahesha@gmail.com
CORS_ORIGINS=https://your-netlify-site.netlify.app
```

### Step 3: Deploy

Railway will automatically build and deploy your backend.

### Step 4: Get Backend URL

1. Go to Settings → Generate Domain
2. Copy the URL (e.g., `https://your-app.railway.app`)
3. Use this URL in Netlify's `REACT_APP_API_URL` variable

## 🔄 Update Frontend with Backend URL

After deploying backend:
1. Copy your Railway backend URL
2. Go to Netlify → Site settings → Environment variables
3. Update `REACT_APP_API_URL` with your Railway URL
4. Trigger a new deploy in Netlify

## ✅ Verify Deployment

1. Visit your Netlify site
2. Fill out the form
3. Check if email is received at nuwangimahesha@gmail.com
4. Check Railway logs for any errors

## 📝 Local Development

1. Start backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. Start frontend:
   ```bash
   npm start
   ```

3. Frontend will run on `http://localhost:3000`
4. Backend will run on `http://localhost:7000`

## 🔧 Configuration Files

- `netlify.toml` - Netlify build configuration
- `backend/Procfile` - Railway process file
- `backend/system.properties` - Java version for Railway
- `.env` - Local environment variables (not committed)
- `.env.example` - Example environment variables

## 🌐 CORS Configuration

The backend is configured to accept requests from your frontend URL. Make sure to update `CORS_ORIGINS` in Railway with your Netlify URL.

## 📧 Email Configuration

Emails are sent using Gmail SMTP. The app password `cdhmlvvueiqycbfb` is already configured. Make sure:
- 2-factor authentication is enabled on the Gmail account
- The app password is valid
