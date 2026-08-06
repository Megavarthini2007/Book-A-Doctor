# Book A Doctor - Frontend Launch Script

Write-Host "Navigating to client directory..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\client"

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting Book A Doctor Vite Frontend Server..." -ForegroundColor Green
npm run dev
