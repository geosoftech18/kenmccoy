# Run These Commands Now - Step by Step

## ✅ You've Completed:
- VPN Connected ✅
- SSH Connected to Server ✅

## 🚀 Next: Install Required Software

**Copy and paste these commands ONE BY ONE into your SSH session:**

---

### Step 1: Update System
```bash
sudo apt update
```

---

### Step 2: Install Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

**Verify:**
```bash
node --version
npm --version
```

**Expected:** Should show `v20.x.x` and `10.x.x`

---

### Step 3: Install PM2
```bash
sudo npm install -g pm2
```

**Verify:**
```bash
pm2 --version
```

---

### Step 4: Install Nginx
```bash
sudo apt install -y nginx
```

**Verify:**
```bash
nginx -v
```

---

### Step 5: Create Application Directory
```bash
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
pwd
```

**Expected:** Should show `/var/www/kenmccoy`

---

### Step 6: Configure Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable
```

---

## ✅ After Running All Commands Above

**Verify everything is installed:**
```bash
node --version
npm --version
pm2 --version
nginx -v
```

**You should see version numbers for all!**

---

## 📤 Next Step: Upload Your Files

Once all software is installed, you need to upload your application files.

**I'll help you with that next!**

---

**Run the commands above first, then tell me when done!** 🚀











