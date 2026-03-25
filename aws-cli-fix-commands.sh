#!/bin/bash
# AWS CLI Commands to Fix Beanstalk Deployment Issues
# Run these commands in your terminal with AWS CLI installed

echo "=================================================="
echo "AWS Beanstalk Deployment - CLI Fix Commands"
echo "=================================================="
echo ""

# STEP 1: Rotate and Deactivate Exposed Credentials
echo "STEP 1: Deactivate Exposed AWS Credentials"
echo "=================================================="
echo "The following access key needs to be deactivated immediately:"
echo "Access Key ID: AKIAZY6IB3UP2BLYYMHS"
echo ""
echo "Run this command to deactivate the key:"
aws iam list-access-keys --query 'AccessKeyMetadata[?AccessKeyId==`AKIAZY6IB3UP2BLYYMHS`]'
echo ""
echo "Then deactivate it with:"
echo "aws iam update-access-key --access-key-id AKIAZY6IB3UP2BLYYMHS --status Inactive"
echo ""

# STEP 2: Create new IAM user for CodePipeline
echo "STEP 2: Create New IAM User for CodePipeline"
echo "=================================================="
echo "Create a new IAM user:"
echo "aws iam create-user --user-name codepipeline-deployer"
echo ""
echo "Create access keys:"
echo "aws iam create-access-key --user-name codepipeline-deployer"
echo ""
echo "Attach CodePipeline policy:"
echo "aws iam attach-user-policy --user-name codepipeline-deployer --policy-arn arn:aws:iam::aws:policy/AdministratorAccess"
echo ""

# STEP 3: Check if Beanstalk application exists
echo "STEP 3: Check Beanstalk Application Status"
echo "=================================================="
echo "List all Beanstalk applications:"
aws elasticbeanstalk describe-applications 2>/dev/null || echo "Command: aws elasticbeanstalk describe-applications"
echo ""

# STEP 4: Create Beanstalk Application if it doesn't exist
echo "STEP 4: Create Beanstalk Application"
echo "=================================================="
echo "Create application (if needed):"
echo "aws elasticbeanstalk create-application --application-name branchworks-api --description 'Branch Works Coming Soon API'"
echo ""

# STEP 5: Create Beanstalk Environment
echo "STEP 5: Create Beanstalk Environment"
echo "=================================================="
echo "Create environment with Java 17 Corretto:"
cat << 'EOF'
aws elasticbeanstalk create-environment \
  --application-name branchworks-api \
  --environment-name branchworks-prod \
  --solution-stack-name "64bit Amazon Linux 2 v5.8.3 running Corretto 17" \
  --option-settings \
    Namespace=aws:autoscaling:launchconfiguration,OptionName=InstanceType,Value=t3.small \
    Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=SERVER_PORT,Value=5000 \
    Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true \
    Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=RetentionInDays,Value=7 \
  --tags Key=Project,Value=branchworks Key=Environment,Value=production
EOF
echo ""

# STEP 6: Create S3 bucket for artifacts
echo "STEP 6: Create S3 Artifact Bucket"
echo "=================================================="
echo "Get AWS Account ID:"
echo "aws sts get-caller-identity --query Account --output text"
echo ""
echo "Create S3 bucket (replace ACCOUNT_ID):"
echo "aws s3 mb s3://branchworks-pipeline-artifacts-ACCOUNT_ID"
echo ""
echo "Enable versioning:"
echo "aws s3api put-versioning --bucket branchworks-pipeline-artifacts-ACCOUNT_ID --versioning-configuration Status=Enabled"
echo ""

# STEP 7: Create IAM roles for CodePipeline
echo "STEP 7: Create IAM Roles for CodePipeline"
echo "=================================================="
echo "Create CodePipeline service role:"
cat << 'EOF'
aws iam create-role \
  --role-name CodePipeline-Beanstalk-Role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "codepipeline.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'
EOF
echo ""

echo "Attach policy to role:"
cat << 'EOF'
aws iam put-role-policy \
  --role-name CodePipeline-Beanstalk-Role \
  --policy-name CodePipelinePolicy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "s3:*",
          "elasticbeanstalk:*",
          "codebuild:*",
          "cloudformation:*",
          "iam:PassRole"
        ],
        "Resource": "*"
      }
    ]
  }'
EOF
echo ""

# STEP 8: Create CodeBuild role
echo "STEP 8: Create CodeBuild Role"
echo "=================================================="
echo "Create CodeBuild service role:"
cat << 'EOF'
aws iam create-role \
  --role-name CodeBuild-Beanstalk-Role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "codebuild.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'
EOF
echo ""

echo "Attach policy:"
cat << 'EOF'
aws iam put-role-policy \
  --role-name CodeBuild-Beanstalk-Role \
  --policy-name CodeBuildPolicy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "s3:GetObject",
          "s3:PutObject"
        ],
        "Resource": "*"
      }
    ]
  }'
EOF
echo ""

# STEP 9: Create CodePipeline
echo "STEP 9: Deploy CodePipeline Infrastructure"
echo "=================================================="
echo "Deploy CloudFormation stack:"
cat << 'EOF'
aws cloudformation deploy \
  --template-file codepipeline-template.yaml \
  --stack-name branchworks-codepipeline \
  --parameter-overrides \
    GitHubOwner=your-github-username \
    GitHubRepo=Branch Works_New_Website \
    GitHubBranch=main \
    GitHubToken=your-github-token \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
EOF
echo ""

# STEP 10: Configure Environment Variables in Beanstalk
echo "STEP 10: Configure Beanstalk Environment Variables"
echo "=================================================="
echo "Update environment with email configuration:"
cat << 'EOF'
aws elasticbeanstalk update-environment \
  --application-name branchworks-api \
  --environment-name branchworks-prod \
  --option-settings \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_USERNAME,Value=your-email@gmail.com \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=MAIL_PASSWORD,Value=your-app-password \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=COMPANY_EMAIL,Value=company@email.com \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=CORS_ORIGINS,Value=https://your-frontend.netlify.app
EOF
echo ""

# STEP 11: Check Beanstalk Health
echo "STEP 11: Check Beanstalk Environment Health"
echo "=================================================="
echo "Check environment status:"
echo "aws elasticbeanstalk describe-environment-health --environment-name branchworks-prod --attribute-keys All"
echo ""

# STEP 12: Check CodePipeline Status
echo "STEP 12: Check CodePipeline Status"
echo "=================================================="
echo "Check pipeline status:"
echo "aws codepipeline get-pipeline-state --name branchworks-deployment-pipeline"
echo ""

# STEP 13: View Logs
echo "STEP 13: View Deployment Logs"
echo "=================================================="
echo "View CodeBuild logs:"
echo "aws logs tail /aws/codebuild/branchworks-build --follow"
echo ""
echo "View Beanstalk events:"
echo "aws elasticbeanstalk describe-events --environment-name branchworks-prod --max-records 20"
echo ""

echo "=================================================="
echo "Setup Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Install AWS CLI if not already installed: https://aws.amazon.com/cli/"
echo "2. Configure AWS credentials: aws configure"
echo "3. Run the commands above in order"
echo "4. Replace placeholders (GitHub username, email, etc.)"
echo "5. Push code to GitHub to trigger the pipeline"
echo ""

