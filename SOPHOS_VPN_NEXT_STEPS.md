# Next Steps After VPN Portal Login

You're now on the **Sophos VPN Portal**! Here's exactly what to do next:

## 🎯 Current Status
✅ You've logged into the VPN portal  
✅ You can see the Sophos VPN download options  
⏭️ **Next: Download and install the VPN client**

---

## 📥 Step-by-Step: Connect to VPN

### Option A: Using Sophos Connect (Recommended)

**Step 1: Download Sophos Connect Client**
1. On the VPN portal page, find **"Sophos Connect client"** section
2. Click **"Download for Windows"**
3. The installer will download (usually to your Downloads folder)

**Step 2: Install Sophos Connect**
1. Open the downloaded installer file
2. Follow the installation wizard
3. Click "Install" and wait for completion
4. You may need to allow administrator permissions

**Step 3: Download VPN Configuration**
1. On the VPN portal, scroll to **"VPN configuration"** section
2. Under **"SSL VPN configuration"**, click the first option:
   - **"Download for Windows, macOS, Linux"**
   - (The one that says "Use with Sophos Connect and OpenVPN Connect v2 clients")
3. Save the file (it will be a `.ovpn` or `.scx` file)

**Step 4: Import Configuration**
1. Open **Sophos Connect** application (search for it in Start Menu)
2. Click **"Import"** or **"+"** (Add Connection)
3. Browse and select the downloaded configuration file
4. The connection will be added to your list

**Step 5: Connect**
1. In Sophos Connect, select your imported connection
2. Click **"Connect"**
3. Enter your credentials:
   - **Username:** `amar`
   - **Password:** `Pass@123456`
4. Click **"Connect"** or **"OK"**
5. Wait for status to show **"Connected"** ✅

---

### Option B: Using OpenVPN Connect (Alternative)

**Step 1: Download OpenVPN Connect**
- Go to: https://openvpn.net/client-connect-vpn-for-windows/
- Download and install OpenVPN Connect

**Step 2: Download VPN Configuration**
- On the VPN portal, click **"Download for Windows, macOS, Linux"**
- Choose either v2 or v3 version (both work)
- Save the `.ovpn` file

**Step 3: Import and Connect**
- Open OpenVPN Connect
- Import the `.ovpn` file
- Enter credentials: `amar` / `Pass@123456`
- Click Connect

---

## ✅ Verify VPN Connection

Once you see "Connected" in your VPN client:

**Open PowerShell or Command Prompt and test:**
```bash
ping 192.168.2.21
```

**Expected result:**
```
Pinging 192.168.2.21 with 32 bytes of data:
Reply from 192.168.2.21: bytes=32 time=XXms TTL=XX
Reply from 192.168.2.21: bytes=32 time=XXms TTL=XX
```

If you get replies, **VPN is working!** ✅

---

## 🚀 Next: Connect to Server

Once VPN is connected, you can connect to the web server:

**Open PowerShell or Command Prompt:**
```bash
ssh web@192.168.2.21
```

**When prompted for password, enter:** `Web@2025`

**If asked to accept fingerprint, type:** `yes`

You should now be logged into the server! 🎉

---

## 📋 Quick Checklist

- [ ] Downloaded Sophos Connect client
- [ ] Installed Sophos Connect
- [ ] Downloaded VPN configuration file
- [ ] Imported configuration in Sophos Connect
- [ ] Connected to VPN (status shows "Connected")
- [ ] Verified with: `ping 192.168.2.21` ✅
- [ ] Connected to server: `ssh web@192.168.2.21` ✅

---

## 🆘 Troubleshooting

### Can't download the client
- Check your internet connection
- Try right-click → "Save link as"
- Check if antivirus is blocking the download

### Installation fails
- Run installer as Administrator (right-click → "Run as administrator")
- Temporarily disable antivirus
- Check Windows security settings

### Can't import configuration
- Make sure you downloaded the correct file (for Sophos Connect)
- Try the OpenVPN Connect option instead
- Check file extension (.ovpn or .scx)

### Connection fails
- Double-check username: `amar`
- Double-check password: `Pass@123456`
- Verify you're connected to internet
- Try disconnecting and reconnecting

### Can't ping server after connecting
- Make sure VPN shows "Connected" status
- Wait 10-20 seconds after connecting
- Try disconnecting and reconnecting VPN
- Check if Windows Firewall is blocking

---

## 🎯 After VPN is Connected

Once you can successfully:
- ✅ Ping the server: `ping 192.168.2.21`
- ✅ Connect via SSH: `ssh web@192.168.2.21`

**Proceed to:** `FIRST_TIME_SETUP.md` for deployment steps!

---

**Need help?** Check the main deployment guide or ask for assistance!













