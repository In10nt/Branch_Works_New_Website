# AWS Beanstalk Deployment Fix Guide

## Issues Identified

### 1. Pipeline Source Stage Failing
- **Problem**: CodePipeline source stage is failing with no revision ID
- **Cause**: GitHub connection might have permission issues or repository access problems
- **Status**: Connection is AVAILABLE but not pulling code

### 2. Instance Type Configuration Error
- **Problem**: Environment had conflicting instance type settings (t1.micro vs t3.small)
- **Error**: "Invalid option value: 't1.micro' - Value is not one of the allowed values"
- **Fix Applied**: Updated to t3.small with gp3 storage

### 3. Health Check Failures
- **Problem**: ELB health checks failing - "None of the instances are sending data"
- **Cause**: Port mismatch and incorrect health check configuration
- **Fix Applied**: Configured port 5000 with /health endpoint

## Fixes Applied

### Configuration Files Updated

1. **`.ebextensions/environment.config`** - Consolidated all settings:
   - Instance type: t3.small
   - Storage: 30GB gp3
   - Port: 5000
   - Health check: /health endpoint
   - Java options for port 5000

2. **`buildspec.yml`** - Fixed deployment packaging:
   - Properly copies .ebextensions folder
   - Ensures Procfile is included

3. **Removed duplicate configs**:
   - Deleted `.ebextensions/fix-port-config.config`
   - Deleted `.ebextensions/healthcheck.config`

### Environment Updates Applied

✅ Instance type set to t3.small
✅ Root volume upgraded to gp3 (better performance)
✅ Port 5000 configuration applied
✅ Health check endpoint set to /health
✅ New instance launched (old unhealthy instance removed)

## Current Status

- **Environment**: Updating (replacing instance)
- **Health**: Improved from Severe to Info
- **Instance**: New instance i-0854d917d4ffc2429 launched
- **Pipeline**: Source stage still failing

## Next Steps

### Option 1: Automated Fix (Recommended)

Run the automated script that will:
1. Wait for environment to be ready
2. Apply port configuration
3. Commit and push changes
4. Trigger pipeline deployment

```powershell
./wait-and-deploy.ps1
```

This script will:
- Monitor environment status
- Push configuration changes to GitHub
- Trigger CodePipeline
- Monitor deployment progress

### Option 2: Manual Steps

If you prefer manual control:

#### Step 1: Wait for Environment
```powershell
# Check status every minute
./check-status.ps1
```

Wait until Status shows "Ready"

#### Step 2: Commit and Push Changes
```bash
git add .ebextensions/environment.config buildspec.yml
git add -u
git commit -m "Fix: Consolidated Beanstalk configuration"
git push origin master
```

#### Step 3: Trigger Pipeline
```powershell
aws codepipeline start-pipeline-execution `
    --name branchworks-pipeline `
    --region eu-north-1
```

#### Step 4: Monitor Deployment
```powershell
# Check pipeline
aws codepipeline get-pipeline-state `
    --name branchworks-pipeline `
    --region eu-north-1 `
    --query "stageStates[*].[stageName,latestExecution.status]" `
    --output table

# Check environment
aws elasticbeanstalk describe-events `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --max-records 10
```

## Troubleshooting

### If Pipeline Source Still Fails

The CodeStar connection might need re-authorization:

1. Go to AWS Console → CodePipeline → Settings → Connections
2. Find "github-branchworks-connection"
3. If status is not "Available", click "Update pending connection"
4. Re-authorize GitHub access

Or update the connection:
```powershell
# Check connection status
aws codestar-connections get-connection `
    --connection-arn "arn:aws:codeconnections:eu-north-1:672045063455:connection/1db8b00b-bedc-4d41-8088-a40f7dbd68a3" `
    --region eu-north-1
```

### If Health Stays Red

1. **Check application logs**:
```powershell
aws elasticbeanstalk request-environment-info `
    --environment-name Branchworks-coming-soon-env `
    --info-type tail `
    --region eu-north-1

# Wait 30 seconds, then retrieve
aws elasticbeanstalk retrieve-environment-info `
    --environment-name Branchworks-coming-soon-env `
    --info-type tail `
    --region eu-north-1
```

2. **Verify health endpoint**:
```powershell
$url = aws elasticbeanstalk describe-environments `
    --environment-names Branchworks-coming-soon-env `
    --region eu-north-1 `
    --query "Environments[0].CNAME" `
    --output text

Invoke-WebRequest -Uri "http://$url/health"
```

3. **Check recent events**:
```powershell
aws elasticbeanstalk describe-events `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --max-records 20 `
    --query "Events[?Severity=='ERROR']"
```

### If Deployment Takes Too Long

Normal deployment timeline:
- Environment update: 5-10 minutes
- Pipeline build: 5-10 minutes
- Beanstalk deployment: 5-10 minutes
- Health check stabilization: 2-5 minutes
- **Total: 15-30 minutes**

If it exceeds 30 minutes, check for errors in events.

## Application URLs

Once deployed:
- **Main site**: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com
- **Health check**: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com/health

## Monitoring Commands

```powershell
# Quick status check
./check-status.ps1

# Detailed health
aws elasticbeanstalk describe-environment-health `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --attribute-names All

# Recent events
aws elasticbeanstalk describe-events `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --max-records 20

# Pipeline status
aws codepipeline get-pipeline-state `
    --name branchworks-pipeline `
    --region eu-north-1
```

## Summary

The main issues were:
1. ✅ **Instance type conflict** - Fixed by setting t3.small explicitly
2. ✅ **Port configuration** - Fixed by setting port 5000 throughout
3. ✅ **Health checks** - Fixed by configuring /health endpoint
4. ⏳ **Pipeline source** - Needs to be triggered after changes are pushed

Run `./wait-and-deploy.ps1` to complete the deployment automatically, or follow the manual steps above.
