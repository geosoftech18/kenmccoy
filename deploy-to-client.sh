#!/bin/bash

# Deployment script for Ken McCoy website
# Configured for your specific server details
# Usage: ./deploy-to-client.sh

set -e  # Exit on error

# Your server details
SERVER_IP="192.168.2.21"
USERNAME="web"
APP_DIR="/var/www/kenmccoy"

echo "🚀 Starting deployment to $USERNAME@$SERVER_IP..."
echo "⚠️  Make sure you are connected to VPN first!"
echo ""

# Build locally first
echo "📦 Building application locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env*' \
  --exclude='deploy.tar.gz' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  .

# Copy to server
echo "📤 Uploading to server..."
echo "You will be prompted for password: Web@2025"
scp deploy.tar.gz $USERNAME@$SERVER_IP:/tmp/

# Deploy on server
echo "🔧 Deploying on server..."
echo "You will be prompted for password: Web@2025"
ssh $USERNAME@$SERVER_IP << 'ENDSSH'
  set -e
  cd /var/www/kenmccoy
  
  # Backup current version
  if [ -d ".next" ]; then
    echo "💾 Backing up current version..."
    BACKUP_NAME="../kenmccoy-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf $BACKUP_NAME .
    echo "✅ Backup created: $BACKUP_NAME"
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
  if pm2 list | grep -q "kenmccoy"; then
    pm2 restart kenmccoy
  else
    pm2 start ecosystem.config.js
  fi
  
  # Save PM2 configuration
  pm2 save
  
  # Show status
  echo ""
  echo "📊 Application Status:"
  pm2 status
  
  # Cleanup
  rm /tmp/deploy.tar.gz
  
  echo ""
  echo "✅ Deployment complete!"
  echo "🌐 Test your site at: http://192.168.2.21"
ENDSSH

# Cleanup local files
rm deploy.tar.gz

echo ""
echo "✅ Deployment finished successfully!"
echo "🌐 Your site should be live at: http://192.168.2.21"
echo "📝 Check logs with: ssh $USERNAME@$SERVER_IP 'pm2 logs kenmccoy'"













