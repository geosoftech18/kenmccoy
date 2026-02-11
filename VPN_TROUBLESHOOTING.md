# VPN Connection Troubleshooting Guide

## 🔴 Problem: "Timed out waiting for server response"

You're seeing connection timeouts in Sophos Connect. Here's how to fix it:

---

## 🔍 Step 1: Check the Configuration File

The config file might have the wrong server address. Let's check:

1. **Open Sophos Connect**
2. **Right-click on your connection** → **Edit** or **Properties**
3. **Check the server address:**
   - Should be: `122.170.113.117` (the VPN portal URL)
   - NOT: `192.168.1.20` or `192.168.2.21` (these are internal IPs)

**If the server address is wrong:**
- The config file might have an internal IP instead of the VPN gateway IP
- You need to edit it to use: `122.170.113.117`

---

## 🔧 Step 2: Edit the Configuration File

**Option A: Edit in Sophos Connect**
1. Right-click your connection
2. Select **"Edit"** or **"Properties"**
3. Change server address to: `122.170.113.117`
4. Save and try connecting again

**Option B: Edit the .ovpn file directly**
1. Find the downloaded `.ovpn` file
2. Open it with Notepad
3. Look for a line like:
   ```
   remote 192.168.1.20 443
   ```
   or
   ```
   remote 192.168.2.21 443
   ```
4. Change it to:
   ```
   remote 122.170.113.117 443
   ```
5. Save the file
6. Remove the old connection in Sophos Connect
7. Re-import the edited file

---

## 🔥 Step 3: Check Windows Firewall

Windows Firewall might be blocking the VPN connection:

1. **Open Windows Security:**
   - Press `Win + I` → **Privacy & Security** → **Windows Security** → **Firewall & network protection**

2. **Allow Sophos Connect through firewall:**
   - Click **"Allow an app through firewall"**
   - Find **"Sophos Connect"** in the list
   - Check both **Private** and **Public** boxes
   - If not listed, click **"Allow another app"** and add Sophos Connect

3. **Or temporarily disable firewall to test:**
   - Turn off Windows Firewall temporarily
   - Try connecting
   - If it works, firewall was the issue - re-enable and add exception

---

## 🌐 Step 4: Check Network Connectivity

Test if you can reach the VPN server:

**Open PowerShell or Command Prompt:**
```bash
ping 122.170.113.117
```

**Expected:** You should get replies. If you get "Request timed out", there's a network issue.

**Also test the port:**
```bash
Test-NetConnection -ComputerName 122.170.113.117 -Port 443
```

---

## 🔌 Step 5: Check VPN Port and Protocol

The VPN might need a specific port. Check your `.ovpn` file:

1. Open the `.ovpn` file in Notepad
2. Look for lines like:
   ```
   remote 122.170.113.117 443
   proto udp
   ```
   or
   ```
   remote 122.170.113.117 1194
   proto tcp
   ```

**Common ports:**
- `443` (HTTPS) - most common
- `1194` (OpenVPN default)
- `8443` (alternative)

**If port is wrong, edit the file:**
```
remote 122.170.113.117 443
```

---

## 🏢 Step 6: Check Corporate/Network Restrictions

If you're on a corporate network or restricted network:

1. **Try from a different network:**
   - Mobile hotspot
   - Home network
   - Different WiFi

2. **Check if your network blocks VPN:**
   - Some networks block VPN connections
   - Contact your network administrator

3. **Try different DNS:**
   - Change DNS to Google DNS (8.8.8.8) or Cloudflare (1.1.1.1)

---

## 🔄 Step 7: Re-download Configuration

The config file might be corrupted or outdated:

1. **Go back to VPN portal:**
   - https://122.170.113.117
   - Login: `amar` / `Pass@123456`

2. **Download a fresh configuration file:**
   - Try the **OpenVPN Connect v3** version instead
   - Or try the **Android/iOS** version (sometimes works on Windows)

3. **Remove old connection in Sophos Connect**

4. **Import the new file**

---

## 🛠️ Step 8: Try OpenVPN Connect Instead

If Sophos Connect keeps failing, try OpenVPN Connect:

1. **Download OpenVPN Connect:**
   - https://openvpn.net/client-connect-vpn-for-windows/

2. **Install it**

3. **Download config from portal:**
   - Use the "OpenVPN Connect v3" version

4. **Import and connect:**
   - Open OpenVPN Connect
   - Import the `.ovpn` file
   - Enter credentials: `amar` / `Pass@123456`
   - Connect

---

## 📋 Quick Fix Checklist

Try these in order:

- [ ] **Check server address in config** - should be `122.170.113.117`
- [ ] **Edit .ovpn file** - change `remote` line to use `122.170.113.117`
- [ ] **Check Windows Firewall** - allow Sophos Connect
- [ ] **Test connectivity** - `ping 122.170.113.117`
- [ ] **Try different port** - 443, 1194, or 8443
- [ ] **Re-download config** - get fresh file from portal
- [ ] **Try OpenVPN Connect** - alternative client
- [ ] **Try different network** - mobile hotspot
- [ ] **Contact client** - verify VPN server is running

---

## 🆘 Most Likely Issues

Based on your error logs showing connections to `192.168.1.20` and `192.168.2.21`:

**Problem:** The config file has internal IP addresses instead of the VPN gateway IP.

**Solution:** 
1. Edit the `.ovpn` file
2. Find line: `remote 192.168.x.x 443`
3. Change to: `remote 122.170.113.117 443`
4. Save and re-import

---

## 📞 Contact Client

If nothing works, contact your client and ask:
1. Is the VPN server running?
2. What is the correct server address? (should be `122.170.113.117`)
3. What port should be used? (usually 443)
4. Are there any firewall rules needed?
5. Is there a specific VPN client version required?

---

## ✅ Success Indicators

When VPN connects successfully, you should see:
- ✅ "Connected" status in Sophos Connect
- ✅ Green/connected icon
- ✅ Can ping: `ping 192.168.2.21` (should work)
- ✅ Can SSH: `ssh web@192.168.2.21` (should work)

---

Try the fixes above and let me know which one works!













