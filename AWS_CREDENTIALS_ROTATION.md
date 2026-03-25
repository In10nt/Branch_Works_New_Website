# 🚨 URGENT: AWS Credentials Exposed - Rotation Guide

## Immediate Actions Required

### Step 1: Check if Credentials Were Used

The following credentials were exposed in your Git repository:
- **Access Key ID**: `[REDACTED - Already rotated]`
- **Secret Access Key**: `[REDACTED - Already rotated]`

Check your AWS CloudTrail for any unauthorized activity.

### Step 2: Deactivate Exposed Credentials

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Navigate to Users → Select the user associated with the exposed key
3. Go to Security Credentials
4. **Deactivate** the exposed access key (mark for deletion after 30 days)
5. Do NOT delete immediately - you may need to investigate usage

### Step 3: Create New IAM User for CodePipeline

**Recommended approach:**

1. **Create IAM User:**
   - Name: `codepipeline-deployer`
   - Access type: Programmatic access only
   - **DO NOT give Console access**

2. **Attach Policies:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "codepipeline:*",
           "codebuild:*",
           "elasticbeanstalk:*",
           "s3:*",
           "iam:PassRole",
           "cloudformation:*",
           "ec2:*",
           "logs:*"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

3. **Save Access Credentials:**
   - Store in AWS Secrets Manager (NOT in git)
   - Use in CodePipeline service role

### Step 4: Configure CodePipeline Service Role

Instead of storing credentials, use IAM roles:

1. Create role: `CodePipeline-Beanstalk-Role`
2. Trust policy allows CodePipeline service
3. Attach policies for CodeBuild, S3, Beanstalk
4. Use this role in CodePipeline configuration

### Step 5: Update buildspec.yml

Remove any hardcoded credentials. Use environment variables instead:

```yaml
# ❌ NEVER DO THIS
build:
  commands:
    - export AWS_ACCESS_KEY_ID=$EXPOSED_KEY
    - export AWS_SECRET_ACCESS_KEY=$EXPOSED_SECRET

# ✅ DO THIS INSTEAD
build:
  commands:
    - echo "Build process"
    - mvn clean package
```

### Step 6: Check Git History

Your credentials might still be in Git history. Clean them:

```bash
# Using git-filter-branch (one-time cleanup)
git filter-branch --tree-filter 'rm -f aws_secret.txt' HEAD

# Or use BFG Repo-Cleaner (recommended)
# https://rtyley.github.io/bfg-repo-cleaner/

# After cleanup, force push
git push origin --force-with-lease
```

**⚠️ WARNING**: Force pushing requires all team members to re-clone the repository.

### Step 7: Implement Secret Management

**Option 1: AWS Secrets Manager (Recommended)**
```bash
# Store secrets in AWS Secrets Manager
aws secretsmanager create-secret --name branchworks/mail-password \
  --secret-string "your-app-password"

# Retrieve in application
@Value("${branchworks.mail.password}")
private String mailPassword;
```

**Option 2: Environment Variables**
```bash
# Store in Beanstalk console or CodeBuild environment variables
# Retrieved via ${VARIABLE_NAME} in buildspec.yml
# Retrieved via @Value("${VARIABLE_NAME}") in Spring

export MAIL_PASSWORD="your-app-password"
```

**Option 3: Parameter Store**
```bash
# Store in Systems Manager Parameter Store
aws ssm put-parameter --name /branchworks/mail-password \
  --value "your-app-password" --type SecureString

# Retrieve in Spring Boot via spring-cloud-aws
@Value("${/branchworks/mail-password}")
private String mailPassword;
```

### Step 8: Verify Git Configuration

Prevent accidental credential commits:

```bash
# 1. Create .gitignore entries
cat >> .gitignore << 'EOF'
# AWS Credentials
aws_secret.txt
credentials
.env
.env.local
*.key
*.pem

# Never commit keys
**/*-secret*
**/*-password*
**/*-api-key*
EOF

# 2. Configure git to warn about large files
git config core.hooksPath .githooks

# 3. Create pre-commit hook
cat > .githooks/pre-commit << 'EOF'
#!/bin/bash
# Prevent committing files with sensitive keywords
if git diff --cached | grep -iE "(password|secret|key|token|credential)" > /dev/null; then
  echo "ERROR: Potential secrets detected in commit!"
  exit 1
fi
EOF

chmod +x .githooks/pre-commit
```

### Step 9: Update buildspec.yml

Ensure buildspec.yml doesn't contain credentials:

```yaml
# ✅ CORRECT: Use CodeBuild environment variables
env:
  variables:
    MAIL_USERNAME: ${MAIL_USERNAME}
    MAIL_PASSWORD: ${MAIL_PASSWORD}
  parameter-store:
    DB_PASSWORD: /branchworks/db-password
    MAIL_PASSWORD: /branchworks/mail-password

build:
  commands:
    - echo "Using environment variables instead of hardcoded values"
    - mvn clean package -DskipTests
```

### Step 10: Documentation

After completing all steps:

1. ✅ Delete or deactivate exposed credentials
2. ✅ Create new IAM user for CodePipeline
3. ✅ Remove credentials from Git history
4. ✅ Update all environment variables
5. ✅ Implement secret management
6. ✅ Configure git hooks
7. ✅ Test CodePipeline deployment
8. ✅ Monitor CloudTrail for suspicious activity

## Checklist

- [ ] AWS credentials deactivated
- [ ] New IAM user created
- [ ] Git history cleaned
- [ ] .gitignore updated
- [ ] Git hooks configured
- [ ] buildspec.yml updated
- [ ] Environment variables configured in CodeBuild
- [ ] Secrets Manager/Parameter Store configured
- [ ] CodePipeline re-tested
- [ ] Team notified of changes

## Additional Security Tips

1. **Rotate credentials every 90 days**
2. **Use MFA for AWS Console access**
3. **Enable CloudTrail logging**
4. **Review IAM permissions regularly**
5. **Use separate credentials per environment**
6. **Monitor for unusual API calls**
7. **Enable AWS Config for compliance**
8. **Review security groups and NACLs**

## References

- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)
- [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
- [Git Filter-Branch](https://git-scm.com/docs/git-filter-branch)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

