# Wait for environment to be ready, then deploy
$region = "eu-north-1"
$envName = "Branchworks-coming-soon-env"
$pipelineName = "branchworks-pipeline"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Waiting for Environment & Deploying" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Wait for environment to be ready
Write-Host "`nWaiting for environment to be Ready..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0

do {
    $attempt++
    $env = aws elasticbeanstalk describe-environments `
        --environment-names $envName `
        --region $region `
        --output json | ConvertFrom-Json
    
    $status = $env.Environments[0].Status
    $health = $env.Environments[0].Health
    
    Write-Host "[$attempt/$maxAttempts] Status: $status | Health: $health" -ForegroundColor Gray
    
    if ($status -eq "Ready") {
        Write-Host "`nEnvironment is Ready!" -ForegroundColor Green
        break
    }
    
    Start-Sleep -Seconds 20
} while ($attempt -lt $maxAttempts)

if ($status -ne "Ready") {
    Write-Host "`nEnvironment is still not ready after waiting. Current status: $status" -ForegroundColor Red
    Write-Host "Please check the AWS console for more details." -ForegroundColor Yellow
    exit 1
}

# Now configure port settings
Write-Host "`nConfiguring port 5000 and health checks..." -ForegroundColor Yellow

aws elasticbeanstalk update-environment `
    --environment-name $envName `
    --region $region `
    --option-settings `
        Namespace=aws:elasticbeanstalk:application:environment,OptionName=SERVER_PORT,Value=5000 `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=Port,Value=5000 `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=Protocol,Value=HTTP `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthCheckPath,Value=/health `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthCheckInterval,Value=15 `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthCheckTimeout,Value=5 `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthyThresholdCount,Value=2 `
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=UnhealthyThresholdCount,Value=3 | Out-Null

Write-Host "Port configuration updated" -ForegroundColor Green

# Wait again for this update
Write-Host "`nWaiting for port configuration to apply..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

$attempt = 0
do {
    $attempt++
    $status = aws elasticbeanstalk describe-environments `
        --environment-names $envName `
        --region $region `
        --query "Environments[0].Status" `
        --output text
    
    Write-Host "[$attempt/20] Status: $status" -ForegroundColor Gray
    
    if ($status -eq "Ready") {
        break
    }
    
    Start-Sleep -Seconds 15
} while ($attempt -lt 20)

# Commit and push changes
Write-Host "`nCommitting configuration changes..." -ForegroundColor Yellow

git add .ebextensions/environment.config buildspec.yml
git add -u  # Add deleted files
git commit -m "Fix: Consolidated Beanstalk configuration for port 5000 and t3.small instance"

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host "Changes pushed successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to push changes. Please check git status." -ForegroundColor Red
    exit 1
}

# Wait a moment for GitHub to process
Start-Sleep -Seconds 5

# Trigger pipeline
Write-Host "`nTriggering CodePipeline..." -ForegroundColor Yellow

$execId = aws codepipeline start-pipeline-execution `
    --name $pipelineName `
    --region $region `
    --query "pipelineExecutionId" `
    --output text

if ($LASTEXITCODE -eq 0) {
    Write-Host "Pipeline triggered! Execution ID: $execId" -ForegroundColor Green
} else {
    Write-Host "Failed to trigger pipeline." -ForegroundColor Red
    Write-Host "You may need to check the CodeStar connection or trigger manually from AWS Console." -ForegroundColor Yellow
}

# Monitor for a bit
Write-Host "`nMonitoring pipeline (60 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 60

Write-Host "`nPipeline Status:" -ForegroundColor Cyan
aws codepipeline get-pipeline-state `
    --name $pipelineName `
    --region $region `
    --query "stageStates[*].[stageName,latestExecution.status]" `
    --output table

Write-Host "`nEnvironment Status:" -ForegroundColor Cyan
aws elasticbeanstalk describe-environments `
    --environment-names $envName `
    --region $region `
    --query "Environments[0].[EnvironmentName,Status,Health,CNAME]" `
    --output table

$url = aws elasticbeanstalk describe-environments `
    --environment-names $envName `
    --region $region `
    --query "Environments[0].CNAME" `
    --output text

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Deployment Initiated!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Your application URL: http://$url" -ForegroundColor Green
Write-Host "Health check: http://$url/health" -ForegroundColor Green
Write-Host "`nThe deployment will take 10-15 minutes to complete." -ForegroundColor Yellow
Write-Host "Run './check-status.ps1' to monitor progress." -ForegroundColor Gray
