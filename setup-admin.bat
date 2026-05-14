@echo off
echo ========================================
echo BranchWorks Admin Panel Setup
echo ========================================
echo.

echo Step 1: Installing admin panel dependencies...
cd backend\admin-panel
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building admin panel...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build admin panel
    pause
    exit /b 1
)

echo.
echo Step 3: Copying to backend static folder...
if not exist "..\src\main\resources\static\admin" mkdir "..\src\main\resources\static\admin"
xcopy /E /I /Y build\* "..\src\main\resources\static\admin\"
if errorlevel 1 (
    echo ERROR: Failed to copy files
    pause
    exit /b 1
)

cd ..\..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The admin panel is now integrated with the backend.
echo.
echo To access it:
echo 1. Start the backend: cd backend ^&^& mvn spring-boot:run
echo 2. Open: http://localhost:5000/admin/
echo.
echo Or use start-all.bat to start everything
echo.
pause
