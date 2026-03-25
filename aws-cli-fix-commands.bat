@echo off
REM AWS CLI Commands to Fix Beanstalk Deployment Issues
REM Run these commands in Command Prompt or PowerShell with AWS CLI installed

cls
echo ==================================================
echo AWS Beanstalk Deployment - CLI Fix Commands
echo ==================================================
echo.

REM STEP 1: Deactivate exposed credentials
echo STEP 1: Deactivate Exposed AWS Credentials
echo ==================================================
echo The following access key needs to be deactivated immediately:
echo Access Key ID: AKIAZY6IB3UP2BLYYMHS
echo.
echo Run this command:
echo aws iam update-access-key --access-key-id AKIAZY6IB3UP2BLYYMHS --status Inactive
echo.
pause

REM STEP 2: Create new IAM user
echo STEP 2: Create New IAM User for CodePipeline
echo ==================================================
echo Create a new IAM user:
echo aws iam create-user --user-name codepipeline-deployer
echo.
echo Create access keys:
echo aws iam create-access-key --user-name codepipeline-deployer
echo.
echo Save the credentials securely!
echo.
pause

REM STEP 3: List Beanstalk applications
echo STEP 3: Check Beanstalk Applications
echo ==================================================
echo.
aws elasticbeanstalk describe-applications
echo.
pause

REM STEP 4: Create Beanstalk application
echo STEP 4: Create Beanstalk Application
echo ==================================================
echo Running: aws elasticbeanstalk create-application
echo.
aws elasticbeanstalk create-application --application-name branchworks-api --description "Branch Works Coming Soon API" 2>nul
echo Application created or already exists
echo.
pause

REM STEP 5: Create Beanstalk environment
echo STEP 5: Create Beanstalk Environment
echo ==================================================
echo This may take 10-15 minutes...
echo.
aws elasticbeanstalk create-environment ^
  --application-name branchworks-api ^
  --environment-name branchworks-prod ^
  --solution-stack-name "64bit Amazon Linux 2 v5.8.3 running Corretto 17" ^
  --option-settings ^
    Namespace=aws:autoscaling:launchconfiguration,OptionName=InstanceType,Value=t3.small ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=SERVER_PORT,Value=5000 ^
    Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true ^
    Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=RetentionInDays,Value=7 ^
  --tags Key=Project,Value=branchworks Key=Environment,Value=production
echo.
echo Waiting for environment to be ready...
aws elasticbeanstalk wait environment-exists --application-name branchworks-api --environment-names branchworks-prod
echo Environment ready!
echo.
pause

REM STEP 6: Get AWS Account ID
echo STEP 6: Create S3 Artifact Bucket
echo ==================================================
for /f "delims=" %%i in ('aws sts get-caller-identity --query Account --output text') do set ACCOUNT_ID=%%i
echo Account ID: %ACCOUNT_ID%
echo.
echo Creating S3 bucket...
aws s3 mb s3://branchworks-pipeline-artifacts-%ACCOUNT_ID%
echo Enabling versioning...
aws s3api put-versioning --bucket branchworks-pipeline-artifacts-%ACCOUNT_ID% --versioning-configuration Status=Enabled
echo S3 bucket created!
echo.
pause

REM STEP 7: Create IAM roles
echo STEP 7: Create IAM Roles
echo ==================================================
echo Creating CodePipeline role...
aws iam create-role --role-name CodePipeline-Beanstalk-Role --assume-role-policy-document file:// 2>nul
echo.
echo Creating CodeBuild role...
aws iam create-role --role-name CodeBuild-Beanstalk-Role --assume-role-policy-document file:// 2>nul
echo Roles created or already exist
echo.
pause

REM STEP 8: Deploy CloudFormation
echo STEP 8: Deploy CodePipeline via CloudFormation
echo ==================================================
echo NOTE: Update the parameters before running!
echo - GitHubOwner: your GitHub username
echo - GitHubRepo: Branch Works_New_Website
echo - GitHubBranch: main
echo - GitHubToken: your GitHub personal access token
echo.
echo Running deployment...
aws cloudformation deploy ^
  --template-file codepipeline-template.yaml ^
  --stack-name branchworks-codepipeline ^
  --parameter-overrides ^
    GitHubOwner=YOUR_GITHUB_USERNAME ^
    GitHubRepo=Branch Works_New_Website ^
    GitHubBranch=main ^
    GitHubToken=YOUR_GITHUB_TOKEN ^
  --capabilities CAPABILITY_NAMED_IAM ^
  --region us-east-1
echo.
pause

REM STEP 9: Configure environment variables
echo STEP 9: Configure Environment Variables
echo ==================================================
echo Updating Beanstalk environment...
aws elasticbeanstalk update-environment ^
  --application-name branchworks-api ^
  --environment-name branchworks-prod ^
  --option-settings ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_USERNAME,Value=your-email@gmail.com ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_PASSWORD,Value=your-app-password ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=COMPANY_EMAIL,Value=company@email.com ^
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=CORS_ORIGINS,Value=https://your-frontend.netlify.app
echo Environment variables configured!
echo.
pause

REM STEP 10: Check status
echo STEP 10: Check Deployment Status
echo ==================================================
echo Beanstalk Health Status:
aws elasticbeanstalk describe-environment-health --environment-name branchworks-prod --attribute-keys All
echo.
pause

REM STEP 11: Final instructions
echo STEP 11: Deployment Complete!
echo ==================================================
echo.
echo Next steps:
echo 1. Push code to GitHub (main branch)
echo 2. Monitor CodePipeline: https://console.aws.amazon.com/codepipeline/
echo 3. Check Beanstalk: https://console.aws.amazon.com/elasticbeanstalk/
echo.
echo View logs:
echo aws logs tail /aws/codebuild/branchworks-build --follow
echo aws elasticbeanstalk describe-events --environment-name branchworks-prod --max-records 20
echo.
pause

