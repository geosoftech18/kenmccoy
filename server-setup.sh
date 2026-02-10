#!/bin/bash

# Server setup script for Ken McCoy website
# Run this ONCE on the server to set up the environment
# Usage: ./server-setup.sh

set -e

echo "🔧 Setting up server for Ken McCoy website..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Please do not run as root. Use a regular user with sudo privileges."
   exit 1
fi

# Update system
echo "📦 Updating system packages..."
sudo apt-get update

# Install Node.js (if not installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
else
    echo "✅ PM2 already installed"
fi

# Install Nginx (if not installed)
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt-get install -y nginx
else
    echo "✅ Nginx already installed"
fi

# Create application directory
APP_DIR="/var/www/kenmccoy"
echo "📁 Creating application directory..."
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs
sudo mkdir -p /var/log/kenmccoy
sudo chown $USER:$USER /var/log/kenmccoy

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
echo "y" | sudo ufw enable || true

# Set up PM2 startup
echo "⚙️  Configuring PM2 startup..."
pm2 startup systemd -u $USER --hp /home/$USER || true

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your application files to $APP_DIR"
echo "2. Create .env.production file with your environment variables"
echo "3. Run: npm install --production"
echo "4. Run: npm run build"
echo "5. Run: pm2 start ecosystem.config.js"
echo "6. Configure Nginx (see nginx.conf.example)"
echo "7. Test your deployment"
echo ""











