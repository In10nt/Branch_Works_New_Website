# Final Working Deployment Script
# This script deploys your application to AWS Elastic Beanstalk
# 
# IMPORTANT: This requires EB CLI to be installed
# Install: pip install awsebcli --upgrade --user

$region = "eu-north-1"
$envName = "Branchworks-coming-soon-env"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AWS Beanstalk Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if EB CLI is installed
Write-Host "`nChecking for EB CLI..." -ForegroundColor Yellow
$ebInstalled = Get-Command eb -ErrorAction SilentlyContinue

if (-not $ebInstalled) {
    Write-Host "EB CLI not found!" -ForegroundColor Red
    Write-Host "`nPlease install EB CLI first:" -ForegroundColor Yellow
    Write-Host "  pip install awsebcli --upgrade --user" -ForegroundColor Gray
    Write-Host "`nOr use 7-Zip method (see DEPLOYMENT_GUIDE.md)" -ForegroundColor Gray
    exit 1
}

Write-Host "EB CLI found: $(eb --version)" -ForegroundColor Green

# Build application
Write-Host "`nBuilding React frontend..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { exit 1 }

npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`nBuilding Spring Boot backend..." -ForegroundColor Yellow
cd backend
mvn clean package -DskipTests
if ($LASTEXITCODE -ne 0) { exit 1 }
cd ..

Write-Host "Build complete!" -ForegroundColor Green

# Deploy using EB CLI
Write-Host "`nDeploying to Elastic Beanstalk..." -ForegroundColor Yellow
Write-Host "Environment: $envName" -ForegroundColor Gray
Write-Host "Region: $region" -ForegroundColor Gray

eb deploy $envName --region $region

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    
    Write-Host "`nYour application is being deployed..." -ForegroundColor Cyan
    Write-Host "Check status: eb health" -ForegroundColor Gray
    Write-Host "View logs: eb logs" -ForegroundColor Gray
    Write-Host "Open app: eb open" -ForegroundColor Gray
    
    Write-Host "`nApplication URL:" -ForegroundColor Cyan
    Write-Host "http://Branchworks-coming-soon-env.eba-h4dbjcip.eu-north-1.elasticbeanstalk.com" -ForegroundColor Green
} else {
    Write-Host "`nDeployment failed!" -ForegroundColor Red
    Write-Host "Check logs: eb logs" -ForegroundColor Yellow
    Write-Host "Check events: eb events" -ForegroundColor Yellow
}
