#!/bin/bash
# Run this script on the server after uploading Node.js

set -e

NODE_VERSION="v20.11.0"
NODE_FILE="node-${NODE_VERSION}-linux-x64.tar.xz"

echo "========================================"
echo "Installing Node.js on Server"
echo "========================================"
echo ""

# Check if file exists
if [ ! -f "/tmp/$NODE_FILE" ]; then
    echo "❌ Error: Node.js file not found at /tmp/$NODE_FILE"
    echo "Please upload it first using the PowerShell script"
    exit 1
fi

echo "Step 1: Extracting Node.js..."
cd /tmp
tar -xf $NODE_FILE

echo "Step 2: Installing to /usr/local..."
sudo cp -r node-${NODE_VERSION}-linux-x64/* /usr/local/

echo "Step 3: Creating symlinks..."
sudo ln -sf /usr/local/bin/node /usr/bin/node
sudo ln -sf /usr/local/bin/npm /usr/bin/npm

echo "Step 4: Verifying installation..."
node --version
npm --version

echo ""
echo "Step 5: Installing PM2..."
npm install -g pm2
pm2 --version

echo ""
echo "Step 6: Cleaning up..."
rm -rf /tmp/node-${NODE_VERSION}-linux-x64*

echo ""
echo "========================================"
echo "✅ Node.js and PM2 installed successfully!"
echo "========================================"
echo ""
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "PM2 version: $(pm2 --version)"
echo ""













