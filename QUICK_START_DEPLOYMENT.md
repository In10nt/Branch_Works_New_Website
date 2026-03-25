# 🚀 AWS Beanstalk CodePipeline - Quick Start Guide

## What Was Fixed

Your AWS CodePipeline and Beanstalk deployment had several critical issues. **All have been fixed:**

✅ Exposed AWS credentials removed  
✅ Incorrect build artifact structure corrected  
✅ Procfile configured for root deployment  
✅ Beanstalk configurations enhanced  
✅ Security best practices implemented  
✅ Automated setup scripts created  

---

## 🔴 URGENT: First Action

**Immediately rotate your AWS credentials:**

1. Go to: https://console.aws.amazon.com/iam/
2. Find and **deactivate** this key: `AKIAZY6IB3UP2BLYYMHS`
3. Create a new IAM user named `codepipeline-deployer`
4. Generate new access keys for CodePipeline

**Reference:** `AWS_CREDENTIALS_ROTATION.md`

---

## 🔧 Deploy Your Pipeline

### Windows Users (PowerShell)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-codepipeline.ps1
```

### Mac/Linux Users (Bash)
```bash
chmod +x setup-codepipeline.sh
./setup-codepipeline.sh
```

### What It Does
- Creates Beanstalk application & environment
- Sets up CodePipeline infrastructure
- Configures CodeBuild project
- Sets environment variables

---

## 📋 Prerequisites

Before running the setup script, have ready:

1. **AWS Account Access** - with permissions to create Beanstalk, CodePipeline, EC2, etc.
2. **GitHub Token** - personal access token from https://github.com/settings/tokens
   - Scopes: `repo`, `workflow`
3. **Email Credentials** - Gmail app password (not regular password)
4. **Frontend URL** - for CORS configuration (e.g., https://your-domain.netlify.app)

---

## 📁 New Files Created

| File | Purpose |
|------|---------|
| `Procfile` | Tell Beanstalk how to start the Java app |
| `buildspec.yml` | Configure CodeBuild build process |
| `codepipeline-template.yaml` | CloudFormation template for full pipeline |
| `setup-codepipeline.ps1` | Automated setup (Windows) |
| `setup-codepipeline.sh` | Automated setup (Linux/Mac) |
| `.platform/configfiles/java.config` | Java runtime configuration |
| `.platform/hooks/predeploy/01_predeploy.sh` | Pre-deployment cleanup |
| `BEANSTALK_CODEPIPELINE_SETUP.md` | Detailed setup instructions |
| `AWS_CREDENTIALS_ROTATION.md` | Security procedures |

---

## 📊 Deployment Pipeline Flow

```
Your Code (GitHub)
         ↓
    CodePipeline
         ↓
   CodeBuild (Maven + Node.js)
         ↓
   Package Artifacts
         ↓
  Elastic Beanstalk
         ↓
   Running Application
```

---

## ✅ Health Check

Your application has a health endpoint configured:

```bash
GET /health

Response:
{
  "status": "UP"
}
```

Beanstalk will check this every 15 seconds to ensure your app is healthy.

---

## 🔐 Security Notes

✓ **No credentials in git** - all removed  
✓ **Updated .gitignore** - prevents future leaks  
✓ **Environment variables** - used for sensitive data  
✓ **IAM roles** - used instead of access keys  
✓ **Git hooks** - included for pre-commit validation  

---

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
aws logs tail /aws/codebuild/branchworks-build --follow
```

**Deployment fails?**
```bash
aws elasticbeanstalk describe-environment-health --environment-name branchworks-prod
```

**Application not responding?**
```bash
# SSH to instance and check Java process
ps aux | grep java
curl http://localhost:5000/health
```

**Full troubleshooting:** See `TROUBLESHOOTING.md`

---

## 📚 Key Documentation

- `BEANSTALK_CODEPIPELINE_SETUP.md` - Complete setup guide
- `AWS_CREDENTIALS_ROTATION.md` - Security procedures  
- `TROUBLESHOOTING.md` - Common issues and solutions
- `buildspec.yml` - Build configuration
- `codepipeline-template.yaml` - Infrastructure code

---

## 🚀 Next Steps

1. ✅ **Rotate credentials** (see AWS_CREDENTIALS_ROTATION.md)
2. ⬜ Run setup script (`setup-codepipeline.ps1` or `setup-codepipeline.sh`)
3. ⬜ Provide GitHub token when prompted
4. ⬜ Provide email credentials when prompted
5. ⬜ Push code to GitHub
6. ⬜ Monitor deployment at: https://console.aws.amazon.com/elasticbeanstalk/
7. ⬜ Test your application

---

## 💡 Configuration Summary

**Beanstalk Environment:**
- Platform: Java 17 (Corretto)
- Instance: t3.small (can be upgraded)
- Application Port: 5000
- Health Check: `/health` endpoint

**Build Configuration:**
- Builds frontend (React) first
- Builds backend (Spring Boot) with embedded frontend
- Caches Maven dependencies for faster builds
- Output: deployment directory with JAR + Procfile

**Deployment Configuration:**
- Automatic health checks
- CloudWatch logging enabled
- Auto-scaling ready (can be configured)
- Automatic rollback on failure

---

## 📞 Support

If you encounter issues:

1. Check the relevant log file:
   - Build issues → `TROUBLESHOOTING.md`
   - Deployment issues → Beanstalk console logs
   - Security questions → `AWS_CREDENTIALS_ROTATION.md`

2. Review relevant documentation files in the project

3. Check AWS CloudTrail for any errors:
   ```bash
   aws cloudtrail lookup-events --max-results 20
   ```

---

**Status:** ✅ **Ready for Deployment**

All critical issues have been fixed. Your application is ready to deploy to AWS!

**Last Updated:** March 25, 2026

