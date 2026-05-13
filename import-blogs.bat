@echo off
echo Importing current blogs into database...
echo.
echo Please make sure the backend is running!
echo.
echo You can import the blogs by:
echo 1. Access H2 Console: http://localhost:5000/h2-console
echo 2. Login with:
echo    JDBC URL: jdbc:h2:file:./data/branchworks_db
echo    User: sa
echo    Password: (leave empty)
echo 3. Copy and paste the content from database/import-current-blogs.sql
echo 4. Click "Run"
echo.
pause
