@echo off
echo ========================================
echo Starting Backend with AWS RDS Database
echo ========================================
echo.
echo This will connect your local backend to AWS RDS MySQL
echo Make sure you have:
echo   1. Created AWS RDS MySQL database
echo   2. Updated application-local-with-rds.properties with your RDS details
echo.
pause

cd backend
echo Starting Spring Boot application...
echo.
call mvn spring-boot:run -Dspring-boot.run.profiles=local-with-rds

pause
