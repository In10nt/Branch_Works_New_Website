@echo off
echo Starting BranchWorks Application...
echo.

REM Start Backend (Spring Boot)
echo [1/3] Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd backend && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start Admin Panel (Python HTTP Server)
echo [2/3] Starting Admin Panel (Port 8080)...
start "Admin Panel" cmd /k "cd blog-admin && python -m http.server 8080"
timeout /t 2 /nobreak >nul

REM Start React Website
echo [3/3] Starting React Website (Port 3000)...
start "React Website" cmd /k "npm start"

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo Backend API:     http://localhost:5000
echo Admin Panel:     http://localhost:8080
echo React Website:   http://localhost:3000
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
