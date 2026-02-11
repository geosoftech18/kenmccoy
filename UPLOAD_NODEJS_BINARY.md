# Upload Node.js Binary from Your Computer

## 🎯 Solution: Upload Node.js Binary Directly

Since the server can't download from internet, we'll upload Node.js from your Windows machine.

---

## 📥 Step 1: Download Node.js on Your Computer

**On your Windows machine (local):**

1. **Open browser**
2. **Go to:** https://nodejs.org/dist/v20.11.0/
3. **Download:** `node-v20.11.0-linux-x64.tar.xz`
4. **Save to:** `C:\Users\hp\Desktop\tsx\kenmccoy\`

---

## 📤 Step 2: Upload to Server

**Open PowerShell on your local machine:**

```powershell
cd C:\Users\hp\Desktop\tsx\kenmccoy
scp node-v20.11.0-linux-x64.tar.xz web@192.168.2.21:/tmp/
```

**When prompted, enter password:** `Web@2025`

---

## 🔧 Step 3: Install on Server

**Go back to your SSH session and run:**

```bash
# Navigate to /tmp
cd /tmp

# Extract Node.js
tar -xf node-v20.11.0-linux-x64.tar.xz

# Install to /usr/local
sudo cp -r node-v20.11.0-linux-x64/* /usr/local/

# Create symlinks
sudo ln -sf /usr/local/bin/node /usr/bin/node
sudo ln -sf /usr/local/bin/npm /usr/bin/npm

# Verify installation
node --version
npm --version
```

**Should show:** `v20.11.0` and npm version

---

## 📦 Step 4: Install PM2

```bash
npm install -g pm2
pm2 --version
```

---

## ✅ Step 5: Clean Up

```bash
rm -rf /tmp/node-v20.11.0-linux-x64*
```

---

## 🎯 Quick Summary

1. **Download** `node-v20.11.0-linux-x64.tar.xz` on your computer
2. **Upload** using `scp` command above
3. **Install** using commands in Step 3
4. **Verify** with `node --version`

---

**Start by downloading the file, then upload it!** 🚀













