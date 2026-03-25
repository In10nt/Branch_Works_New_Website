# ✅ AWS CodePipeline Deployment Checklist

## 🔴 CRITICAL - Security (Do First!)

- [ ] **IMMEDIATELY** rotate AWS credentials
  - Access AWS IAM Console: https://console.aws.amazon.com/iam/
  - Deactivate key: `AKIAZY6IB3UP2BLYYMHS`
  - Create new IAM user: `codepipeline-deployer`
  - Save new credentials securely
  - Reference: `AWS_CREDENTIALS_ROTATION.md`

- [ ] Clean Git history (if credentials were pushed)
  ```bash
  git filter-branch --tree-filter 'rm -f aws_secret.txt' HEAD
  git push origin --force-with-lease
  ```

- [ ] Verify .gitignore is updated
  - File: `.gitignore`
  - Contains: AWS credentials, .env, *.key, etc.

- [ ] Review CloudTrail for suspicious activity
  ```bash
  aws cloudtrail lookup-events --max-results 50
  ```

---

## 📋 Pre-Deployment Setup

### AWS Account Setup
- [ ] AWS Account with appropriate permissions
- [ ] AWS CLI installed and configured
  ```bash
  aws --version
  aws sts get-caller-identity  # Verify it works
  ```

### GitHub Setup
- [ ] GitHub account access
- [ ] Personal access token created
  - Go to: https://github.com/settings/tokens
  - Scopes: `repo`, `workflow`
  - Save token securely

### Email Configuration
- [ ] Gmail account set up
- [ ] Gmail app password generated (not regular password)
  - Go to: https://myaccount.google.com/apppasswords
  - Select "Mail" and "Windows Computer" (or your OS)
  - Copy generated 16-character password

### Frontend URL
- [ ] Netlify or frontend domain URL ready
  - Example: `https://your-domain.netlify.app`
  - Used for CORS configuration

---

## 🚀 Deployment Phase

### Option A: Automated Setup (Recommended)

#### Windows (PowerShell)
```powershell
# 1. Open PowerShell
# 2. Navigate to project directory
cd "C:\In10nt Projects\Branch Works_New_Website"

# 3. Run setup script
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-codepipeline.ps1

# 4. Follow prompts and provide:
#    - AWS Region (usually us-east-1)
#    - GitHub Owner
#    - GitHub Repository
#    - GitHub Branch (usually main)
#    - GitHub Personal Access Token
#    - Application Name
#    - Environment Name
#    - Email credentials
#    - CORS origins
```

**Progress Checklist:**
- [ ] Beanstalk application created
- [ ] Beanstalk environment created (may take 10-15 minutes)
- [ ] S3 bucket for artifacts created
- [ ] CloudFormation stack deployed
- [ ] Environment variables configured

#### Linux/Mac (Bash)
```bash
# 1. Open terminal
# 2. Navigate to project directory
cd "path/to/Branch Works_New_Website"

# 3. Make script executable
chmod +x setup-codepipeline.sh

# 4. Run setup script
./setup-codepipeline.sh

# 5. Follow prompts (same as PowerShell version above)
```

### Option B: Manual Setup

If automated setup fails or you prefer manual setup:

1. [ ] Create Beanstalk Application
   ```bash
   aws elasticbeanstalk create-application \
     --application-name branchworks-api \
     --description "Branch Works Coming Soon API"
   ```

2. [ ] Create Beanstalk Environment
   ```bash
   aws elasticbeanstalk create-environment \
     --application-name branchworks-api \
     --environment-name branchworks-prod \
     --solution-stack-name "64bit Amazon Linux 2 v5.8.3 running Corretto 17"
   ```
   - Wait 10-15 minutes for environment to be ready

