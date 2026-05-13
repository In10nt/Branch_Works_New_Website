# 🚀 AWS Deployment Guide - BranchWorks

## Overview

Your complete AWS deployment setup:
- ✅ **Frontend**: AWS Amplify (already deployed)
- 🔧 **Backend**: AWS Elastic Beanstalk (Spring Boot API)
- 🔧 **Database**: AWS RDS MySQL
- 🔧 **Storage**: AWS S3 (for blog images)

---

## 📋 Prerequisites

- AWS Account
- AWS CLI installed
- EB CLI installed
- Your Amplify URL (e.g., `https://main.xxxxx.amplifyapp.com`)

---

## Step 1: Create RDS MySQL Database

### 1.1 Go to AWS RDS Console
1. Open AWS Console → RDS
2. Click "Create database"

### 1.2 Database Configuration
```
Engine: MySQL
Version: MySQL 8.0.35 (or latest)
Template: Free tier (or Dev/Test)

Settings:
- DB instance identifier: branchworks-db
- Master username: admin
- Master password: [Create a strong password - SAVE THIS!]

Instance configuration:
- DB instance class: db.t3.micro (Free tier eligible)

Storage:
- Storage type: General Purpose SSD (gp3)
- Allocated storage: 20 GB
- Enable storage autoscaling: Yes
- Maximum storage threshold: 100 GB

Connectivity:
- VPC: Default VPC
- Public access: Yes (for now, can restrict later)
- VPC security group: Create new
  - Name: branchworks-db-sg
- Availability Zone: No preference

Database authentication:
- Password authentication

Additional configuration:
- Initial database name: branchworks
- Backup retention: 7 days
- Enable automated backups: Yes
- Enable encryption: Yes (default)
```

### 1.3 Security Group Configuration
After database is created:
1. Go to EC2 → Security Groups
2. Find `branchworks-db-sg`
3. Edit Inbound Rules:
   - Add rule: MySQL/Aurora (port 3306)
   - Source: Anywhere-IPv4 (0.0.0.0/0) - for testing
   - Later: Restrict to Elastic Beanstalk security group

### 1.4 Save Database Connection Details
```
Endpoint: branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com
Port: 3306
Database name: branchworks
Username: admin
Password: [your password]

Connection String:
jdbc:mysql://branchworks-db.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/branchworks
```

---

## Step 2: Create S3 Bucket for Blog Images

### 2.1 Create S3 Bucket
1. Go to AWS S3 Console
2. Click "Create bucket"

```
Bucket name: branchworks-blog-images
Region: us-east-1 (same as your other resources)
Object Ownership: ACLs disabled
Block Public Access: Uncheck "Block all public access"
  ☑ I acknowledge that the current settings might result in this bucket and the objects within becoming public
Bucket Versioning: Disable
Encryption: Enable (SSE-S3)
```

