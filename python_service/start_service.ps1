# CropShield-AI Python TensorFlow Microservice Launcher
Write-Host "====================================================" -ForegroundColor Green
Write-Host "Starting CropShield AI TensorFlow Microservice (Port 8000)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Green

Set-Location -Path $PSScriptRoot
python main.py