3. [ ] Deploy CodePipeline
   ```bash
   aws cloudformation deploy \
     --template-file codepipeline-template.yaml \
     --stack-name branchworks-codepipeline \
     --parameter-overrides \
       GitHubOwner=<your-github-username> \
       GitHubRepo=Branch Works_New_Website \
       GitHubBranch=main \
       GitHubToken=<your-github-token> \
     --capabilities CAPABILITY_NAMED_IAM
   ```

4. [ ] Configure Environment Variables
   ```bash
   aws elasticbeanstalk update-environment \
     --application-name branchworks-api \
     --environment-name branchworks-prod \
     --option-settings \
       Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_USERNAME,Value=<your-email> \
       Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_PASSWORD,Value=<your-app-password> \
       Namespace=aws:elasticbeanstalk:application:environment,OptionName=COMPANY_EMAIL,Value=<company-email> \
       Namespace=aws:elasticbeanstalk:application:environment,OptionName=CORS_ORIGINS,Value=<frontend-url>
   ```

---

## ✅ Post-Deployment Verification

### Infrastructure Check
- [ ] Beanstalk environment is "Green" (healthy)
  ```bash
  aws elasticbeanstalk describe-environment-health \
    --environment-name branchworks-prod
  ```

- [ ] CodePipeline created successfully
  ```bash
  aws codepipeline get-pipeline --name branchworks-deployment-pipeline
  ```

- [ ] S3 artifact bucket created
  ```bash
  aws s3 ls | grep branchworks-pipeline-artifacts
  ```

### Configuration Check
- [ ] Procfile in root directory
  - [ ] Contains: `web: java -jar coming-soon-backend-0.0.1-SNAPSHOT.jar`

- [ ] buildspec.yml properly configured
  - [ ] Builds React frontend
  - [ ] Builds Spring Boot backend
  - [ ] Creates deployment directory with artifacts

- [ ] .ebextensions configured
  - [ ] Port 5000 configured
  - [ ] Health check endpoint `/health` configured
  - [ ] CloudWatch logging enabled

- [ ] .platform directory created
  - [ ] Java configuration in place
  - [ ] Pre-deployment hooks set up

### Code Push
- [ ] Code pushed to GitHub
  - [ ] Branch: main (or configured branch)
  - [ ] All changes committed and pushed

- [ ] CodePipeline Triggered
  - [ ] Check: https://console.aws.amazon.com/codepipeline/
  - [ ] Should see "Succeeded" in Source stage
  - [ ] Should see build progress in Build stage

### Build Verification
- [ ] CodeBuild Build Succeeds
  ```bash
  aws logs tail /aws/codebuild/branchworks-build --follow
  ```
  - [ ] React frontend builds successfully
  - [ ] Maven builds Spring Boot backend
  - [ ] No compilation errors

- [ ] Artifacts Created
  - [ ] Check S3 bucket for deployment package
  ```bash
  aws s3 ls s3://branchworks-pipeline-artifacts-<account-id>/ --recursive
  ```

### Deployment Verification
- [ ] Deployment to Beanstalk Succeeds
  ```bash
  aws elasticbeanstalk describe-events \
    --environment-name branchworks-prod \
    --max-records 10
  ```

- [ ] Application Starts
  - [ ] Beanstalk environment shows "Ready" status
  - [ ] No errors in environment events

- [ ] Health Checks Pass
  ```bash
  # Wait 2-3 minutes after deployment
  curl http://<beanstalk-url>/health
  # Should return: {"status":"UP"}
  ```

- [ ] Frontend Embedded Successfully
  - [ ] Visit Beanstalk application URL
  - [ ] Should see coming soon page
  - [ ] Should load without errors

---

## 🧪 Application Testing

### Endpoint Tests
- [ ] Health endpoint responds
  ```bash
  curl http://<beanstalk-url>/health
  ```

- [ ] Root endpoint responds
  ```bash
  curl http://<beanstalk-url>/
  # Should return: {"status":"ok","message":"Branchworks API is running"}
  ```

