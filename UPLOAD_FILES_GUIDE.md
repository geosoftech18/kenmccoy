# How to Upload Your Application Files to Server

## ✅ Current Status
- Server setup complete (Node.js, PM2, Nginx installed)
- Application directory ready: `/var/www/kenmccoy`
- **Next: Upload your application files**

---

## 📤 Method 1: Using SCP (Recommended - From Your Windows Machine)

**Keep your SSH session open, and open a NEW PowerShell/Command Prompt on your local machine:**

### Step 1: Navigate to your project
```powershell
cd C:\Users\hp\Desktop\tsx\kenmccoy
```

### Step 2: Create deployment package
```powershell
# Create a tar.gz file (excludes unnecessary files)
tar -czf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' --exclude='deploy.tar.gz' .
```

**Note:** If `tar` command doesn't work on Windows, use Method 2 or 3 below.

### Step 3: Upload to server
```powershell
scp deploy.tar.gz web@192.168.2.21:/tmp/
# Password: Web@2025
```

### Step 4: Extract on server
**Go back to your SSH session and run:**
```bash
cd /var/www/kenmccoy
tar -xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz
```

---

## 📤 Method 2: Using WinSCP (GUI Tool - Easiest)

### Step 1: Download WinSCP
- Download: https://winscp.net/eng/download.php
- Install it

### Step 2: Connect
1. Open WinSCP
2. **New Session:**
   - **File protocol:** SFTP
   - **Host name:** `192.168.2.21`
   - **User name:** `web`
   - **Password:** `Web@2025`
   - Click **Login**

### Step 3: Upload Files
1. **Left side:** Your local files (`C:\Users\hp\Desktop\tsx\kenmccoy`)
2. **Right side:** Server directory (`/var/www/kenmccoy`)
3. **Exclude these folders/files:**
   - `node_modules`
   - `.next`
   - `.git`
   - `.env*`
   - `deploy.tar.gz`
4. **Select all other files and folders**
5. **Drag and drop** or click **Upload**

---

## 📤 Method 3: Using Git (If You Have a Repository)

**On the server (SSH session):**
```bash
cd /var/www
git clone <your-repo-url> kenmccoy
cd kenmccoy
```

---

## 📤 Method 4: Using PowerShell with WSL

If you have WSL installed:
```bash
# In WSL
cd /mnt/c/Users/hp/Desktop/tsx/kenmccoy
tar -czf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' .
scp deploy.tar.gz web@192.168.2.21:/tmp/
```

Then on server:
```bash
cd /var/www/kenmccoy
tar -xzf /tmp/deploy.tar.gz
```

---

## ✅ After Uploading Files

**On the server (SSH session), run:**

```bash
cd /var/www/kenmccoy

# Install dependencies
npm install --production

# Create environment file
nano .env.production
```

**Add these lines to .env.production:**
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PORT=3000
```

**Save:** Ctrl+X, then Y, then Enter

**Then:**
```bash
# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save

# Check status
pm2 status
```

---

## 🎯 Recommended: Use WinSCP (Method 2)

**WinSCP is the easiest for Windows users:**
- Visual interface
- Drag and drop
- Easy to exclude folders
- No command line needed

**Download:** https://winscp.net/eng/download.php

---

## 📋 Quick Checklist

- [ ] Files uploaded to `/var/www/kenmccoy`
- [ ] Ran `npm install --production`
- [ ] Created `.env.production` file
- [ ] Ran `npm run build`
- [ ] Started with PM2
- [ ] Configured Nginx

---

**Which method would you like to use?** I recommend WinSCP for easiest experience!













