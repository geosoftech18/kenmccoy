# Automated Node.js Installation

## 🚀 I've Created Scripts to Help You!

I've created automated scripts that will:
1. ✅ Download Node.js automatically
2. ✅ Upload it to your server
3. ✅ Install it on the server

---

## 📥 Step 1: Run PowerShell Script (On Your Windows Machine)

**Open PowerShell in your project directory:**

```powershell
cd C:\Users\hp\Desktop\tsx\kenmccoy
.\download-and-upload-nodejs.ps1
```

**This script will:**
- Download Node.js v20.11.0 automatically
- Upload it to your server
- Show you the next steps

**When prompted for password, enter:** `Web@2025`

---

## 🔧 Step 2: Install on Server (SSH Session)

**After the upload completes, go to your SSH session and run:**

```bash
cd /tmp
tar -xf node-v20.11.0-linux-x64.tar.xz
sudo cp -r node-v20.11.0-linux-x64/* /usr/local/
sudo ln -sf /usr/local/bin/node /usr/bin/node
sudo ln -sf /usr/local/bin/npm /usr/bin/npm
node --version
npm --version
npm install -g pm2
pm2 --version
```

**Or use the install script:**
```bash
# Upload the install script first
# Then run:
chmod +x install-on-server.sh
./install-on-server.sh
```

---

## 🎯 Quick Method (All in One)

### On Your Windows Machine (PowerShell):

```powershell
cd C:\Users\hp\Desktop\tsx\kenmccoy
.\download-and-upload-nodejs.ps1
```

### On Server (SSH):

```bash
cd /tmp && tar -xf node-v20.11.0-linux-x64.tar.xz && sudo cp -r node-v20.11.0-linux-x64/* /usr/local/ && sudo ln -sf /usr/local/bin/node /usr/bin/node && sudo ln -sf /usr/local/bin/npm /usr/bin/npm && node --version && npm --version && npm install -g pm2
```

---

## ✅ What Happens

1. **PowerShell script downloads** Node.js from nodejs.org
2. **Uploads** to your server via SCP
3. **You run commands** on server to install
4. **Node.js, npm, and PM2** are installed

---

## 🆘 If Script Doesn't Work

**Manual download:**
1. Go to: https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
2. Download the file
3. Upload manually:
   ```powershell
   scp node-v20.11.0-linux-x64.tar.xz web@192.168.2.21:/tmp/
   ```

---

**Start by running the PowerShell script!** 🚀













