# Next Steps After Node.js Installation ✅

## ✅ Current Status
- Node.js v20.11.0 installed ✅
- npm 10.2.4 installed ✅
- PM2 installing... ⏳

---

## 🔍 Step 1: Verify PM2 Installation

**After PM2 finishes installing, run:**
```bash
pm2 --version
```

**Should show PM2 version number.**

---

## 📁 Step 2: Create Application Directory

```bash
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
pwd
```

**Should show:** `/var/www/kenmccoy`

---

## 📤 Step 3: Upload Your Application Files

**Now you need to upload your Next.js application files.**

### Option A: Using WinSCP (Easiest)
1. Download WinSCP: https://winscp.net/eng/download.php
2. Connect: `sftp://192.168.2.21`, user: `web`, password: `Web@2025`
3. Upload files from `C:\Users\hp\Desktop\tsx\kenmccoy` to `/var/www/kenmccoy`
4. **Exclude:** `node_modules`, `.next`, `.git`, `.env*`

### Option B: Using SCP from PowerShell
```powershell
# On your local machine
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

## 📦 Step 4: Install Dependencies

**On server, after files are uploaded:**
```bash
cd /var/www/kenmccoy
npm install --production
```

---

## ⚙️ Step 5: Create Environment File

```bash
nano .env.production
```

**Add these lines (replace with YOUR Gmail credentials):**
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
PORT=3000
```

**Save:** Ctrl+X, then Y, then Enter

---

## 🔨 Step 6: Build Application

```bash
npm run build
```

**Wait for build to complete (2-5 minutes).**

---

## 🚀 Step 7: Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

**You should see your app running!** ✅

---

## 🌐 Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/kenmccoy
```

**Paste this:**
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

## ✅ Step 9: Test Your Site!

**From browser (while connected to VPN):**
- Open: `http://192.168.2.21`
- You should see your website! 🎊

---

## 📋 Quick Checklist

- [ ] PM2 installed and verified
- [ ] Application directory created
- [ ] Files uploaded
- [ ] Dependencies installed
- [ ] Environment file created
- [ ] Application built
- [ ] PM2 running
- [ ] Nginx configured
- [ ] Site accessible

---

**Wait for PM2 to finish installing, then continue with Step 1 above!** 🚀











