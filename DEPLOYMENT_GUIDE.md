# Deployment Guide: Vercel to Client VPN/Web Server

This guide will help you migrate your Next.js application from Vercel to your client's VPN and web server.

## 📋 Prerequisites: Information Needed from Client

Before starting, collect the following information from your client:

### VPN Details
- [ ] VPN server address/hostname
- [ ] VPN connection method (OpenVPN, IPSec, WireGuard, etc.)
- [ ] VPN credentials (username/password or certificate files)
- [ ] VPN client software required
- [ ] Port numbers for VPN connection

### Web Server Details
- [ ] Server IP address or hostname (after VPN connection)
- [ ] Server OS (Linux distribution, Windows Server, etc.)
- [ ] SSH access credentials (username, password, or SSH key)
- [ ] Web server software (Nginx, Apache, IIS, etc.)
- [ ] Node.js version installed (or if you need to install it)
- [ ] Port numbers available (80, 443, 3000, etc.)
- [ ] Domain name (if applicable)
- [ ] SSL certificate details (if HTTPS is required)
- [ ] Database requirements (if any)
- [ ] Firewall rules/restrictions

### Environment Requirements
- [ ] Node.js version (recommend Node.js 18+ or 20+)
- [ ] PM2 or similar process manager installed
- [ ] Nginx/Apache configuration access
- [ ] File upload permissions

---

## 🚀 Deployment Approaches

You have **three main options** for deploying Next.js to a traditional server:

### Option 1: Static Export (Recommended for Simple Sites)
**Best for:** Sites without server-side features, API routes, or dynamic rendering
- ✅ Fastest and simplest
- ✅ Can be served by any web server
- ❌ **Won't work for your site** (you have API routes for contact form)

### Option 2: Node.js Server (Recommended for Your Site)
**Best for:** Sites with API routes, server-side rendering, or dynamic features
- ✅ Supports all Next.js features
- ✅ API routes work (your contact form)
- ✅ Full Next.js functionality
- ⚠️ Requires Node.js on server

### Option 3: Docker Container
**Best for:** Consistent deployments across environments
- ✅ Isolated environment
- ✅ Easy to manage
- ✅ Consistent across servers

**For your site, I recommend Option 2 (Node.js Server)** since you have API routes.

---

## 📦 Step-by-Step Deployment Process

### Phase 1: Prepare Your Local Environment

1. **Build the application locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Test the build:**
   ```bash
   npm start
   ```
   Visit `http://localhost:3000` to verify everything works.

