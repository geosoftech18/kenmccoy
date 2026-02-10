#!/bin/bash

# Deployment script for Ken McCoy website
# Usage: ./deploy.sh [server-ip] [username]

set -e  # Exit on error

SERVER_IP=${1:-"your-server-ip"}
USERNAME=${2:-"your-username"}
APP_DIR="/var/www/kenmccoy"

echo "🚀 Starting deployment to $USERNAME@$SERVER_IP..."

# Build locally first
echo "📦 Building application..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env*' \
  --exclude='deploy.tar.gz' \
  --exclude='*.log' \
  .

# Copy to server
echo "📤 Uploading to server..."
scp deploy.tar.gz $USERNAME@$SERVER_IP:/tmp/

# Deploy on server
echo "🔧 Deploying on server..."
ssh $USERNAME@$SERVER_IP << 'ENDSSH'
  set -e
  cd /var/www/kenmccoy
  
  # Backup current version
  if [ -d ".next" ]; then
    echo "💾 Backing up current version..."
    tar -czf ../kenmccoy-backup-$(date +%Y%m%d-%H%M%S).tar.gz .
  fi
  
  # Extract new version
  echo "📦 Extracting new version..."
  tar -xzf /tmp/deploy.tar.gz
  
  # Install dependencies
  echo "📥 Installing dependencies..."
  npm install --production
  
  # Build application
  echo "🔨 Building application..."
  npm run build
  
  # Restart PM2
  echo "🔄 Restarting application..."
  pm2 restart kenmccoy || pm2 start ecosystem.config.js
  
  # Save PM2 configuration
  pm2 save
  
  # Cleanup
  rm /tmp/deploy.tar.gz
  
  echo "✅ Deployment complete!"
  pm2 status
ENDSSH

# Cleanup local files
rm deploy.tar.gz

echo "✅ Deployment finished successfully!"











