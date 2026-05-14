@echo off
echo Building Admin Panel...
call npm run build

echo Copying build files to backend static folder...
if not exist "..\src\main\resources\static\admin" mkdir "..\src\main\resources\static\admin"
xcopy /E /I /Y build\* "..\src\main\resources\static\admin\"

echo Admin panel built and copied successfully!
echo Access it at: http://localhost:5000/admin/
pause