3. **Prepare environment variables:**
   Create a `.env.production` file (don't commit this):
   ```env
   NODE_ENV=production
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   PORT=3000
   ```

### Phase 2: Connect to VPN

1. **Install VPN client** (if not already installed):
   - OpenVPN: https://openvpn.net/client/
   - Or use the client software your client provided

2. **Configure VPN connection:**
   - Import VPN configuration file (if provided)
   - Enter credentials
   - Connect to VPN

3. **Verify connection:**
   ```bash
   ping <server-ip-or-hostname>
   ```

### Phase 3: Connect to Server via SSH

1. **Connect to server:**
   ```bash
   ssh username@server-ip-or-hostname
   # Or with key file:
   ssh -i /path/to/key.pem username@server-ip-or-hostname
   ```

2. **Verify Node.js installation:**
   ```bash
   node --version
   npm --version
   ```

3. **Install Node.js if needed:**
   ```bash
   # For Ubuntu/Debian:
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Or use nvm:
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 20
   nvm use 20
   ```

### Phase 4: Deploy Application Files

**Option A: Using Git (Recommended)**
```bash
# On server, clone your repository
cd /var/www  # or your preferred directory
git clone <your-repo-url> kenmccoy
cd kenmccoy
npm install --production
```

**Option B: Using SCP/SFTP**
```bash
# From your local machine (while connected to VPN):
# Create a deployment package
tar -czf kenmccoy-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.env*' \
  .

# Copy to server
scp kenmccoy-deploy.tar.gz username@server-ip:/var/www/

# On server:
cd /var/www
tar -xzf kenmccoy-deploy.tar.gz -C kenmccoy
cd kenmccoy
npm install --production
```

**Option C: Using rsync**
```bash
# From your local machine:
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  ./ username@server-ip:/var/www/kenmccoy/

# On server:
cd /var/www/kenmccoy
npm install --production
```

### Phase 5: Configure Environment Variables

On the server, create `.env.production`:
```bash
cd /var/www/kenmccoy
nano .env.production
```

Add:
```env
NODE_ENV=production
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PORT=3000
```

**Important:** Never commit `.env.production` to Git!

### Phase 6: Build the Application

On the server:
```bash
cd /var/www/kenmccoy
npm run build
```

### Phase 7: Set Up Process Manager (PM2)

1. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

2. **Create PM2 ecosystem file:**
   ```bash
   cd /var/www/kenmccoy
   nano ecosystem.config.js
   ```

   Add this content:
   ```javascript
   module.exports = {
     apps: [{
       name: 'kenmccoy',
       script: 'node_modules/next/dist/bin/next',
       args: 'start',
       cwd: '/var/www/kenmccoy',
       instances: 1,
       exec_mode: 'fork',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       },
       error_file: '/var/log/kenmccoy/error.log',
       out_file: '/var/log/kenmccoy/out.log',
       log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
       merge_logs: true,
       autorestart: true,
       watch: false,
       max_memory_restart: '1G'
     }]
   }
   ```

3. **Create log directory:**
   ```bash
   sudo mkdir -p /var/log/kenmccoy
   sudo chown $USER:$USER /var/log/kenmccoy
   ```

4. **Start application with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup  # Follow instructions to enable auto-start on reboot
   ```

5. **Check status:**
   ```bash
   pm2 status
   pm2 logs kenmccoy
   ```

### Phase 8: Configure Web Server (Nginx)

1. **Install Nginx (if not installed):**
   ```bash
   sudo apt-get update
   sudo apt-get install nginx
   ```

2. **Create Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/kenmccoy
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;  # Replace with actual domain or IP

       # Redirect HTTP to HTTPS (if you have SSL)
       # return 301 https://$server_name$request_uri;

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
       }

       # Increase timeouts for API routes
       proxy_connect_timeout 60s;
       proxy_send_timeout 60s;
       proxy_read_timeout 60s;
   }

   # If you have SSL certificate, add this block:
   # server {
   #     listen 443 ssl http2;
   #     server_name your-domain.com www.your-domain.com;
   #
   #     ssl_certificate /path/to/certificate.crt;
   #     ssl_certificate_key /path/to/private.key;
   #
   #     location / {
   #         proxy_pass http://localhost:3000;
   #         # ... same proxy settings as above
   #     }
   # }
   ```

3. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/kenmccoy /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl reload nginx
   ```

### Phase 9: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# If using UFW, enable it:
sudo ufw enable
```

### Phase 10: Test Deployment

1. **Test locally on server:**
   ```bash
   curl http://localhost:3000
   ```

2. **Test through Nginx:**
   ```bash
   curl http://localhost
   ```

3. **Test from your machine (via VPN):**
   - Open browser: `http://server-ip` or `http://your-domain.com`
   - Test the contact form

---

## 🔄 Updating the Application

When you need to update the site:

```bash
# Connect to server via SSH
ssh username@server-ip

# Navigate to project
cd /var/www/kenmccoy

# Pull latest changes (if using Git)
git pull origin main

# Or upload new files via SCP/rsync

# Install dependencies (if package.json changed)
npm install --production

# Rebuild
npm run build

# Restart PM2
pm2 restart kenmccoy

# Check logs
pm2 logs kenmccoy
```

---

## 🐳 Alternative: Docker Deployment

If you prefer Docker, here's a Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Update `next.config.ts` for Docker:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // Add this for Docker
  // ... rest of config
};
```

---

## 🔧 Troubleshooting

### Application won't start
```bash
# Check PM2 logs
pm2 logs kenmccoy

# Check if port is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart kenmccoy
```

### Nginx 502 Bad Gateway
- Check if Next.js app is running: `pm2 status`
- Check if port 3000 is accessible: `curl http://localhost:3000`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### Contact form not working
- Verify environment variables: `pm2 env kenmccoy`
- Check API route logs: `pm2 logs kenmccoy`
- Test email credentials locally first

### Can't connect via VPN
- Verify VPN credentials
- Check firewall rules on client's network
- Ensure VPN client is properly configured

---

## 📝 Checklist

Before going live:
- [ ] VPN connection established and tested
- [ ] Server access confirmed
- [ ] Node.js installed and verified
- [ ] Application files deployed
- [ ] Environment variables configured
- [ ] Application built successfully
- [ ] PM2 running and auto-start configured
- [ ] Nginx configured and tested
- [ ] Firewall rules configured
- [ ] SSL certificate installed (if HTTPS)
- [ ] Contact form tested
- [ ] All pages accessible
- [ ] Domain DNS configured (if applicable)
- [ ] Monitoring/logging set up

---

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs kenmccoy`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables
4. Verify server resources (CPU, memory, disk space)

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong passwords for server access**
3. **Keep Node.js and dependencies updated**
4. **Configure firewall properly**
5. **Use HTTPS in production**
6. **Regular backups**
7. **Monitor server logs**

---

Good luck with your deployment! 🚀













