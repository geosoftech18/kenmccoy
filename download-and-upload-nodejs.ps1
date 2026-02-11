# PowerShell script to download and upload Node.js to server
# Run this on your Windows machine

Write-Host "========================================" -ForegroundColor Green
Write-Host "Node.js Download & Upload Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$nodeVersion = "v20.11.0"
$nodeFile = "node-$nodeVersion-linux-x64.tar.xz"
$nodeUrl = "https://nodejs.org/dist/$nodeVersion/$nodeFile"
$localPath = "C:\Users\hp\Desktop\tsx\kenmccoy\$nodeFile"
$serverIP = "192.168.2.21"
$serverUser = "web"
$serverPath = "/tmp/$nodeFile"

# Step 1: Download Node.js
Write-Host "Step 1: Downloading Node.js..." -ForegroundColor Yellow
Write-Host "URL: $nodeUrl" -ForegroundColor Cyan

try {
    Invoke-WebRequest -Uri $nodeUrl -OutFile $localPath -UseBasicParsing
    Write-Host "✅ Downloaded: $localPath" -ForegroundColor Green
    
    # Check file size
    $fileSize = (Get-Item $localPath).Length / 1MB
    Write-Host "File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Download failed: $_" -ForegroundColor Red
    Write-Host "Please download manually from: $nodeUrl" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 2: Uploading to server..." -ForegroundColor Yellow
Write-Host "Server: $serverUser@$serverIP" -ForegroundColor Cyan
Write-Host "You will be prompted for password: Web@2025" -ForegroundColor Yellow
Write-Host ""

# Step 2: Upload to server
try {
    scp $localPath "${serverUser}@${serverIP}:${serverPath}"
    Write-Host ""
    Write-Host "✅ Upload complete!" -ForegroundColor Green
} catch {
    Write-Host "❌ Upload failed: $_" -ForegroundColor Red
    Write-Host "Please try manually:" -ForegroundColor Yellow
    Write-Host "scp `"$localPath`" ${serverUser}@${serverIP}:${serverPath}" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Success! Node.js uploaded to server" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps - Run these on your SSH session:" -ForegroundColor Yellow
Write-Host ""
Write-Host "cd /tmp" -ForegroundColor Cyan
Write-Host "tar -xf $nodeFile" -ForegroundColor Cyan
Write-Host "sudo cp -r node-$nodeVersion-linux-x64/* /usr/local/" -ForegroundColor Cyan
Write-Host "sudo ln -sf /usr/local/bin/node /usr/bin/node" -ForegroundColor Cyan
Write-Host "sudo ln -sf /usr/local/bin/npm /usr/bin/npm" -ForegroundColor Cyan
Write-Host "node --version" -ForegroundColor Cyan
Write-Host "npm --version" -ForegroundColor Cyan
Write-Host "npm install -g pm2" -ForegroundColor Cyan
Write-Host ""













