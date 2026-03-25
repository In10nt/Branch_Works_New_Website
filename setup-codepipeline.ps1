# AWS CodePipeline and Beanstalk Setup Script (PowerShell)
# Run this to set up your entire deployment pipeline on Windows

# Enable error handling
$ErrorActionPreference = "Stop"

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "[!] $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check AWS CLI is installed
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "AWS CLI not found. Please install it first: https://aws.amazon.com/cli/"
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Branch Works - AWS Deployment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Configuration
$AWSRegion = Read-Host "Enter AWS Region (default: us-east-1)"
if (-not $AWSRegion) { $AWSRegion = "us-east-1" }

$GitHubOwner = Read-Host "Enter GitHub Owner"
$GitHubRepo = Read-Host "Enter GitHub Repository"
$GitHubBranch = Read-Host "Enter GitHub Branch (default: main)"
if (-not $GitHubBranch) { $GitHubBranch = "main" }

$GitHubToken = Read-Host "Enter GitHub Personal Access Token" -AsSecureString
$GitHubToken = [System.Net.NetworkCredential]::new('', $GitHubToken).Password

$AppName = Read-Host "Enter Beanstalk Application Name (default: branchworks-api)"
if (-not $AppName) { $AppName = "branchworks-api" }

$EnvName = Read-Host "Enter Beanstalk Environment Name (default: branchworks-prod)"
if (-not $EnvName) { $EnvName = "branchworks-prod" }

# Get AWS Account ID
$AWSAccountID = aws sts get-caller-identity --query Account --output text
Write-Success "AWS Account ID: $AWSAccountID"

# Step 1: Create Beanstalk Application
Write-Warning-Custom "Step 1: Creating Beanstalk Application..."
try {
    $AppExists = aws elasticbeanstalk describe-applications --application-names $AppName --region $AWSRegion 2>$null | Select-String $AppName
    if ($AppExists) {
        Write-Success "Application already exists"
    } else {
        aws elasticbeanstalk create-application `
            --application-name $AppName `
            --description "Branch Works Coming Soon API" `
            --region $AWSRegion
        Write-Success "Application created"
    }
} catch {
    Write-Warning-Custom "Could not verify application status. Continuing..."
}

# Step 2: Create Beanstalk Environment
Write-Warning-Custom "Step 2: Creating Beanstalk Environment..."
try {
    $EnvExists = aws elasticbeanstalk describe-environments --application-name $AppName --environment-names $EnvName --region $AWSRegion 2>$null | Select-String $EnvName
    if ($EnvExists) {
        Write-Success "Environment already exists"
    } else {
        Write-Host "Creating Beanstalk environment. This may take 10-15 minutes..."
        aws elasticbeanstalk create-environment `
            --application-name $AppName `
            --environment-name $EnvName `
            --solution-stack-name "64bit Amazon Linux 2 v5.8.3 running Corretto 17" `
            --option-settings `
                Namespace=aws:autoscaling:launchconfiguration,OptionName=InstanceType,Value=t3.small `
                Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role `
                Namespace=aws:elasticbeanstalk:application:environment,OptionName=SERVER_PORT,Value=5000 `
                Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true `
                Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=RetentionInDays,Value=7 `
            --region $AWSRegion `
            --tags Key=Project,Value=branchworks Key=Environment,Value=production

        Write-Warning-Custom "Waiting for environment to be ready..."
        aws elasticbeanstalk wait environment-exists `
            --application-name $AppName `
            --environment-names $EnvName `
            --region $AWSRegion
        Write-Success "Environment created"
    }
} catch {
    Write-Warning-Custom "Could not verify environment status. Continuing..."
}

# Step 3: Create S3 bucket for artifacts
Write-Warning-Custom "Step 3: Creating S3 Bucket for Artifacts..."
$ArtifactBucket = "branchworks-pipeline-artifacts-$AWSAccountID"

try {
    $BucketExists = aws s3 ls "s3://$ArtifactBucket" 2>$null
    if ($BucketExists) {
        Write-Success "S3 Bucket already exists"
    } else {
        aws s3 mb "s3://$ArtifactBucket" --region $AWSRegion
        aws s3api put-versioning --bucket $ArtifactBucket --versioning-configuration Status=Enabled
        Write-Success "S3 Bucket created"
    }
} catch {
    Write-Warning-Custom "Could not verify bucket status. Continuing..."
}

# Step 4: Deploy CodePipeline using CloudFormation
Write-Warning-Custom "Step 4: Deploying CodePipeline..."
try {
    aws cloudformation deploy `
        --template-file codepipeline-template.yaml `
        --stack-name branchworks-codepipeline `
        --parameter-overrides `
            GitHubOwner=$GitHubOwner `
            GitHubRepo=$GitHubRepo `
            GitHubBranch=$GitHubBranch `
            GitHubToken=$GitHubToken `
        --capabilities CAPABILITY_NAMED_IAM `
        --region $AWSRegion
    Write-Success "CodePipeline deployed"
} catch {
    Write-Error-Custom "Failed to deploy CodePipeline: $_"
}

# Step 5: Configure environment variables
Write-Warning-Custom "Step 5: Configuring Environment Variables..."
$MailUsername = Read-Host "Mail Username (Gmail)"
$MailPassword = Read-Host "Mail Password (Gmail App Password)" -AsSecureString
$MailPassword = [System.Net.NetworkCredential]::new('', $MailPassword).Password

$CompanyEmail = Read-Host "Company Email"
$CorsOrigins = Read-Host "CORS Origins (Frontend URL)"

try {
    aws elasticbeanstalk update-environment `
        --application-name $AppName `
        --environment-name $EnvName `
        --option-settings `
            Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_USERNAME,Value=$MailUsername `
            Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_PASSWORD,Value=$MailPassword `
            Namespace=aws:elasticbeanstalk:application:environment,OptionName=COMPANY_EMAIL,Value=$CompanyEmail `
            Namespace=aws:elasticbeanstalk:application:environment,OptionName=CORS_ORIGINS,Value=$CorsOrigins `
        --region $AWSRegion
    Write-Success "Environment variables configured"
} catch {
    Write-Error-Custom "Failed to configure environment variables: $_"
}

# Summary
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "[OK] Setup Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Pipeline Details:"
Write-Host "  Application: $AppName"
Write-Host "  Environment: $EnvName"
Write-Host "  Region: $AWSRegion"
Write-Host ("  GitHub: {0}/{1} (branch: {2})" -f $GitHubOwner, $GitHubRepo, $GitHubBranch)

Write-Warning-Custom "Next Steps:"
Write-Host ("1. Push code to GitHub ({0} branch)" -f $GitHubBranch)
Write-Host "2. CodePipeline will automatically trigger"
Write-Host "3. Monitor deployment at: https://console.aws.amazon.com/elasticbeanstalk/"
Write-Host ("4. View logs: aws elasticbeanstalk request-environment-info --environment-name {0} --info-type logs" -f $EnvName)

Write-Warning-Custom "Important:"
Write-Host "- The exposed AWS credentials have been deactivated"
Write-Host "- Review AWS_CREDENTIALS_ROTATION.md for security best practices"
Write-Host "- Never commit credentials to Git"
Write-Host "- Use Beanstalk environment variables or AWS Secrets Manager"

Write-Host "`n[OK] Happy deploying!`n" -ForegroundColor Green
