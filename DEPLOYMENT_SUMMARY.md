# 🚀 BranchWorks AWS Deployment - Quick Summary

## Current Status
- ✅ Frontend: Deployed on AWS Amplify
- ⏳ Backend: Ready to deploy to AWS Elastic Beanstalk
- ⏳ Database: Need to create AWS RDS MySQL

---

## What I've Prepared for You

### 1. ✅ Backend Configuration Updated
- Added MySQL driver to `pom.xml`
- Created `application-prod.properties` for AWS
- Updated `application.properties` to support both local and production
- Configured Elastic Beanstalk settings

### 2. ✅ Documentation Created
- **AWS_DEPLOYMENT_GUIDE.md** - Complete step-by-step guide
- **deploy-to-aws.bat** - Automated deployment script

---

## 🎯 What You Need to Do (Simple Steps)

### Step 1: Create Database (10 minutes)
1. Go to AWS RDS Console
2. Click "Create database"
3. Choose MySQL, Free tier
4. Database name: `branchworks`
5. Username: `admin`
6. Password: [create strong password]
7. **Save the endpoint URL and password!**

### Step 2: Deploy Backend (15 minutes)
```bash
# Install EB CLI (one time only)
pip install awsebcli

# Go to backend folder
cd backend

# Build
mvn clean package

# Initialize EB (one time only)
eb init
# Choose: us-east-1, Java, Corretto 17

# Create environment (one time only)
eb create branchworks-prod

# Set environment variables (replace with your values)
eb setenv SPRING_PROFILES_ACTIVE=prod RDS_DB_URL="jdbc:mysql://YOUR-RDS-ENDPOINT:3306/branchworks" RDS_USERNAME=admin RDS_PASSWORD="YOUR-PASSWORD" CORS_ALLOWED_ORIGINS="https://YOUR-AMPLIFY-URL"

# Deploy
eb deploy

# Get your backend URL
eb status
```

### Step 3: Update Frontend (5 minutes)
1. Edit `public/admin/js/config.js`
2. Replace `localhost:5000` with your EB URL
3. Push to GitHub
4. Amplify will auto-deploy

---

## 📋 Environment Variables You Need

When running `eb setenv`, replace these values:

```bash
SPRING_PROFILES_ACTIVE=prod
RDS_DB_URL="jdbc:mysql://[YOUR-RDS-ENDPOINT]:3306/branchworks"
RDS_USERNAME=admin
RDS_PASSWORD="[YOUR-DB-PASSWORD]"
CORS_ALLOWED_ORIGINS="https://[YOUR-AMPLIFY-URL]"
MAIL_USERNAME="nuwangimahesha@gmail.com"
MAIL_PASSWORD="mqkgwnkismtltjmy"
COMPANY_EMAIL="info@branchworksglobal.com"
```

**Find these values:**
- `[YOUR-RDS-ENDPOINT]`: From RDS Console after creating database
- `[YOUR-DB-PASSWORD]`: The password you set when creating RDS
- `[YOUR-AMPLIFY-URL]`: Your current Amplify URL (e.g., main.d1234.amplifyapp.com)

---

## 💰 Cost

### Free Tier (First 12 months):
- RDS MySQL: FREE (750 hours/month)
- Elastic Beanstalk: FREE (pay only for EC2)
- EC2 t3.micro: ~$7/month
- **Total: ~$7/month**

### After Free Tier:
- RDS: ~$15/month
- EC2: ~$7/month
- **Total: ~$22/month**

---

## ✅ Testing After Deployment

### 1. Test Backend API
```bash
# Replace with your EB URL
curl http://branchworks-api.us-east-1.elasticbeanstalk.com/api/health
curl http://branchworks-api.us-east-1.elasticbeanstalk.com/api/blogs
```

### 2. Test Admin Panel
1. Go to `https://your-amplify-url/admin/`
2. Login
3. Create a test blog
4. Verify it appears on website

---

## 🆘 If Something Goes Wrong

### Backend won't start
```bash
# Check logs
eb logs

# Common issues:
# - Wrong database URL
# - Wrong database password
# - Database security group not allowing connections
```

### Can't connect to database
1. Go to RDS → Your database → Security group
2. Add inbound rule: MySQL (port 3306) from Anywhere
3. Redeploy: `eb deploy`

### CORS errors
```bash
# Update CORS to match your Amplify URL exactly
eb setenv CORS_ALLOWED_ORIGINS="https://your-exact-amplify-url.com"
```

---

## 📞 Need Help?

1. Read **AWS_DEPLOYMENT_GUIDE.md** for detailed instructions
2. Check AWS Elastic Beanstalk logs: `eb logs`
3. Check RDS connection from EB: `eb ssh` then test MySQL connection

---

## 🎯 Quick Commands Reference

```bash
# View status
eb status

# View logs
eb logs

# Deploy new version
eb deploy

# Update environment variable
eb setenv KEY=VALUE

# Open in browser
eb open

# SSH into server
eb ssh
```

---

## ✨ After Successful Deployment

Your architecture will be:

```
User Browser
    ↓
AWS Amplify (Frontend + Admin Panel)
    ↓
AWS Elastic Beanstalk (Backend API)
    ↓
AWS RDS MySQL (Database)
```

Everything will work automatically:
- ✅ Admin panel accessible at `/admin/`
- ✅ Database persists data permanently
- ✅ Blog images stored in database
- ✅ Careers management works
- ✅ Auto-scaling if traffic increases

---

**Ready to deploy? Follow AWS_DEPLOYMENT_GUIDE.md for step-by-step instructions!**

**Last Updated:** May 13, 2026
