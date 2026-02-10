# Server Setup - What to Do Now

## ✅ Current Status
- Connected to server via SSH ✅
- Server: Ubuntu 24.04.3 LTS ✅
- Node.js: **Not installed** (needs installation)
- **Next: Install required software**

---

## 🚀 Step-by-Step Setup

### Step 1: Install Node.js

**On the server (you're already connected), run:**

```bash
# Update package list
sudo apt update

# Install Node.js 20.x (LTS version)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

**Expected output:**
- `node --version` should show: `v20.x.x`
- `npm --version` should show: `10.x.x`

---

### Step 2: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verify
pm2 --version
```

---

### Step 3: Check/Install Nginx

```bash
# Check if Nginx is installed
nginx -v

# If not installed, install it:
sudo apt install -y nginx

# Check status
sudo systemctl status nginx
```

---

### Step 4: Create Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/kenmccoy

# Set ownership to your user
sudo chown web:web /var/www/kenmccoy

# Navigate to it
cd /var/www/kenmccoy
```

---

## 📋 Quick Copy-Paste Commands

**Run these commands one by one on the server:**

```bash
# 1. Update system
sudo apt update

# 2. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Verify Node.js
node --version
npm --version

# 4. Install PM2
sudo npm install -g pm2

# 5. Install Nginx
sudo apt install -y nginx

# 6. Create app directory
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
```

---

## 🎯 After Installation

Once all software is installed, you'll:
1. Upload your application files
2. Install dependencies
3. Configure environment variables
4. Build the application
5. Start with PM2
6. Configure Nginx

---

## 💡 What You're Seeing

The message "Command 'node' not found" is **normal** - it means Node.js isn't installed yet. We'll install it now!

**Start with the commands above** - copy and paste them into your SSH session one by one.

---

Let me know when you've run these commands and I'll guide you through the next steps! 🚀











