# 🚀 Simple Backend Deployment Guide (AWS Console)

## Overview
Deploy your backend to AWS without using command line tools. Everything done through AWS Console (web interface).

**Time needed:** 30-45 minutes  
**Cost:** ~$7-22/month (Free tier available for 12 months)

---

## Step 1: Create AWS RDS MySQL Database (15 minutes)

### 1.1 Go to AWS RDS Console
1. Open https://console.aws.amazon.com/rds/
2. Click **"Create database"**

### 1.2 Configure Database
```
Engine options:
✓ MySQL
Version: MySQL 8.0.35 (or latest)

Templates:
✓ Free tier (if available)
OR
✓ Dev/Test

Settings:
DB instance identifier: branchworks-db
Master username: admin
Master password: [Create strong password - SAVE THIS!]
Confirm password: [Same password]

Instance configuration:
DB instance class: Burstable classes
✓ db.t3.micro (Free tier eligible)

Storage:
Storage type: General Purpose SSD (gp3)
Allocated storage: 20 GB
✓ Enable storage autoscaling
Maximum storage threshold: 100 GB

Connectivity:
Compute resource: Don't connect to an EC2 compute resource
VPC: Default VPC
Public access: ✓ Yes
VPC security group: Create new
  Security group name: branchworks-db-sg
Availability Zone: No preference

Database authentication:
✓ Password authentication

Additional configuration:
Initial database name: branchworks
✓ Enable automated backups
Backup retention period: 7 days
✓ Enable encryption
```

### 1.3 Create Database
1. Click **"Create database"**
2. Wait 5-10 minutes for creation
3. **SAVE THESE DETAILS:**
   ```
   Endpoint: branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com
   Port: 3306
   Database: branchworks
   Username: admin
   Password: [your password]
   ```

### 1.4 Configure Security Group
1. Go to database details page
2. Click on **VPC security group** link
3. Click **"Edit inbound rules"**
4. Click **"Add rule"**:
   - Type: MySQL/Aurora
   - Port: 3306
   - Source: Anywhere-IPv4 (0.0.0.0/0)
   - Description: "Allow database access"
5. Click **"Save rules"**

---

## Step 2: Build Backend JAR File (5 minutes)

### 2.1 Build with Maven
Open terminal in your project folder:

```bash
cd backend
mvn clean package
```

Wait for build to complete (2-3 minutes).

### 2.2 Find JAR File
The JAR file will be at:
```
backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar
```

**File size:** ~50-60 MB

---

## Step 3: Deploy to AWS Elastic Beanstalk (15 minutes)

### 3.1 Go to Elastic Beanstalk Console
1. Open https://console.aws.amazon.com/elasticbeanstalk/
2. Click **"Create application"**

### 3.2 Configure Application
```
Application name: branchworks-backend
Platform: Java
Platform branch: Corretto 17 running on 64bit Amazon Linux 2023
Platform version: (latest)

Application code:
✓ Upload your code

Source code origin:
✓ Local file
Click "Choose file"
Select: backend/target/coming-soon-backend-0.0.1-SNAPSHOT.jar

Version label: v1.0
```

### 3.3 Configure More Options
Click **"Configure more options"**

#### Software Configuration:
Click **"Edit"** on Software

Add Environment properties:
```
SPRING_PROFILES_ACTIVE = prod
RDS_DB_URL = jdbc:mysql://[YOUR-RDS-ENDPOINT]:3306/branchworks
RDS_USERNAME = admin
RDS_PASSWORD = [YOUR-DB-PASSWORD]
CORS_ALLOWED_ORIGINS = https://www.branchworksglobal.com
MAIL_USERNAME = nuwangimahesha@gmail.com
MAIL_PASSWORD = mqkgwnkismtltjmy
COMPANY_EMAIL = info@branchworksglobal.com
SERVER_PORT = 5000
```

**Replace:**
- `[YOUR-RDS-ENDPOINT]` with your RDS endpoint (from Step 1.3)
- `[YOUR-DB-PASSWORD]` with your RDS password

Click **"Save"**

#### Capacity Configuration:
Click **"Edit"** on Capacity

```
Environment type: Single instance (Free tier)
Instance types: t3.small
```

Click **"Save"**

### 3.4 Create Environment
1. Click **"Create app"**
2. Wait 10-15 minutes for environment creation
3. You'll see progress: Creating, Launching, Running health checks

### 3.5 Get Backend URL
Once deployed, you'll see:
```
Environment URL: branchworks-backend.us-east-1.elasticbeanstalk.com
```

**Your backend API:** `http://branchworks-backend.us-east-1.elasticbeanstalk.com`

### 3.6 Test Backend
Open in browser:
```
http://branchworks-backend.us-east-1.elasticbeanstalk.com/api/health
```

Should see: `{"status":"UP"}`

---

## Step 4: Update Frontend API URLs (10 minutes)

### 4.1 Update Admin Panel Config
Edit `public/admin/js/config.js`:

