@echo off
echo ========================================
echo BranchWorks - Upload to EC2
echo ========================================
echo.

REM You need to set these variables
set EC2_IP=YOUR_EC2_IP_HERE
set KEY_FILE=path\to\your-key.pem

echo Building JAR file...
call mvn clean package -DskipTests

if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Uploading JAR to EC2...
scp -i "%KEY_FILE%" target\coming-soon-backend-0.0.1-SNAPSHOT.jar ubuntu@%EC2_IP%:~/branchworks/

if errorlevel 1 (
    echo ERROR: Upload failed!
    echo.
    echo Make sure:
    echo 1. EC2_IP is correct
    echo 2. KEY_FILE path is correct
    echo 3. EC2 instance is running
    pause
    exit /b 1
)

echo.
echo ========================================
echo Upload Complete!
echo ========================================
echo.
echo Next: Connect to EC2 and run the app
echo Command: ssh -i "%KEY_FILE%" ubuntu@%EC2_IP%
echo.
pause
