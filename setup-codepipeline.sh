#!/bin/bash
# AWS CodePipeline and Beanstalk Setup Script
# Run this to set up your entire deployment pipeline

set -e

echo "========================================"
echo "Branch Works - AWS Deployment Setup"
echo "========================================"

# Check AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
read -p "Enter AWS Region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

read -p "Enter GitHub Owner: " GITHUB_OWNER
read -p "Enter GitHub Repository: " GITHUB_REPO
read -p "Enter GitHub Branch (default: main): " GITHUB_BRANCH
GITHUB_BRANCH=${GITHUB_BRANCH:-main}

read -sp "Enter GitHub Personal Access Token: " GITHUB_TOKEN
echo

read -p "Enter Beanstalk Application Name (default: branchworks-api): " APP_NAME
APP_NAME=${APP_NAME:-branchworks-api}

read -p "Enter Beanstalk Environment Name (default: branchworks-prod): " ENV_NAME
ENV_NAME=${ENV_NAME:-branchworks-prod}

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "\n${GREEN}✓ AWS Account ID: $AWS_ACCOUNT_ID${NC}"

# Step 1: Create Beanstalk Application (if not exists)
echo -e "\n${YELLOW}Step 1: Creating Beanstalk Application...${NC}"
if ! aws elasticbeanstalk describe-applications --application-names "$APP_NAME" --region "$AWS_REGION" 2>/dev/null | grep -q "$APP_NAME"; then
    aws elasticbeanstalk create-application \
        --application-name "$APP_NAME" \
        --description "Branch Works Coming Soon API" \
        --region "$AWS_REGION"
    echo -e "${GREEN}✓ Application created${NC}"
else
    echo -e "${GREEN}✓ Application already exists${NC}"
fi

# Step 2: Create Beanstalk Environment (if not exists)
echo -e "\n${YELLOW}Step 2: Creating Beanstalk Environment...${NC}"
if ! aws elasticbeanstalk describe-environments --application-name "$APP_NAME" --environment-names "$ENV_NAME" --region "$AWS_REGION" 2>/dev/null | grep -q "$ENV_NAME"; then
    echo "Creating Beanstalk environment. This may take 10-15 minutes..."
    aws elasticbeanstalk create-environment \
        --application-name "$APP_NAME" \
        --environment-name "$ENV_NAME" \
        --solution-stack-name "64bit Amazon Linux 2 v5.8.3 running Corretto 17" \
        --option-settings \
            Namespace=aws:autoscaling:launchconfiguration,OptionName=InstanceType,Value=t3.small \
            Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role \
            Namespace=aws:elasticbeanstalk:application:environment,OptionName=SERVER_PORT,Value=5000 \
            Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true \
            Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=RetentionInDays,Value=7 \
        --region "$AWS_REGION" \
        --tags Key=Project,Value=branchworks Key=Environment,Value=production

    echo -e "${YELLOW}Waiting for environment to be ready...${NC}"
    aws elasticbeanstalk wait environment-exists \
        --application-name "$APP_NAME" \
        --environment-names "$ENV_NAME" \
        --region "$AWS_REGION"
    echo -e "${GREEN}✓ Environment created${NC}"
else
    echo -e "${GREEN}✓ Environment already exists${NC}"
fi

# Step 3: Create IAM Role for EC2 instances
echo -e "\n${YELLOW}Step 3: Setting up IAM Roles...${NC}"
if ! aws iam get-role --role-name aws-elasticbeanstalk-ec2-role 2>/dev/null | grep -q "aws-elasticbeanstalk-ec2-role"; then
    aws iam create-role \
        --role-name aws-elasticbeanstalk-ec2-role \
        --assume-role-policy-document '{
            "Version": "2012-10-17",
            "Statement": [{
                "Effect": "Allow",
                "Principal": {"Service": "ec2.amazonaws.com"},
                "Action": "sts:AssumeRole"
            }]
        }'

    aws iam attach-role-policy \
        --role-name aws-elasticbeanstalk-ec2-role \
        --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier

    echo -e "${GREEN}✓ IAM Role created${NC}"
