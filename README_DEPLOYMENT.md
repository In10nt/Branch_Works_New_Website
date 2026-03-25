# Branchworks Coming Soon - Deployment Summary

## Quick Start

To deploy your application to AWS Elastic Beanstalk:

```powershell
# 1. Install EB CLI (one-time setup)
pip install awsebcli --upgrade --user

# 2. Run deployment script
./deploy-working.ps1
```

## What's Configured

✅ **Environment**: Branchworks-coming-soon-env  
✅ **Region**: eu-north-1  
✅ **Platform**: Docker on Amazon Linux 2023  
✅ **Instance**: t3.small with 30GB gp3 storage  
✅ **Port**: 5000 (configured in security group and load balancer)  
✅ **Health Check**: /health endpoint  
✅ **Application**: Spring Boot with embedded React frontend  

## Files

- **deploy-working.ps1** - Main deployment script (requires EB CLI)
- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions and troubleshooting
- **Dockerfile** - Docker configuration for the application
- **.ebextensions/environment.config** - Beanstalk environment configuration

## Application Structure

```
├── frontend (React)
│   └── Built into backend/target/classes/static
├── backend (Spring Boot)
│   ├── JAR: coming-soon-backend-0.0.1-SNAPSHOT.jar
│   └── Runs on port 5000
└── deployment
    └── Dockerfile (for Elastic Beanstalk)
```

## Current Issue

The deployment is failing due to ZIP format incompatibility:
- Windows PowerShell creates ZIPs with backslashes
- Linux cannot extract these ZIPs

**Solution**: Use EB CLI (recommended) or 7-Zip to create proper deployment packages.

## Application URL

Once deployed: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com

## Need Help?

See **DEPLOYMENT_GUIDE.md** for:
- Detailed deployment steps
- Alternative deployment methods
- Troubleshooting guide
- Configuration details
