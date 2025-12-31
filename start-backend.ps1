# Nivesh Returns - Backend Server Startup Script

Write-Host "Starting Nivesh Returns Backend Server..." -ForegroundColor Green
Write-Host "Location: server/" -ForegroundColor Cyan

Set-Location -Path $PSScriptRoot\server

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found in server directory!" -ForegroundColor Red
    Write-Host "Please create server/.env with required variables" -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting Node.js server..." -ForegroundColor Yellow
npm start
