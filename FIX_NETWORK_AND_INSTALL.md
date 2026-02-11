# Fix Network Issue and Install Software

## 🔴 Problem: Can't Connect to Ubuntu Repositories

The server can't reach Ubuntu package repositories. Let's try alternative methods.

---

## ✅ Step 1: Check What's Already Installed

**Run these to check:**
```bash
node --version
npm --version
pm2 --version
nginx -v
```

**If any are already installed, we can skip those!**

---

## 🔧 Step 2: Try Installing Node.js Directly

**Even with the network errors, try this:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**If that fails, try installing from NodeSource directly:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs --fix-missing
```

---

## 🌐 Step 3: Check Internet Connectivity

**Test if server can reach internet:**
```bash
ping -c 3 8.8.8.8
ping -c 3 google.com
```

**If ping fails, the server might need:**
- Proxy configuration
- Firewall rules
- DNS configuration

---

## 🔄 Step 4: Try Alternative Installation Methods

### Option A: Install Node.js using NVM (Node Version Manager)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version
npm --version
```

### Option B: Download Node.js Binary Directly
```bash
# Download Node.js binary
cd /tmp
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz

# Extract
tar -xf node-v20.11.0-linux-x64.tar.xz

# Install
sudo cp -r node-v20.11.0-linux-x64/* /usr/local/

# Verify
node --version
npm --version
```

---

## 📦 Step 5: Install PM2 and Nginx

**If Node.js is installed, continue:**

```bash
# Install PM2
sudo npm install -g pm2

# For Nginx, try installing anyway (might use cached packages)
sudo apt install -y nginx

# Or if that fails, try:
sudo apt-get install -y nginx --fix-missing
```

---

## 🆘 If Nothing Works

**Contact your client and ask:**
1. Does the server have internet access?
2. Is there a proxy server that needs to be configured?
3. Are there firewall rules blocking package downloads?
4. Can they provide pre-installed Node.js or allow package downloads?

---

## ✅ Quick Test Commands

**Run these to see current status:**
```bash
# Check internet
ping -c 3 8.8.8.8

# Check if Node.js exists
which node
node --version 2>/dev/null || echo "Node.js not found"

# Check if npm exists
which npm
npm --version 2>/dev/null || echo "npm not found"
```

---

**Start by checking what's already installed, then we'll proceed!**













