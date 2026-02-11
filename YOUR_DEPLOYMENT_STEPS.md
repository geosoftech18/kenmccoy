# Your Specific Deployment Steps

## 🔐 Your Server & VPN Details

### VPN Connection
- **VPN URL**: https://122.170.113.117
- **Username**: amar
- **Password**: Pass@123456

### Web Server
- **IP Address**: 192.168.2.21 (accessible after VPN connection)
- **Username**: web
- **Password**: Web@2025

---

## 🚀 Step-by-Step Deployment Process

### Step 1: Connect to VPN

The VPN URL suggests it might be a web-based VPN portal. Here's how to connect:

**Option A: Web-based VPN Portal**
1. Open your browser
2. Go to: `https://122.170.113.117`
3. Login with:
   - Username: `amar`
   - Password: `Pass@123456`
4. Follow the portal instructions to connect

**Option B: VPN Client (if they provide a config file)**
- If they provide an `.ovpn` or config file, use OpenVPN client
- Import the config and connect with credentials above

**Verify VPN Connection:**
```bash
ping 192.168.2.21
```
You should get responses if VPN is connected.

---

### Step 2: Connect to Server via SSH

Once VPN is connected, connect to the server:

**On Windows (PowerShell or Command Prompt):**
```bash
ssh web@192.168.2.21
```
When prompted, enter password: `Web@2025`

**On Linux/Mac:**
```bash
ssh web@192.168.2.21
```
Password: `Web@2025`

**If SSH asks to accept fingerprint, type:** `yes`

---

### Step 3: Initial Server Setup (First Time Only)

Once connected to the server, run:

```bash
# Check current directory
pwd

# Check if Node.js is installed
node --version
npm --version

# Check if PM2 is installed
pm2 --version

# Check if Nginx is installed
nginx -v
```

**If Node.js is NOT installed:**
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**If PM2 is NOT installed:**
```bash
sudo npm install -g pm2
```

**If Nginx is NOT installed:**
```bash
sudo apt-get update
sudo apt-get install -y nginx
```

**Create application directory:**
```bash
sudo mkdir -p /var/www/kenmccoy
sudo chown web:web /var/www/kenmccoy
cd /var/www/kenmccoy
```

---

### Step 4: Deploy Your Application

**Option A: Using Git (if you have a repository)**
```bash
cd /var/www
git clone <your-repo-url> kenmccoy
cd kenmccoy
```

**Option B: Upload Files via SCP (from your local machine)**

From your local machine (while connected to VPN), open a NEW terminal:

```bash
# Navigate to your project directory
cd C:\Users\hp\Desktop\tsx\kenmccoy

# Create a deployment package (excluding unnecessary files)
tar -czf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.env*' .

# Upload to server (Windows PowerShell)
scp deploy.tar.gz web@192.168.2.21:/tmp/

# Or use WinSCP, FileZilla, or similar GUI tool
```

**On the server, extract and install:**
```bash
cd /var/www/kenmccoy
tar -xzf /tmp/deploy.tar.gz
npm install --production
```

**Option C: Using rsync (if available)**
```bash
# From your local machine (Windows - requires WSL or Git Bash)
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  ./ web@192.168.2.21:/var/www/kenmccoy/
```

---

### Step 5: Configure Environment Variables

On the server:
```bash
cd /var/www/kenmccoy
nano .env.production
```

Add these lines (replace with your actual Gmail credentials):
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
PORT=3000
```

Save and exit (Ctrl+X, then Y, then Enter)

---

### Step 6: Build the Application

```bash
cd /var/www/kenmccoy
npm run build
```

This may take a few minutes. Wait for it to complete.

---

### Step 7: Start with PM2

```bash
cd /var/www/kenmccoy

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set up PM2 to start on server reboot
pm2 startup
# Follow the instructions it provides (usually run a sudo command)

# Check status
pm2 status

# View logs
pm2 logs kenmccoy
```

---

### Step 8: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/kenmccoy
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name 192.168.2.21;  # Or your domain if you have one

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

Save and exit (Ctrl+X, Y, Enter)

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

### Step 9: Configure Firewall (if needed)

```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (if you add SSL later)
sudo ufw allow 443/tcp

# Check firewall status
sudo ufw status
```

---

### Step 10: Test Your Deployment

**On the server:**
```bash
# Test locally
curl http://localhost:3000

# Check PM2 status
pm2 status

# Check logs
pm2 logs kenmccoy --lines 50
```

**From your local machine (while connected to VPN):**
1. Open browser
2. Go to: `http://192.168.2.21`
3. Test all pages
4. Test the contact form

---

## 🔄 Updating the Application Later

When you need to update:

```bash
# Connect to VPN first, then:
ssh web@192.168.2.21

# Navigate to project
cd /var/www/kenmccoy

# If using Git:
git pull origin main

# Or upload new files via SCP

# Install dependencies (if package.json changed)
npm install --production

# Rebuild
npm run build

# Restart
pm2 restart kenmccoy

# Check logs
pm2 logs kenmccoy
```

---

## 🆘 Troubleshooting

### Can't connect to VPN
- Verify the URL: `https://122.170.113.117`
- Check if you need a VPN client or if it's web-based
- Contact client if portal doesn't work

### Can't connect to server
- Make sure VPN is connected first
- Verify IP: `192.168.2.21`
- Try: `ping 192.168.2.21` (should work if VPN is connected)
- Check if SSH service is running on server

### Application won't start
```bash
# Check PM2 logs
pm2 logs kenmccoy

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart kenmccoy
```

### 502 Bad Gateway
```bash
# Check if app is running
pm2 status

# Check Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Contact form not working
- Verify `.env.production` has correct Gmail credentials
- Check PM2 logs: `pm2 logs kenmccoy`
- Test Gmail credentials locally first

---

## ✅ Deployment Checklist

- [ ] Connected to VPN successfully
- [ ] Connected to server via SSH
- [ ] Node.js installed and verified
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Application files uploaded
- [ ] Environment variables configured
- [ ] Application built successfully
- [ ] PM2 running application
- [ ] Nginx configured and reloaded
- [ ] Site accessible via browser
- [ ] Contact form tested and working

---

## 🔐 Security Notes

⚠️ **Important Security Reminders:**
- Change default passwords after first deployment
- Use SSH keys instead of passwords (more secure)
- Keep server and dependencies updated
- Don't share these credentials publicly
- Consider setting up SSL/HTTPS for production

---

Good luck with your deployment! 🚀













