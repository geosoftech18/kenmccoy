# PowerShell script to fix VPN configuration file
# This script helps edit the .ovpn file to use the correct server address

Write-Host "VPN Configuration File Fixer" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""

# Ask for the .ovpn file path
$ovpnPath = Read-Host "Enter the full path to your .ovpn file (or drag and drop the file here)"

# Remove quotes if user dragged and dropped
$ovpnPath = $ovpnPath -replace '"', ''

# Check if file exists
if (-not (Test-Path $ovpnPath)) {
    Write-Host "Error: File not found: $ovpnPath" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host "Reading configuration file..." -ForegroundColor Yellow

# Read the file
$content = Get-Content $ovpnPath

# Create backup
$backupPath = $ovpnPath + ".backup"
Copy-Item $ovpnPath $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Green

# Find and replace remote server addresses
$modified = $false
$newContent = @()

foreach ($line in $content) {
    # Check if line contains a remote server configuration
    if ($line -match '^remote\s+(\d+\.\d+\.\d+\.\d+)\s+(\d+)') {
        $oldServer = $matches[1]
        $port = $matches[2]
        
        if ($oldServer -ne "122.170.113.117") {
            Write-Host "Found remote server: $oldServer" -ForegroundColor Yellow
            Write-Host "Changing to: 122.170.113.117" -ForegroundColor Green
            $newLine = "remote 122.170.113.117 $port"
            $newContent += $newLine
            $modified = $true
        } else {
            $newContent += $line
        }
    } else {
        $newContent += $line
    }
}

# Write the modified content
if ($modified) {
    $newContent | Set-Content $ovpnPath
    Write-Host ""
    Write-Host "Configuration file updated successfully!" -ForegroundColor Green
    Write-Host "Original file backed up to: $backupPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Remove the old connection in Sophos Connect" -ForegroundColor White
    Write-Host "2. Re-import the updated .ovpn file" -ForegroundColor White
    Write-Host "3. Try connecting again" -ForegroundColor White
} else {
    Write-Host "No changes needed. Server address is already correct." -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")