### 2.2 Configure Bucket Policy
1. Go to bucket → Permissions → Bucket Policy
2. Add this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::branchworks-blog-images/*"
        }
    ]
}
```

### 2.3 Configure CORS
1. Go to bucket → Permissions → CORS
2. Add this configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

---

## Step 3: Deploy Backend to Elastic Beanstalk

### 3.1 Install EB CLI (if not installed)
```bash
pip install awsebcli --upgrade --user
```

### 3.2 Build Backend
```bash
cd backend
mvn clean package
```

This creates: `target/coming-soon-backend-0.0.1-SNAPSHOT.jar`

### 3.3 Initialize Elastic Beanstalk
```bash
cd backend
eb init
```

Configuration:
```
Select a default region: us-east-1 (or your preferred region)
Application name: branchworks-backend
Platform: Java
Platform branch: Corretto 17
Do you want to set up SSH: No (or Yes if you want SSH access)
```

### 3.4 Create Environment
```bash
eb create branchworks-prod
```

Configuration:
```
Environment name: branchworks-prod
DNS CNAME prefix: branchworks-api (or your choice)
Load balancer type: application
```

Wait for environment creation (5-10 minutes)

### 3.5 Set Environment Variables
```bash
eb setenv \
  SPRING_PROFILES_ACTIVE=prod \
  RDS_DB_URL="jdbc:mysql://[YOUR-RDS-ENDPOINT]:3306/branchworks" \
  RDS_USERNAME=admin \
  RDS_PASSWORD="[YOUR-DB-PASSWORD]" \
  CORS_ALLOWED_ORIGINS="https://[YOUR-AMPLIFY-URL]" \
  MAIL_USERNAME="nuwangimahesha@gmail.com" \
  MAIL_PASSWORD="mqkgwnkismtltjmy" \
  COMPANY_EMAIL="info@branchworksglobal.com"
```

Replace:
- `[YOUR-RDS-ENDPOINT]` with your RDS endpoint
- `[YOUR-DB-PASSWORD]` with your RDS password
- `[YOUR-AMPLIFY-URL]` with your Amplify URL

### 3.6 Deploy
```bash
eb deploy
```

### 3.7 Get Backend URL
```bash
eb status
```

Look for: `CNAME: branchworks-api.us-east-1.elasticbeanstalk.com`

Your backend API URL: `http://branchworks-api.us-east-1.elasticbeanstalk.com`

---

## Step 4: Update Frontend to Use Backend API

### 4.1 Update API Configuration
Edit `public/admin/js/config.js`:

```javascript
// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'http://branchworks-api.us-east-1.elasticbeanstalk.com';

export { API_BASE_URL };
```

Replace `branchworks-api.us-east-1.elasticbeanstalk.com` with your actual Elastic Beanstalk URL.

### 4.2 Update Frontend Components
Edit `src/components/HomePage.jsx`, `src/components/Blog.jsx`, `src/components/BlogDetail.jsx`:

Find:
```javascript
const response = await fetch('http://localhost:5000/api/blogs');
```

Replace with:
```javascript
const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000'
    : 'http://branchworks-api.us-east-1.elasticbeanstalk.com';

const response = await fetch(`${API_URL}/api/blogs`);
```

### 4.3 Update Careers Component
Edit `src/components/Careers.jsx`:

```javascript
const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000'
    : 'http://branchworks-api.us-east-1.elasticbeanstalk.com';

const response = await fetch(`${API_URL}/api/careers`);
```

### 4.4 Commit and Push to GitHub
```bash
git add .
git commit -m "Configure backend API for AWS deployment"
git push origin main
```

AWS Amplify will automatically rebuild and deploy your frontend.

---

## Step 5: Configure HTTPS (Optional but Recommended)

### 5.1 Request SSL Certificate (AWS Certificate Manager)
1. Go to AWS Certificate Manager
2. Request a public certificate
3. Add your domain name
4. Validate via DNS or Email

### 5.2 Add Custom Domain to Elastic Beanstalk
1. Go to Elastic Beanstalk → branchworks-prod
2. Configuration → Load balancer
3. Add listener on port 443
4. Select your SSL certificate

### 5.3 Update API URLs to HTTPS
Change all `http://` to `https://` in your frontend code.

---

## Step 6: Test Everything

### 6.1 Test Backend API
```bash
# Health check
curl http://branchworks-api.us-east-1.elasticbeanstalk.com/api/health

# Get blogs
curl http://branchworks-api.us-east-1.elasticbeanstalk.com/api/blogs

# Get careers
curl http://branchworks-api.us-east-1.elasticbeanstalk.com/api/careers
```

### 6.2 Test Frontend
1. Visit your Amplify URL
2. Check all pages load
3. Check blog posts display
4. Check careers display

### 6.3 Test Admin Panel
1. Go to `https://[your-amplify-url]/admin/`
2. Login with credentials
3. Create a test blog
4. Upload an image
5. Verify blog appears on website
6. Edit the blog
7. Delete the blog

---

## 📊 Monitoring and Logs

### View Backend Logs
```bash
eb logs
```

Or in AWS Console:
1. Elastic Beanstalk → branchworks-prod
2. Logs → Request Logs → Last 100 Lines

### View Database
1. Use MySQL Workbench or any MySQL client
2. Connect using RDS endpoint and credentials
3. View tables: `blog_post`, `career`, `waitlist_entry`

---

## 💰 Cost Estimate

### Free Tier (First 12 months):
- RDS db.t3.micro: 750 hours/month (FREE)
- Elastic Beanstalk: No additional charge (pay for EC2)
- EC2 t3.small: ~$15/month (not free tier)
- S3: 5GB storage (FREE)
- Data transfer: 15GB/month (FREE)

### After Free Tier:
- RDS db.t3.micro: ~$15/month
- EC2 t3.small: ~$15/month
- S3: ~$0.50/month
- **Total: ~$30-35/month**

### Cost Optimization:
- Use t3.micro for EC2: ~$7/month (instead of t3.small)
- Stop RDS when not in use (dev/test only)
- Use CloudFront CDN for S3 images

---

## 🔧 Useful Commands

### Elastic Beanstalk Commands
```bash
# View environment status
eb status

# View logs
eb logs

# SSH into instance
eb ssh

# Deploy new version
eb deploy

# Open in browser
eb open

# Terminate environment
eb terminate branchworks-prod
```

### Update Environment Variables
```bash
eb setenv KEY=VALUE

# Example: Update CORS
eb setenv CORS_ALLOWED_ORIGINS="https://new-url.amplifyapp.com"
```

### Scale Application
```bash
# In AWS Console:
# Elastic Beanstalk → Configuration → Capacity
# Change instance type or enable auto-scaling
```

---

## 🆘 Troubleshooting

### Issue 1: Backend Health Check Failing
**Solution:**
1. Check if `/api/health` endpoint exists
2. Verify security group allows traffic on port 5000
3. Check logs: `eb logs`

### Issue 2: Database Connection Failed
**Solution:**
1. Verify RDS security group allows inbound on port 3306
2. Check environment variables are set correctly
3. Test connection from EB instance: `eb ssh` then `mysql -h [endpoint] -u admin -p`

### Issue 3: CORS Errors
**Solution:**
1. Verify `CORS_ALLOWED_ORIGINS` environment variable
2. Check it matches your Amplify URL exactly
3. Redeploy: `eb deploy`

### Issue 4: Images Not Uploading
**Solution:**
1. Check S3 bucket permissions
2. Verify CORS configuration on S3
3. Check backend has write permissions to S3

### Issue 5: 502 Bad Gateway
**Solution:**
1. Backend is not responding
2. Check logs: `eb logs`
3. Verify Java application started successfully
4. Check memory settings (increase if needed)

---

## 🔐 Security Checklist

- [ ] Change admin panel credentials from default
- [ ] Restrict RDS security group to EB security group only
- [ ] Enable HTTPS on Elastic Beanstalk
- [ ] Use AWS Secrets Manager for sensitive data
- [ ] Enable CloudWatch alarms
- [ ] Set up automated backups for RDS
- [ ] Enable VPC for better network isolation
- [ ] Use IAM roles instead of access keys
- [ ] Enable AWS WAF for DDoS protection
- [ ] Regular security updates

---

## 📞 Support Resources

- AWS Elastic Beanstalk Docs: https://docs.aws.amazon.com/elasticbeanstalk/
- AWS RDS Docs: https://docs.aws.amazon.com/rds/
- AWS Amplify Docs: https://docs.amplify.aws/
- Spring Boot on AWS: https://spring.io/guides/gs/spring-boot-aws/

---

## 🎯 Quick Deployment Checklist

- [ ] RDS MySQL database created
- [ ] S3 bucket created and configured
- [ ] Backend built: `mvn clean package`
- [ ] EB initialized: `eb init`
- [ ] EB environment created: `eb create`
- [ ] Environment variables set: `eb setenv`
- [ ] Backend deployed: `eb deploy`
- [ ] Frontend API URLs updated
- [ ] Frontend pushed to GitHub (Amplify auto-deploys)
- [ ] Tested admin panel
- [ ] Tested blog creation
- [ ] Tested careers management
- [ ] Verified data persists

---

**Last Updated:** May 13, 2026
**Status:** Ready for AWS Deployment 🚀
