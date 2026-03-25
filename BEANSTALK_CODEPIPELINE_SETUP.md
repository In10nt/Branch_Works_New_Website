# AWS Beanstalk Deployment via CodePipeline - Setup Guide

## ⚠️ CRITICAL SECURITY NOTICE

The AWS credentials that were exposed in the repository have been removed. You must:

### 1. **Rotate Your AWS Credentials Immediately**
- Go to IAM console in AWS
- Delete or deactivate the key: `AKIAZY6IB3UP2BLYYMHS`
- Create a new IAM user with appropriate permissions
- **NEVER commit credentials to git again**

### 2. **Setup CodePipeline with Proper IAM Roles**

Create an IAM role for CodePipeline with these permissions:
- CodeBuild permissions
- S3 access for artifacts
- Beanstalk deployment permissions
- CloudFormation (for Beanstalk)

### 3. **Configure CodeBuild Project**

**Buildspec File:** `buildspec.yml` (already configured)

**Environment Variables in CodeBuild:**
```
MAIL_USERNAME = <your-gmail-email>
MAIL_PASSWORD = <your-gmail-app-password>
COMPANY_EMAIL = <your-company-email>
CORS_ORIGINS = <your-frontend-url>
SERVER_PORT = 5000
```

### 4. **Configure Beanstalk Environment**

**Platform:** Java 17 with Corretto
**Application Name:** `branchworks-api`
**Environment Name:** `branchworks-prod` (or similar)

**Environment Variables:**
```
MAIL_USERNAME=<your-gmail-email>
MAIL_PASSWORD=<your-gmail-app-password>
COMPANY_EMAIL=<your-company-email>
CORS_ORIGINS=https://your-frontend-domain.com
SERVER_PORT=5000
```

### 5. **CodePipeline Stages**

1. **Source**: Connect to GitHub repository
2. **Build**: Use CodeBuild with provided `buildspec.yml`
3. **Deploy**: Deploy to Beanstalk environment

### 6. **Deployment Process**

The `buildspec.yml` will:
1. Install Node.js dependencies
2. Build React frontend
3. Build Spring Boot backend with embedded frontend
4. Package artifacts with Procfile and .ebextensions
5. Upload to S3

Beanstalk will:
1. Download artifacts
2. Use Procfile to start the Java application
3. Run health checks on `/health` endpoint
4. Apply environment configuration from `.ebextensions`

### 7. **Health Check Configuration**

- **Endpoint**: `/health`
- **Interval**: 15 seconds
- **Timeout**: 5 seconds
- **Healthy Threshold**: 2 checks
- **Unhealthy Threshold**: 3 checks

### 8. **Monitoring Issues**

**If deployment fails, check:**

1. **CodeBuild Logs**
   - Check for Maven build errors
   - Ensure Node.js dependencies install correctly

2. **Beanstalk Logs**
   - Download recent logs from Beanstalk console
   - Check `/var/log/eb-activity.log`

3. **Common Issues**
   - Missing environment variables in Beanstalk
   - Incorrect IAM permissions
   - Java version mismatch
   - Port conflicts

### 9. **Environment Variables Security**

**For Beanstalk, use:**
- AWS Secrets Manager (recommended)
- Environment properties in Beanstalk console
- Environment configuration files (NOT in git)

**DO NOT:**
- Commit credentials to git
- Store secrets in configuration files
- Use the same credentials across environments

### 10. **Database Configuration**

Currently using H2 (in-memory). For production:

1. Switch to RDS (PostgreSQL/MySQL)
2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://your-rds-endpoint:3306/comingsoondb
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
```

3. Add RDS connection dependency to `pom.xml`

## Troubleshooting

### Deployment Failures

```bash
# Check Beanstalk environment status
aws elasticbeanstalk describe-environment-health --environment-name branchworks-prod

# View recent events
aws elasticbeanstalk describe-events --environment-name branchworks-prod --max-records 20

# Check environment logs
aws elasticbeanstalk request-environment-info --environment-name branchworks-prod --info-type logs
```

### Application Not Starting

1. SSH into Beanstalk instance
2. Check Java process: `ps aux | grep java`
3. Check logs: `tail -f /var/log/eb-activity.log`
4. Test health endpoint: `curl http://localhost:5000/health`

### Port Issues

If port 5000 is already in use:
- Change `server.port` in `application.properties`
- Update `.ebextensions/environment.config`
- Restart Beanstalk environment

## Next Steps

1. ✅ Remove exposed credentials (DONE)
2. ⚠️ Rotate AWS access keys immediately
3. ⚠️ Setup new IAM role for CodePipeline
4. ⚠️ Configure Beanstalk environment
5. ⚠️ Setup CodePipeline with three stages
6. ⚠️ Test deployment process
7. ⚠️ Monitor application logs after first deployment

