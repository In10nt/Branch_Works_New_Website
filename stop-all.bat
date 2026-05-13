@echo off
echo Stopping all BranchWorks services...
echo.

REM Kill Java processes (Spring Boot Backend)
echo Stopping Backend Server...
taskkill /F /FI "WINDOWTITLE eq Backend Server*" >nul 2>&1

REM Kill Python processes (Admin Panel)
echo Stopping Admin Panel...
taskkill /F /FI "WINDOWTITLE eq Admin Panel*" >nul 2>&1

REM Kill Node processes (React Website)
echo Stopping React Website...
taskkill /F /FI "WINDOWTITLE eq React Website*" >nul 2>&1

echo.
echo All services stopped!
echo.
pause
