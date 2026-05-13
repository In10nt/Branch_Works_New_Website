@echo off
echo ========================================
echo BranchWorks AWS Deployment Script
echo ========================================
echo.

echo Step 1: Building Backend...
cd backend
call mvn clean package
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Maven build failed!
    pause
    exit /b 1
)
echo Backend built successfully!
echo.

echo Step 2: Deploying to Elastic Beanstalk...
echo Make sure you have run 'eb init' and 'eb create' first!
echo.
choice /C YN /M "Have you created the EB environment"
if %ERRORLEVEL% EQU 2 (
    echo.
    echo Please run these commands first:
    echo   cd backend
    echo   eb init
    echo   eb create branchworks-prod
    echo   eb setenv [environment variables]
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo Deploying...
call eb deploy
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Backend deployed to Elastic Beanstalk
echo.
echo Next steps:
echo 1. Get your backend URL: eb status
echo 2. Update frontend API URLs in:
echo    - public/admin/js/config.js
echo    - src/components/*.jsx files
echo 3. Push to GitHub (Amplify will auto-deploy frontend)
echo.
echo View logs: eb logs
echo Open app: eb open
echo.
pause
