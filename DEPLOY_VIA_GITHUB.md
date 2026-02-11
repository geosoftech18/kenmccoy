# Deploy Using GitHub - Easy Method! 🚀

## ✅ Why Use GitHub?
- No need for SCP/WinSCP
- Easy updates later
- Version control
- Faster deployment

---

## 📋 Prerequisites

1. **Your code must be on GitHub**
   - If not, push it first
   - Or create a new repository

2. **Server needs Git installed**
   - We'll check and install if needed

---

## 🔧 Step 1: Install Git on Server (if needed)

**On your SSH session, run:**
```bash
git --version
```

**If Git is not installed:**
```bash
# Try installing (might work even with network issues)
sudo apt install -y git

# Or download Git binary if apt fails
# (We can do this if needed)
```

---

## 📥 Step 2: Clone Your Repository

**On server:**
```bash
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git kenmccoy
sudo chown -R web:web kenmccoy
cd kenmccoy
```

**Replace:**
- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO_NAME` - Your repository name

**Example:**
```bash
cd /var/www
sudo git clone https://github.com/yourusername/kenmccoy.git kenmccoy
sudo chown -R web:web kenmccoy
cd kenmccoy
```

---

## 🔐 Step 3: If Repository is Private

**If your repo is private, you have options:**

### Option A: Use Personal Access Token
1. **Create token on GitHub:**
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Give it `repo` permissions
   - Copy the token

2. **Clone with token:**
   ```bash
   git clone https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO.git kenmccoy
   ```

### Option B: Use SSH Key
1. **Generate SSH key on server:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter for default location
   # Press Enter for no passphrase (or set one)
   ```

2. **Copy public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the public key
   - Save

4. **Clone using SSH:**
   ```bash
   git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git kenmccoy
   ```

---

## 📦 Step 4: Install Dependencies

```bash
cd /var/www/kenmccoy
npm install --production
```

---

## ⚙️ Step 5: Create Environment File

```bash
nano .env.production
```

**Add:**
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PORT=3000
```

**Save:** Ctrl+X, Y, Enter

**Important:** Make sure `.env.production` is in `.gitignore` (don't commit it!)

---

## 🔨 Step 6: Build Application

```bash
npm run build
```

---

## 🚀 Step 7: Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

---

## 🌐 Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/kenmccoy
```

**Paste:**
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

**Save and enable:**
```bash
sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔄 Updating Later (Easy!)

**When you make changes:**
```bash
cd /var/www/kenmccoy
git pull origin main  # or master
npm install --production
npm run build
pm2 restart kenmccoy
```

**That's it!** Much easier than uploading files manually.

---

## 📝 Quick Commands Summary

```bash
# Install Git (if needed)
sudo apt install -y git

# Clone repository
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git kenmccoy
sudo chown -R web:web kenmccoy
cd kenmccoy

# Install and build
npm install --production
nano .env.production  # Add your env vars
npm run build

# Start
pm2 start ecosystem.config.js
pm2 save
```

---

## 🎯 What You Need

1. **GitHub repository URL** (or create one)
2. **Git installed on server** (we'll check/install)
3. **Access token or SSH key** (if private repo)

---

**First, check if Git is installed on your server, then we'll clone your repo!** 🚀













