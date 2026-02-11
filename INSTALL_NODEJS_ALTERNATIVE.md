# Alternative Node.js Installation Methods

## 🔍 Step 1: Check Available Tools

**First, check what's available:**
```bash
which wget
which curl
which python3
```

---

## 📥 Method 1: Use wget (if available)

**If wget is installed:**
```bash
# Download NVM install script
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload
source ~/.bashrc

# Install Node.js
nvm install 20
nvm use 20
nvm alias default 20
```

---

## 📥 Method 2: Download Node.js Binary Directly

**If wget is available, download Node.js binary:**
```bash
# Create directory
mkdir -p ~/nodejs
cd ~/nodejs

# Download Node.js 20 binary (Linux x64)
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz

# Extract
tar -xf node-v20.11.0-linux-x64.tar.xz

# Install globally
sudo cp -r node-v20.11.0-linux-x64/* /usr/local/

# Verify
/usr/local/bin/node --version
/usr/local/bin/npm --version

# Create symlinks (if needed)
sudo ln -s /usr/local/bin/node /usr/bin/node
sudo ln -s /usr/local/bin/npm /usr/bin/npm
```

---

## 📥 Method 3: Upload from Your Local Machine

**If server has no internet access, upload Node.js from your computer:**

1. **On your local machine, download Node.js:**
   - Go to: https://nodejs.org/dist/v20.11.0/
   - Download: `node-v20.11.0-linux-x64.tar.xz`

2. **Upload to server using WinSCP or SCP:**
   ```powershell
   # From your local machine
   scp node-v20.11.0-linux-x64.tar.xz web@192.168.2.21:/tmp/
   ```

3. **On server, extract and install:**
   ```bash
   cd /tmp
   tar -xf node-v20.11.0-linux-x64.tar.xz
   sudo cp -r node-v20.11.0-linux-x64/* /usr/local/
   sudo ln -s /usr/local/bin/node /usr/bin/node
   sudo ln -s /usr/local/bin/npm /usr/bin/npm
   node --version
   ```

---

## 🔧 Method 4: Install curl/wget first (if possible)

**Try to install curl using apt (might work with cached packages):**
```bash
sudo apt install -y curl --fix-missing
```

**Or try wget:**
```bash
sudo apt install -y wget --fix-missing
```

---

## ✅ Quick Test

**First, check what's available:**
```bash
which wget
which python3
ls /usr/bin/ | grep -E "(wget|curl|python)"
```

---

**Start by checking if wget is available!** Run: `which wget`













