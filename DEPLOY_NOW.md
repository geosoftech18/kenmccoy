# Complete Deployment Steps - Do This Now

## 🎯 You're Here: Server Setup Complete, Ready to Deploy

Follow these steps in order:

---

## Step 1: Run Server Setup Script (If Not Done)

**On the server (your SSH session), run:**

```bash
cd /var/www/kenmccoy
```

If the directory doesn't exist or you haven't run setup yet:

```bash
# Download and run setup script (or run commands manually)
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs pm2 nginx
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
```

---

## Step 2: Upload Your Application Files

**Choose one method:**

### Option A: WinSCP (Easiest - GUI)
1. Download WinSCP: https://winscp.net/eng/download.php
2. Connect: `sftp://192.168.2.21`, user: `web`, password: `Web@2025`
3. Upload files from `C:\Users\hp\Desktop\tsx\kenmccoy` to `/var/www/kenmccoy`
4. **Exclude:** `node_modules`, `.next`, `.git`, `.env*`

### Option B: SCP from PowerShell
```powershell
# On your local machine (new PowerShell window)
cd C:\Users\hp\Desktop\tsx\kenmccoy
scp -r --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' * web@192.168.2.21:/var/www/kenmccoy/
```

### Option C: Create tar and upload
```powershell
# On local machine
cd C:\Users\hp\Desktop\tsx\kenmccoy
tar -czf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' .
scp deploy.tar.gz web@192.168.2.21:/tmp/

# On server
cd /var/www/kenmccoy
tar -xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz
```

---

## Step 3: Install Dependencies

**On the server:**
```bash
cd /var/www/kenmccoy
npm install --production
```

---

## Step 4: Create Environment File

**On the server:**
```bash
nano .env.production
```

**Paste this (replace with YOUR actual Gmail credentials):**
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
PORT=3000
```

**Save:** Ctrl+X, then Y, then Enter

---

## Step 5: Build Application

**On the server:**
```bash
npm run build
```

Wait for build to complete (2-5 minutes).

---

## Step 6: Start with PM2

**On the server:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

You should see your app running! ✅

---

## Step 7: Configure Nginx

**On the server:**
```bash
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

**Save:** Ctrl+X, Y, Enter

**Enable and reload:**
```bash
sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 8: Test Your Site! 🎉

**From your browser (while connected to VPN):**
- Open: `http://192.168.2.21`
- You should see your website! 🎊

**Test the contact form** to make sure it works.

---

## 📋 Quick Command Summary

**Copy-paste these on the server:**

```bash
# Navigate to app directory
cd /var/www/kenmccoy

# Install dependencies
npm install --production

# Create env file (then edit with nano)
nano .env.production

# Build
npm run build

# Start
pm2 start ecosystem.config.js
pm2 save

# Configure Nginx
sudo nano /etc/nginx/sites-available/kenmccoy
# (paste config, save)

sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🆘 Troubleshooting

**If build fails:**
- Check error messages
- Verify all files uploaded correctly
- Check Node.js version: `node --version` (should be v20.x)

**If PM2 won't start:**
- Check logs: `pm2 logs kenmccoy`
- Verify `.env.production` exists
- Check if port 3000 is available: `sudo lsof -i :3000`

**If 502 Bad Gateway:**
- Check PM2: `pm2 status`
- Check Nginx: `sudo nginx -t`
- Check logs: `pm2 logs kenmccoy`

---

## ✅ Success Checklist

- [ ] Files uploaded
- [ ] Dependencies installed
- [ ] Environment file created
- [ ] Application built
- [ ] PM2 running
- [ ] Nginx configured
- [ ] Site accessible in browser
- [ ] Contact form works

---

**Start with uploading your files, then follow the steps above!** 🚀