- [ ] Frontend loads
  - [ ] Visit http://<beanstalk-url> in browser
  - [ ] HTML page loads
  - [ ] CSS/JS load without 404 errors

### Email Integration Test
- [ ] Email service configured
- [ ] Environment variables set correctly
- [ ] Test email sending (if applicable)

### CORS Test
- [ ] Frontend can call backend API
- [ ] CORS headers properly configured
- [ ] No console errors in browser

---

## 📊 Monitoring Setup

- [ ] CloudWatch Logs Enabled
  ```bash
  aws elasticbeanstalk describe-configuration-settings \
    --application-name branchworks-api \
    --environment-name branchworks-prod
  ```

- [ ] View Application Logs
  ```bash
  aws elasticbeanstalk request-environment-info \
    --environment-name branchworks-prod \
    --info-type logs
  sleep 10
  aws elasticbeanstalk retrieve-environment-info \
    --environment-name branchworks-prod \
    --info-type logs
  ```

- [ ] Set Up Alarms (Optional)
  - [ ] CPU utilization alarm
  - [ ] Health check failure alarm
  - [ ] Unhealthy host alarm

---

## 🔄 Future Deployments

### Normal Deployment Process
1. Make code changes
2. Commit and push to GitHub
3. CodePipeline automatically triggers
4. Monitor: https://console.aws.amazon.com/codepipeline/
5. Check Beanstalk environment health

### Quick Commands
```bash
# Check pipeline status
aws codepipeline get-pipeline-state --name branchworks-deployment-pipeline

# View recent events
aws elasticbeanstalk describe-events --environment-name branchworks-prod

# Check health
aws elasticbeanstalk describe-environment-health --environment-name branchworks-prod

# View logs
aws logs tail /aws/codebuild/branchworks-build
```

---

## ⚠️ Rollback Procedure

If deployment goes wrong:

1. [ ] Check error logs immediately
2. [ ] Abort current deployment (if needed)
   ```bash
   aws elasticbeanstalk abort-environment-update --environment-name branchworks-prod
   ```

3. [ ] Revert to previous version
   ```bash
   # List versions
   aws elasticbeanstalk describe-application-versions \
     --application-name branchworks-api
   
   # Redeploy previous version
   aws elasticbeanstalk update-environment \
     --environment-name branchworks-prod \
     --version-label <previous-version-label>
   ```

---

## 📞 Troubleshooting Quick Links

**Build failures:** See `TROUBLESHOOTING.md` → "Issue 1: CodePipeline Fails at Build"

**Deployment failures:** See `TROUBLESHOOTING.md` → "Issue 2: Deployment Fails at Deploy"

**Application not responding:** See `TROUBLESHOOTING.md` → "Issue 3: Application Starts But Health Check Fails"

**Environment variable issues:** See `TROUBLESHOOTING.md` → "Issue 4: Environment Variables Not Applied"

**Security questions:** See `AWS_CREDENTIALS_ROTATION.md`

---

## 📝 Final Notes

- [ ] Document your Beanstalk URL
- [ ] Document your CodePipeline name
- [ ] Document your GitHub repository connection
- [ ] Share deployment documentation with team
- [ ] Set up backup strategy (if needed)
- [ ] Plan for auto-scaling (if needed)
- [ ] Monitor costs on AWS Cost Explorer

---

## ✨ Deployment Complete!

Once all checks are complete, your application is successfully deployed to AWS Elastic Beanstalk via CodePipeline!

**Your application is now:**
- ✅ Automatically deployed on code push
- ✅ Monitored for health
- ✅ Logged to CloudWatch
- ✅ Scalable with auto-scaling (optional)
- ✅ Secure with IAM roles

**Next Steps:**
1. Configure custom domain/DNS
2. Enable HTTPS/SSL certificate
3. Set up alerts for failures
4. Plan capacity for growth

---

**Created:** March 25, 2026  
**Status:** ✅ Complete and Ready for Deployment  
**Reference:** All documentation files in project root

