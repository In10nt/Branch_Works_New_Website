@echo off
echo ========================================
echo BranchWorks Deployment Verification
echo ========================================
echo.

echo Checking deployment readiness...
echo.

REM Check if admin panel is integrated
echo [1/5] Checking admin panel integration...
if exist "public\admin\index.html" (
    echo    ✓ Admin panel found in public/admin/
) else (
    echo    ✗ Admin panel NOT found in public/admin/
    echo    Run: Copy-Item -Path "blog-admin\*" -Destination "public\admin" -Recurse
)
echo.

REM Check if _redirects file exists
echo [2/5] Checking _redirects file...
if exist "public\_redirects" (
    echo    ✓ _redirects file found
) else (
    echo    ✗ _redirects file NOT found
)
echo.

REM Check if node_modules exists
echo [3/5] Checking dependencies...
if exist "node_modules" (
    echo    ✓ Node modules installed
) else (
    echo    ✗ Node modules NOT installed
    echo    Run: npm install
)
echo.

REM Check if backend is built
echo [4/5] Checking backend build...
if exist "backend\target\*.jar" (
    echo    ✓ Backend JAR file found
) else (
    echo    ✗ Backend JAR NOT found
    echo    Run: cd backend && mvn clean package
)
echo.

REM Check package.json
echo [5/5] Checking package.json...
if exist "package.json" (
    echo    ✓ package.json found
) else (
    echo    ✗ package.json NOT found
)
echo.

echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Build frontend: npm run build
echo 2. Test locally: npx serve -s build
echo 3. Deploy to your hosting platform
echo 4. See READY_FOR_DEPLOYMENT.md for details
echo.
pause
