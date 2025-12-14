@echo off
REM Batch script to create .env file
REM Run with: setup-env.bat

echo.
echo 📝 TaskFlow Backend - Environment Setup
echo.

REM Check if .env already exists
if exist .env (
    set /p overwrite=".env file already exists. Overwrite? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo.
        echo ❌ Cancelled. Existing .env file preserved.
        echo.
        exit /b
    )
)

echo Please provide your MongoDB connection details:
echo 1. For local MongoDB: mongodb://localhost:27017/taskflow
echo 2. For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskflow
echo.

set /p mongoURI="MongoDB URI: "
if "%mongoURI%"=="" (
    set mongoURI=mongodb://localhost:27017/taskflow
    echo Using default: %mongoURI%
)

set /p jwtSecret="JWT Secret (press Enter for default): "
if "%jwtSecret%"=="" (
    set jwtSecret=your_super_secret_jwt_key_change_this_in_production
    echo Using default JWT secret
)

REM Create .env file
(
echo PORT=5000
echo MONGODB_URI=%mongoURI%
echo JWT_SECRET=%jwtSecret%
echo NODE_ENV=development
) > .env

echo.
echo ✅ .env file created successfully!
echo.
echo ⚠️  Remember to:
echo    • Keep your .env file secure (never commit it to git)
echo    • Change JWT_SECRET to a strong random string in production
echo    • Verify MongoDB is running before starting the server
echo.

pause

