@echo off
echo Starting BranchWorks Application...
echo.

REM Start Backend (Spring Boot) - This also serves the admin panel
echo [1/2] Starting Backend Server (Port 5000)...
echo Backend will serve:
echo - API at http://localhost:5000/api
echo - Admin Panel at http://localhost:5000/admin/
start "Backend Server" cmd /k "cd backend && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start React Website
echo [2/2] Starting React Website (Port 3000)...
start "React Website" cmd /k "npm start"

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo Backend API:     http://localhost:5000/api
echo Admin Panel:     http://localhost:5000/admin/
echo React Website:   http://localhost:3000
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
