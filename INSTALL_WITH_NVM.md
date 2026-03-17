# Install Node.js Using NVM (Bypasses apt)

## 🎯 Why NVM?
- Downloads directly from nodejs.org
- Doesn't need apt repositories
- Works even with network restrictions

---

## 📥 Step 1: Install NVM

**Copy and paste this:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**Wait for it to complete.**

---

## 🔄 Step 2: Reload Shell

```bash
source ~/.bashrc
```

**Or close and reopen SSH connection.**

---

## 📦 Step 3: Install Node.js 20

```bash
nvm install 20
```

**This will download and install Node.js 20.x**

---

## ✅ Step 4: Set as Default

```bash
nvm use 20
nvm alias default 20
```

---

## 🔍 Step 5: Verify Installation

```bash
node --version
npm --version
```

**Should show:** `v20.x.x` and `10.x.x`

---

## 📦 Step 6: Install PM2

```bash
npm install -g pm2
pm2 --version
```

---

## 🌐 Step 7: Install Nginx (Try Again)

**Even if apt fails, try:**
```bash
sudo apt install -y nginx --fix-missing
```

**Or check if it's available via snap:**
```bash
sudo snap install nginx
```

**Or we can skip Nginx for now and configure it later.**

---

## 🚀 After Installation

Once Node.js and PM2 are installed:
1. Create app directory
2. Upload your files
3. Install dependencies
4. Build and deploy

---

**Start with Step 1 above!** Run the NVM install command first.















