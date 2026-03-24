# Deploy Full Website to Railway

## Overview
This configuration deploys BOTH frontend (React) and backend (Spring Boot) to Railway as a single service.

## How It Works
1. Railway builds the React frontend (`npm run build`)
2. Railway builds the Spring Boot backend (`mvn package`)
3. Spring Boot copies the React build files to serve them
4. One Railway service serves everything on one URL

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Railway deployment"
git push
```

### Step 2: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Click "Deploy Now"

### Step 3: Set Environment Variables
In Railway dashboard, add these variables:

```
MAIL_USERNAME=nuwangimahesha@gmail.com
MAIL_PASSWORD=cdhmlvvueiqycbfb
COMPANY_EMAIL=nuwangimahesha@gmail.com
```

**Optional (if you need CORS for external access):**
```
CORS_ORIGINS=https://your-custom-domain.com
```

### Step 4: Generate Domain
1. Go to Settings tab
2. Under "Networking", click "Generate Domain"
3. Railway will give you a URL like: `https://your-app.railway.app`

### Step 5: Wait for Build
- First build takes 3-5 minutes
- Watch the logs in the "Deployments" tab
- Look for: "Started ComingSoonApplication"

### Step 6: Test Your Site
1. Visit your Railway URL
2. Fill out the form
3. Check email at nuwangimahesha@gmail.com

## What Gets Deployed

```
Railway Service
├── React Frontend (served at /)
│   ├── /
│   ├── /static/css/
│   └── /static/js/
└── Spring Boot Backend (API at /api)
    ├── POST /api/waitlist
    ├── GET /api/waitlist
    ├── GET /api/waitlist/count
    └── GET /api/waitlist/stats
```

## Build Process

Railway will:
1. Install Node.js dependencies (`npm ci`)
2. Build React app (`npm run build`)
3. Install Maven and JDK 17
4. Build Spring Boot (`mvn clean package`)
5. Copy React build to Spring Boot static folder
6. Start Spring Boot server

## Local Development

**Start Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Start Frontend (in new terminal):**
```bash
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:7000

## Troubleshooting

### Build Fails
- Check Railway logs for errors
- Verify all files are committed to GitHub
- Ensure `nixpacks.toml` and `railway.toml` are in root

### Form Doesn't Submit
- Check browser console for errors
- Verify backend is running (check Railway logs)
- Test API directly: `https://your-app.railway.app/api/waitlist/count`

### Email Not Sending
- Verify environment variables are set correctly
- Check Railway logs for email errors
- Ensure Gmail app password is valid

## Configuration Files

- `nixpacks.toml` - Tells Railway how to build (Node.js + Maven + JDK)
- `railway.toml` - Railway deployment settings
- `backend/pom.xml` - Includes plugin to copy React build
- `backend/system.properties` - Java version
- `backend/Procfile` - Process command

## Cost

Railway free tier includes:
- $5 credit per month
- Should be enough for a landing page
- Upgrade if you need more

## Custom Domain (Optional)

1. In Railway Settings → Networking
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as shown
5. Wait for SSL certificate (automatic)

## Database Note

Currently using H2 in-memory database. Data will be lost on restart.

To persist data, add PostgreSQL:
1. In Railway, click "New" → "Database" → "PostgreSQL"
2. Railway will auto-configure connection
3. Update `application.properties` to use PostgreSQL

## Support

If deployment fails, check:
- Railway logs (Deployments tab)
- GitHub repository has all files
- Environment variables are set
- Build commands in `nixpacks.toml` are correct
