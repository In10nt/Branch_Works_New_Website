# AWS Elastic Beanstalk Deployment Guide

## Current Status

**Environment**: Branchworks-coming-soon-env  
**Region**: eu-north-1  
**Platform**: Docker on Amazon Linux 2023  
**Status**: Configuration complete, deployment failing due to ZIP format issue

## Issue Summary

The deployment is failing with:
```
ERROR: /opt/elasticbeanstalk/deployment/app_source_bundle appears to use backslashes as path separators
Command /usr/bin/unzip failed with error exit status 1
```

**Root Cause**: Windows PowerShell's `Compress-Archive` creates ZIP files with backslashes in paths, which Linux cannot extract.

## Solution: Use EB CLI for Deployment

The EB CLI creates proper Linux-compatible deployment packages.

### Step 1: Install EB CLI

```powershell
# Install using pip
pip install awsebcli --upgrade --user

# Verify installation
eb --version
```

### Step 2: Initialize EB CLI

```powershell
# Initialize EB in your project
eb init

# Select:
# - Region: eu-north-1
# - Application: Branchworks-coming-soon
# - Platform: Docker
# - Do not set up SSH
```

### Step 3: Deploy

```powershell
# Build the application first
npm install --legacy-peer-deps
npm run build
cd backend
mvn clean package -DskipTests
cd ..

# Deploy using EB CLI
eb deploy Branchworks-coming-soon-env
```

The EB CLI will:
1. Create a proper deployment package
2. Upload to S3
3. Deploy to your environment
4. Monitor the deployment

## Alternative: Manual Deployment with 7-Zip

If you can't use EB CLI, install 7-Zip and use it to create the ZIP:

### Step 1: Install 7-Zip

Download from: https://www.7-zip.org/

### Step 2: Create Deployment Package

```powershell
# Build application
npm install --legacy-peer-deps
npm run build
cd backend
mvn clean package -DskipTests
cd ..

# Create deployment folder
New-Item -ItemType Directory -Path "deploy" -Force
New-Item -ItemType Directory -Path "deploy\.ebextensions" -Force

# Copy files
Copy-Item "backend\target\coming-soon-backend-0.0.1-SNAPSHOT.jar" "deploy\"
Copy-Item "deployment\Dockerfile" "deploy\"
Copy-Item ".ebextensions\environment.config" "deploy\.ebextensions\"

# Create ZIP with 7-Zip (Linux-compatible)
& "C:\Program Files\7-Zip\7z.exe" a -tzip branchworks-deploy.zip .\deploy\*

# Upload and deploy
$bucket = "elasticbeanstalk-eu-north-1-672045063455"
$version = "manual-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

aws s3 cp branchworks-deploy.zip "s3://$bucket/branchworks/branchworks-deploy.zip" --region eu-north-1

aws elasticbeanstalk create-application-version `
    --application-name Branchworks-coming-soon `
    --version-label $version `
    --source-bundle S3Bucket=$bucket,S3Key=branchworks/branchworks-deploy.zip `
    --region eu-north-1

aws elasticbeanstalk update-environment `
    --environment-name Branchworks-coming-soon-env `
    --version-label $version `
    --region eu-north-1
```

## Configuration Files

### Dockerfile (deployment/Dockerfile)
```dockerfile
FROM amazoncorretto:17-alpine
WORKDIR /app
COPY coming-soon-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-Dserver.port=5000", "-jar", "app.jar"]
```

### Environment Config (.ebextensions/environment.config)
```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    SERVER_PORT: "5000"
    JAVA_OPTS: "-Dserver.port=5000"
    JAVA_TOOL_OPTIONS: "-Xmx256m -Xms128m"
  aws:elasticbeanstalk:xray:
    XRayEnabled: false
  aws:elasticbeanstalk:cloudwatch:logs:
    StreamLogs: true
    DeleteOnTerminate: false
    RetentionInDays: 7
  aws:autoscaling:launchconfiguration:
    InstanceType: t3.small
    RootVolumeSize: 30
    RootVolumeType: gp3
  aws:elasticbeanstalk:environment:process:default:
    Port: "5000"
    Protocol: HTTP
    HealthCheckPath: "/health"
    HealthCheckInterval: "15"
    HealthCheckTimeout: "5"
    HealthyThresholdCount: "2"
    UnhealthyThresholdCount: "3"
    MatcherHTTPCode: "200"
```

## Deployment Package Structure

Your deployment ZIP should contain:
```
├── coming-soon-backend-0.0.1-SNAPSHOT.jar
├── Dockerfile
└── .ebextensions/
    └── environment.config
```

## Monitoring Deployment

```powershell
# Check environment status
aws elasticbeanstalk describe-environments `
    --environment-names Branchworks-coming-soon-env `
    --region eu-north-1 `
    --query "Environments[0].[Status,Health,HealthStatus]"

# Check recent events
aws elasticbeanstalk describe-events `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --max-records 10

# Check instance health
aws elasticbeanstalk describe-instances-health `
    --environment-name Branchworks-coming-soon-env `
    --region eu-north-1 `
    --attribute-names All
```

## Application URLs

Once deployed successfully:
- **Main Site**: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com
- **Health Check**: http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com/health

## Troubleshooting

### If deployment still fails:

1. **Check logs**:
```powershell
aws elasticbeanstalk request-environment-info `
    --environment-name Branchworks-coming-soon-env `
    --info-type tail `
    --region eu-north-1

# Wait 30 seconds, then:
aws elasticbeanstalk retrieve-environment-info `
    --environment-name Branchworks-coming-soon-env `
    --info-type tail `
    --region eu-north-1
```

2. **Verify Dockerfile is in package**:
```powershell
# Extract and check your ZIP
Expand-Archive -Path branchworks-deploy.zip -DestinationPath test-extract
Get-ChildItem test-extract -Recurse
```

3. **Check security group** (already configured):
   - Port 5000: ✓ Configured
   - Security Group: sg-0a03e82c7a494e3a6

### Common Issues

1. **ZIP format**: Use EB CLI or 7-Zip, not PowerShell Compress-Archive
2. **Missing Dockerfile**: Ensure Dockerfile is in the root of the ZIP
3. **Port mismatch**: Application must run on port 5000
4. **Health check**: Ensure /health endpoint returns HTTP 200

## CodePipeline (Currently Failing)

The CodePipeline source stage is failing. To fix:

1. Go to AWS Console → CodePipeline → Settings → Connections
2. Check "github-branchworks-connection" status
3. If not "Available", re-authorize GitHub access

Or deploy manually using EB CLI as described above.

## Next Steps

1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Deploy: `eb deploy Branchworks-coming-soon-env`
4. Monitor: `eb health` or `eb logs`

## Support

If issues persist:
- Check AWS Console → Elastic Beanstalk → Environments → Branchworks-coming-soon-env → Logs
- Review eb-engine.log for detailed error messages
- Ensure Docker platform is compatible with your Dockerfile
