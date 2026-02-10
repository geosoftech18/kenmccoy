# First Time Setup - Complete Guide

Follow these steps in order for your first deployment.

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] VPN access details (you have them ✅)
- [ ] Server access details (you have them ✅)
- [ ] Your Gmail credentials for contact form
- [ ] Git repository URL (if using Git) OR ability to upload files

---

## Step 1: Connect to VPN ⚠️ (MUST DO FIRST)

**Read:** `connect-vpn.md` for detailed instructions

**Quick steps:**
1. Open browser
2. Go to: `https://122.170.113.117`
3. Login:
   - Username: `amar`
   - Password: `Pass@123456`
4. Follow portal instructions to connect

**Verify connection:**
```bash
ping 192.168.2.21
```
Should get responses if connected ✅

---

## Step 2: Connect to Server

**Open a new terminal/command prompt:**

**Windows (PowerShell):**
```bash
ssh web@192.168.2.21
```

**When prompted for password, enter:** `Web@2025`

**If asked to accept fingerprint, type:** `yes`

You should now be logged into the server! 🎉

---

## Step 3: Check Server Environment

Run these commands on the server:

```bash
# Check Node.js
node --version
# Should show v18.x or v20.x

# Check npm
npm --version

# Check if PM2 is installed
pm2 --version

# Check Nginx
nginx -v
```

**If any are missing, install them:**

### Install Node.js (if needed):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Verify
```

### Install PM2 (if needed):
```bash
sudo npm install -g pm2
pm2 --version  # Verify
```

### Install Nginx (if needed):
```bash
sudo apt-get update
sudo apt-get install -y nginx
nginx -v  # Verify
```

---

## Step 4: Create Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/kenmccoy

# Set ownership
sudo chown web:web /var/www/kenmccoy

# Navigate to it
cd /var/www/kenmccoy
```

---

## Step 5: Upload Your Application

**Option A: Using Git (if you have a repo)**

```bash
cd /var/www
git clone <your-repo-url> kenmccoy
cd kenmccoy
```

**Option B: Using SCP (from your local machine)**

**On your local machine** (new terminal, while VPN is connected):

```bash
# Navigate to your project
cd C:\Users\hp\Desktop\tsx\kenmccoy

# Create deployment package
tar -czf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' .

# Upload (you'll be asked for password: Web@2025)
scp deploy.tar.gz web@192.168.2.21:/tmp/
```

**Back on the server:**
```bash
cd /var/www/kenmccoy
tar -xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz
```

**Option C: Using FileZilla/WinSCP (GUI tool)**

1. Download FileZilla: https://filezilla-project.org/
2. Connect:
   - Host: `sftp://192.168.2.21`
   - Username: `web`
   - Password: `Web@2025`
   - Port: `22`
3. Upload your project files to `/var/www/kenmccoy`
4. Exclude: `node_modules`, `.next`, `.git`, `.env*`

---

## Step 6: Install Dependencies

**On the server:**
```bash
cd /var/www/kenmccoy
npm install --production
```

This may take a few minutes.

---

## Step 7: Configure Environment Variables

```bash
cd /var/www/kenmccoy
nano .env.production
```

**Add these lines** (replace with YOUR actual Gmail credentials):
```env
NODE_ENV=production
GMAIL_USER=your-actual-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
PORT=3000
```

**To save:**
- Press `Ctrl + X`
- Press `Y` (to confirm)
- Press `Enter`

---

## Step 8: Build the Application

```bash
cd /var/www/kenmccoy
npm run build
```

Wait for build to complete (may take 2-5 minutes).

---

## Step 9: Copy PM2 Config (if not already there)

The `ecosystem.config.js` should already be in your project. Verify:

```bash
ls -la ecosystem.config.js
```

If it exists, you're good! If not, create it (see `ecosystem.config.js` file).

---

## Step 10: Start Application with PM2

```bash
cd /var/www/kenmccoy

# Start the app
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Set up auto-start on reboot
pm2 startup
# Copy and run the command it shows (usually starts with sudo)

# Check status
pm2 status

# View logs
pm2 logs kenmccoy
```

You should see your app running! ✅

---

## Step 11: Configure Nginx

```bash
# Create config file
sudo nano /etc/nginx/sites-available/kenmccoy
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name 192.168.2.21;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    client_max_body_size 10M;
}
```

**Save:** `Ctrl+X`, `Y`, `Enter`

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload
sudo systemctl reload nginx
```

---

## Step 12: Configure Firewall

```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Check status
sudo ufw status
```

---

## Step 13: Test Your Deployment! 🎉

**On the server:**
```bash
# Test locally
curl http://localhost:3000

# Check PM2
pm2 status
```

**From your browser** (while connected to VPN):
1. Open browser
2. Go to: `http://192.168.2.21`
3. You should see your website! 🎊

**Test the contact form** to make sure it works.

---

## ✅ Success Checklist

- [ ] VPN connected
- [ ] Server accessible via SSH
- [ ] Node.js installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Application files uploaded
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Application built
- [ ] PM2 running app
- [ ] Nginx configured
- [ ] Site accessible in browser
- [ ] Contact form works

---

## 🆘 If Something Goes Wrong

### Can't connect to VPN
- See `connect-vpn.md`
- Contact client

### Can't connect to server
- Make sure VPN is connected first
- Verify IP: `192.168.2.21`
- Try: `ping 192.168.2.21`

### Build fails
- Check error messages
- Verify all dependencies in `package.json`
- Check Node.js version compatibility

### PM2 won't start
- Check logs: `pm2 logs kenmccoy`
- Verify `.env.production` exists
- Check if port 3000 is available

### 502 Bad Gateway
- Check PM2: `pm2 status`
- Check Nginx: `sudo nginx -t`
- Check logs: `pm2 logs kenmccoy`

---

## 🎉 You're Done!

Your site should now be live at: `http://192.168.2.21`

For future updates, see `YOUR_DEPLOYMENT_STEPS.md` section on "Updating the Application Later"











