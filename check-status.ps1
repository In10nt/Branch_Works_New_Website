# Quick status check script
$region = "eu-north-1"
$envName = "Branchworks-coming-soon-env"

Write-Host "Checking environment status..." -ForegroundColor Cyan

# Environment status
$env = aws elasticbeanstalk describe-environments `
    --environment-names $envName `
    --region $region `
    --output json | ConvertFrom-Json

Write-Host "`nEnvironment: $($env.Environments[0].EnvironmentName)" -ForegroundColor Yellow
Write-Host "Status: $($env.Environments[0].Status)" -ForegroundColor $(if ($env.Environments[0].Status -eq "Ready") { "Green" } else { "Yellow" })
Write-Host "Health: $($env.Environments[0].Health)" -ForegroundColor $(if ($env.Environments[0].Health -eq "Green") { "Green" } elseif ($env.Environments[0].Health -eq "Yellow") { "Yellow" } else { "Red" })
Write-Host "URL: http://$($env.Environments[0].CNAME)" -ForegroundColor Cyan

# Recent events
Write-Host "`nRecent Events:" -ForegroundColor Cyan
aws elasticbeanstalk describe-events `
    --environment-name $envName `
    --region $region `
    --max-records 5 `
    --query "Events[*].[EventDate,Severity,Message]" `
    --output table

# Pipeline status
Write-Host "`nPipeline Status:" -ForegroundColor Cyan
aws codepipeline get-pipeline-state `
    --name branchworks-pipeline `
    --region $region `
    --query "stageStates[*].[stageName,latestExecution.status]" `
    --output table
