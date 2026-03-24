# Netlify Deployment - Quick Start

## ✅ Ready to Deploy!

Your project is now configured for Netlify deployment.

## 🚀 Deploy in 3 Steps

### 1. Deploy Frontend to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Netlify auto-detects settings from `netlify.toml`
6. Click "Deploy site"

### 2. Deploy Backend to Railway

1. Go to [Railway](https://railway.app)
2. Create new project from GitHub
3. **Important**: In Settings, set Root Directory to `backend`
4. Add environment variables:
   ```
   MAIL_USERNAME=nuwangimahesha@gmail.com
   MAIL_PASSWORD=cdhmlvvueiqycbfb
   COMPANY_EMAIL=nuwangimahesha@gmail.com
   ```
5. Deploy and copy your Railway URL

### 3. Connect Frontend to Backend

1. In Netlify: Site settings → Environment variables
2. Add:
   - Key: `REACT_APP_API_URL`
   - Value: Your Railway URL (e.g., `https://your-app.railway.app`)
3. Trigger redeploy in Netlify

## ✨ Done!

Your site is now live on Netlify with backend on Railway.

## 📝 What Changed

- ✅ Removed Railway-specific files (nixpacks.toml, railway.toml, etc.)
- ✅ Updated React app to use environment variable for API URL
- ✅ Configured netlify.toml for frontend deployment
- ✅ Created .env files for configuration
- ✅ Backend remains unchanged and ready for Railway

## 🔍 Test Your Deployment

Visit your Netlify URL and submit the form. You should receive an email at nuwangimahesha@gmail.com.

For detailed instructions, see `DEPLOYMENT.md`
