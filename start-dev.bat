@echo off
echo ========================================
echo Starting BranchWorks Development Environment
echo ========================================
echo.
echo This will start:
echo 1. Backend (Spring Boot) on port 5000
echo 2. Frontend (React) on port 3000
echo.
echo Press Ctrl+C in each window to stop
echo ========================================
echo.

echo Starting Backend...
start "Backend - Spring Boot" cmd /k "cd backend && mvn spring-boot:run"

echo Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak

echo Starting Frontend...
start "Frontend - React" cmd /k "npm start"

echo.
echo ========================================
echo Development servers starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:3000/admin
echo.
echo Login credentials:
echo Username: admin
echo Password: admin123
echo.
echo ========================================
