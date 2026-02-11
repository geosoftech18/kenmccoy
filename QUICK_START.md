# Quick Start Deployment Guide

## 🎯 Quick Overview

Your Next.js site needs to be deployed from Vercel to your client's VPN/web server. Here's the fastest path:

## 📋 Step 1: Gather Information

Ask your client for:
- VPN connection details (host, credentials, client software)
- Server SSH access (IP, username, password/key)
- Server OS and installed software (Node.js, Nginx, etc.)
- Domain name (if any)

## 🚀 Step 2: Connect & Deploy

### A. Connect to VPN
1. Install VPN client (OpenVPN, etc.)
2. Connect using client's credentials
3. Verify: `ping <server-ip>`

### B. Connect to Server
```bash
ssh username@server-ip
```

### C. Initial Server Setup (One-time)
```bash
# Upload server-setup.sh to server, then:
chmod +x server-setup.sh
./server-setup.sh
```

### D. Deploy Application

**Option 1: Using deploy.sh script (Easiest)**
```bash
# From your local machine (connected to VPN):
chmod +x deploy.sh
./deploy.sh server-ip username
```

**Option 2: Manual Deployment**
```bash
# On server:
cd /var/www
git clone <your-repo> kenmccoy  # Or upload files via SCP
cd kenmccoy
npm install --production

# Create .env.production:
nano .env.production
# Add: NODE_ENV=production, GMAIL_USER=..., GMAIL_APP_PASSWORD=...

npm run build
pm2 start ecosystem.config.js
pm2 save
```

### E. Configure Nginx
```bash
# On server:
sudo cp nginx.conf.example /etc/nginx/sites-available/kenmccoy
sudo nano /etc/nginx/sites-available/kenmccoy  # Edit domain/IP
sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ Step 3: Verify

1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs kenmccoy`
3. Test site: `curl http://localhost:3000`
4. Test via browser: `http://server-ip` (through VPN)

## 🔄 Updating Later

```bash
# Quick update:
./deploy.sh server-ip username

# Or manually:
ssh username@server-ip
cd /var/www/kenmccoy
git pull  # or upload new files
npm install --production
npm run build
pm2 restart kenmccoy
```

## 🆘 Common Issues

**Can't connect to VPN?**
- Verify credentials
- Check VPN client software
- Contact client for support

**502 Bad Gateway?**
- Check PM2: `pm2 status`
- Check Nginx: `sudo nginx -t`
- Check logs: `pm2 logs kenmccoy`

**Contact form not working?**
- Verify `.env.production` has GMAIL_USER and GMAIL_APP_PASSWORD
- Check PM2 logs for errors
- Test email credentials locally first

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for detailed instructions.













