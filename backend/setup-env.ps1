# PowerShell script to create .env file
# Run with: .\setup-env.ps1

Write-Host ""
Write-Host "TaskFlow Backend - Environment Setup" -ForegroundColor Cyan
Write-Host ""

# Check if .env already exists
if (Test-Path ".env") {
    $overwrite = Read-Host ".env file already exists. Overwrite? (y/n)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host ""
        Write-Host "Cancelled. Existing .env file preserved." -ForegroundColor Yellow
        Write-Host ""
        exit
    }
}

Write-Host "Please provide your MongoDB connection details:" -ForegroundColor Yellow
Write-Host "1. For local MongoDB: mongodb://localhost:27017/taskflow"
Write-Host "2. For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskflow"
Write-Host ""

$mongoURI = Read-Host "MongoDB URI"
if ([string]::IsNullOrWhiteSpace($mongoURI)) {
    $mongoURI = "mongodb://localhost:27017/taskflow"
    Write-Host "Using default: $mongoURI" -ForegroundColor Gray
}

$jwtSecret = Read-Host "JWT Secret (press Enter for auto-generated)"
if ([string]::IsNullOrWhiteSpace($jwtSecret)) {
    $jwtSecret = "your_super_secret_jwt_key_change_this_in_production_" + [DateTimeOffset]::Now.ToUnixTimeSeconds()
    Write-Host "Generated random JWT secret" -ForegroundColor Gray
}

# Create .env content
$envContent = @"
PORT=5000
MONGODB_URI=$mongoURI
JWT_SECRET=$jwtSecret
NODE_ENV=development
"@

# Write .env file
Set-Content -Path ".env" -Value $envContent -Encoding UTF8

Write-Host ""
Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "- Keep your .env file secure (never commit it to git)"
Write-Host "- Change JWT_SECRET to a strong random string in production"
Write-Host "- Verify MongoDB is running before starting the server"
Write-Host ""