else
    echo -e "${GREEN}✓ IAM Role already exists${NC}"
fi

# Step 4: Create S3 bucket for artifacts
echo -e "\n${YELLOW}Step 4: Creating S3 Bucket for Artifacts...${NC}"
ARTIFACT_BUCKET="branchworks-pipeline-artifacts-${AWS_ACCOUNT_ID}"

if aws s3 ls "s3://$ARTIFACT_BUCKET" 2>/dev/null; then
    echo -e "${GREEN}✓ S3 Bucket already exists${NC}"
else
    aws s3 mb "s3://$ARTIFACT_BUCKET" --region "$AWS_REGION"
    aws s3api put-versioning --bucket "$ARTIFACT_BUCKET" --versioning-configuration Status=Enabled
    echo -e "${GREEN}✓ S3 Bucket created${NC}"
fi

# Step 5: Deploy CodePipeline using CloudFormation
echo -e "\n${YELLOW}Step 5: Deploying CodePipeline...${NC}"
aws cloudformation deploy \
    --template-file codepipeline-template.yaml \
    --stack-name branchworks-codepipeline \
    --parameter-overrides \
        GitHubOwner="$GITHUB_OWNER" \
        GitHubRepo="$GITHUB_REPO" \
        GitHubBranch="$GITHUB_BRANCH" \
        GitHubToken="$GITHUB_TOKEN" \
    --capabilities CAPABILITY_NAMED_IAM \
    --region "$AWS_REGION"

echo -e "${GREEN}✓ CodePipeline deployed${NC}"

# Step 6: Configure environment variables
echo -e "\n${YELLOW}Step 6: Configuring Environment Variables...${NC}"
echo "Enter your email configuration:"
read -p "Mail Username (Gmail): " MAIL_USERNAME
read -sp "Mail Password (Gmail App Password): " MAIL_PASSWORD
echo
read -p "Company Email: " COMPANY_EMAIL
read -p "CORS Origins (Frontend URL): " CORS_ORIGINS

aws elasticbeanstalk update-environment \
    --application-name "$APP_NAME" \
    --environment-name "$ENV_NAME" \
    --option-settings \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_USERNAME,Value="$MAIL_USERNAME" \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_PASSWORD,Value="$MAIL_PASSWORD" \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=COMPANY_EMAIL,Value="$COMPANY_EMAIL" \
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=CORS_ORIGINS,Value="$CORS_ORIGINS" \
    --region "$AWS_REGION"

echo -e "${GREEN}✓ Environment variables configured${NC}"

# Step 7: Output summary
echo -e "\n${GREEN}========================================"
echo "✓ Setup Complete!"
echo "========================================${NC}\n"

echo "Pipeline Details:"
echo "  Application: $APP_NAME"
echo "  Environment: $ENV_NAME"
echo "  Region: $AWS_REGION"
echo "  GitHub: $GITHUB_OWNER/$GITHUB_REPO (branch: $GITHUB_BRANCH)"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Push code to GitHub ($GITHUB_BRANCH branch)"
echo "2. CodePipeline will automatically trigger"
echo "3. Monitor deployment at: https://console.aws.amazon.com/elasticbeanstalk/"
echo "4. View logs: aws elasticbeanstalk request-environment-info --environment-name $ENV_NAME --info-type logs"

echo -e "\n${YELLOW}Important:${NC}"
echo "• The exposed AWS credentials have been deactivated"
echo "• Review AWS_CREDENTIALS_ROTATION.md for security best practices"
echo "• Never commit credentials to Git"
echo "• Use Beanstalk environment variables or AWS Secrets Manager"

echo -e "\n${GREEN}Happy deploying! 🚀${NC}\n"

