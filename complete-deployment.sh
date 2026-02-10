#!/bin/bash

# Complete Deployment Script for Ken McCoy Website
# Run this on the server after connecting via SSH

set -e  # Exit on error

echo "🚀 Starting Complete Deployment Setup..."
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Update system
echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
sudo apt update

# Step 2: Install Node.js
echo -e "${YELLOW}Step 2: Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo -e "${GREEN}✅ Node.js installed: $(node --version)${NC}"
else
    echo -e "${GREEN}✅ Node.js already installed: $(node --version)${NC}"
fi

# Step 3: Install PM2
echo -e "${YELLOW}Step 3: Installing PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 installed: $(pm2 --version)${NC}"
else
    echo -e "${GREEN}✅ PM2 already installed: $(pm2 --version)${NC}"
fi

# Step 4: Install Nginx
echo -e "${YELLOW}Step 4: Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    echo -e "${GREEN}✅ Nginx installed${NC}"
else
    echo -e "${GREEN}✅ Nginx already installed: $(nginx -v 2>&1)${NC}"
fi

# Step 5: Create application directory
echo -e "${YELLOW}Step 5: Creating application directory...${NC}"
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
echo -e "${GREEN}✅ Directory created: /var/www/kenmccoy${NC}"

# Step 6: Create logs directory
echo -e "${YELLOW}Step 6: Creating logs directory...${NC}"
mkdir -p logs
sudo mkdir -p /var/log/kenmccoy
sudo chown web:web /var/log/kenmccoy
echo -e "${GREEN}✅ Logs directory created${NC}"

# Step 7: Configure firewall
echo -e "${YELLOW}Step 7: Configuring firewall...${NC}"
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
echo "y" | sudo ufw enable 2>/dev/null || true
echo -e "${GREEN}✅ Firewall configured${NC}"

# Step 8: Set up PM2 startup
echo -e "${YELLOW}Step 8: Configuring PM2 startup...${NC}"
pm2 startup systemd -u $USER --hp /home/$USER 2>/dev/null || echo "PM2 startup already configured"
echo -e "${GREEN}✅ PM2 startup configured${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Upload your application files to /var/www/kenmccoy"
echo "2. Run: cd /var/www/kenmccoy && npm install --production"
echo "3. Create .env.production file with your environment variables"
echo "4. Run: npm run build"
echo "5. Run: pm2 start ecosystem.config.js"
echo "6. Configure Nginx (see nginx.conf.example)"
echo ""
echo "Current directory: $(pwd)"
echo "Ready for file upload!"