**Find:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'BACKEND_NOT_DEPLOYED';
```

**Replace with:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'http://branchworks-backend.us-east-1.elasticbeanstalk.com';
```

### 4.2 Update React Components

**Files to update:**
- `src/components/HomePage.jsx`
- `src/components/Blog.jsx`
- `src/components/BlogDetail.jsx`
- `src/components/Careers.jsx`

**In each file, find:**
```javascript
const response = await fetch('http://localhost:5000/api/blogs');
```

**Replace with:**
```javascript
const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000'
    : 'http://branchworks-backend.us-east-1.elasticbeanstalk.com';

const response = await fetch(`${API_URL}/api/blogs`);
```

### 4.3 Commit and Push
```bash
git add .
git commit -m "Configure backend API URL for production"
git push origin master
```

AWS Amplify will auto-deploy in 5-10 minutes.

---

## Step 5: Test Everything (5 minutes)

### 5.1 Test Backend API
```bash
# Health check
curl http://branchworks-backend.us-east-1.elasticbeanstalk.com/api/health

# Get blogs
curl http://branchworks-backend.us-east-1.elasticbeanstalk.com/api/blogs

# Get careers
curl http://branchworks-backend.us-east-1.elasticbeanstalk.com/api/careers
```

### 5.2 Test Frontend
1. Go to https://www.branchworksglobal.com
2. Check blog page loads
3. Check careers page loads

### 5.3 Test Admin Panel
1. Go to https://www.branchworksglobal.com/admin/
2. Login: admin / admin123
3. Create a test blog
4. Upload an image
5. Verify blog appears on website

---

## 💰 Cost Breakdown

### Free Tier (First 12 months):
- RDS db.t3.micro: 750 hours/month (FREE)
- Elastic Beanstalk: No charge
- EC2 t3.small: ~$15/month (NOT free tier)
- **Total: ~$15/month**

### After Free Tier:
- RDS db.t3.micro: ~$15/month
- EC2 t3.small: ~$15/month
- **Total: ~$30/month**

### Cost Optimization:
Use t3.micro for EC2: ~$7/month (instead of t3.small)

---

## 🔧 Troubleshooting

### Backend Health Check Failing

**Check Logs:**
1. Elastic Beanstalk Console
2. Your environment
3. Logs → Request Logs → Last 100 Lines

**Common Issues:**
- Wrong database URL
- Wrong database password
- Database security group not allowing connections
- Port configuration incorrect

**Fix:**
1. Go to Configuration → Software
2. Verify environment variables
3. Click "Apply"
4. Wait for environment to update

### Database Connection Failed

**Check:**
1. RDS is running (not stopped)
2. Security group allows port 3306
3. Database endpoint is correct
4. Username/password are correct

**Test Connection:**
Use MySQL Workbench or any MySQL client:
```
Host: [your-rds-endpoint]
Port: 3306
Username: admin
Password: [your-password]
Database: branchworks
```

### CORS Errors

**Fix:**
1. Elastic Beanstalk → Configuration → Software
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   https://www.branchworksglobal.com
   ```
3. Click "Apply"

---

## 📊 Monitoring

### View Backend Logs
1. Elastic Beanstalk Console
2. Your environment
3. Logs → Request Logs → Last 100 Lines

### View Database
1. Use MySQL Workbench
2. Connect to RDS endpoint
3. View tables: `blog_post`, `career`, `waitlist_entry`

### Check Backend Health
1. Elastic Beanstalk Console
2. Your environment
3. Health tab

---

## 🔄 Updating Backend

### When you make code changes:

1. **Build new JAR:**
   ```bash
   cd backend
   mvn clean package
   ```

2. **Upload to Elastic Beanstalk:**
   - Go to Elastic Beanstalk Console
   - Click "Upload and deploy"
   - Choose new JAR file
   - Version label: v1.1 (increment version)
   - Click "Deploy"

3. **Wait 5-10 minutes** for deployment

---

## ✅ Deployment Checklist

- [ ] RDS MySQL database created
- [ ] RDS security group configured (port 3306 open)
- [ ] Backend JAR file built
- [ ] Elastic Beanstalk application created
- [ ] Environment variables configured
- [ ] Backend deployed and running
- [ ] Backend health check passing
- [ ] Frontend API URLs updated
- [ ] Frontend pushed to GitHub
- [ ] Amplify deployed frontend
- [ ] Admin panel accessible
- [ ] Can login to admin panel
- [ ] Can create/edit blogs
- [ ] Blogs appear on website
- [ ] Careers management works

---

## 🎉 Success!

Once all steps are complete:
- ✅ Backend running on AWS Elastic Beanstalk
- ✅ Database on AWS RDS MySQL
- ✅ Frontend on AWS Amplify
- ✅ Admin panel working
- ✅ Everything connected and working!

---

**Need help? Check the troubleshooting section or AWS documentation.**

**Last Updated:** May 13, 2026
