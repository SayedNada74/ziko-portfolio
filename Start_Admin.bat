@echo off
echo ==============================================
echo Ziko Portfolio - Local Admin Panel 
echo ==============================================
echo.
echo Starting server...
echo.

:: Check if node_modules exists, if not run npm install
IF NOT EXIST "node_modules\" (
    echo Installing dependencies for the first time...
    call npm install
)

:: Open the browser
start http://localhost:3000/admin

:: Start the node server
node admin-server.js

pause
