# Quick Guide: Upload Node.js Binary

## 🚀 Fastest Method - Do This Now

### On Your Windows Machine:

1. **Download Node.js:**
   - Go to: https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
   - Save to: `C:\Users\hp\Desktop\tsx\kenmccoy\`

2. **Upload to Server:**
   ```powershell
   cd C:\Users\hp\Desktop\tsx\kenmccoy
   scp node-v20.11.0-linux-x64.tar.xz web@192.168.2.21:/tmp/
   ```
   Password: `Web@2025`

### On Server (SSH session):

```bash
cd /tmp
tar -xf node-v20.11.0-linux-x64.tar.xz
sudo cp -r node-v20.11.0-linux-x64/* /usr/local/
sudo ln -sf /usr/local/bin/node /usr/bin/node
sudo ln -sf /usr/local/bin/npm /usr/bin/npm
node --version
npm --version
npm install -g pm2
```

**That's it!** Node.js will be installed. ✅













