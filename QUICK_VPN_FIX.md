# Quick Fix for VPN Connection Timeout

## 🔴 The Problem

Your config file is trying to connect to internal IPs (`192.168.1.20` or `192.168.2.21`) instead of the VPN gateway IP (`122.170.113.117`).

## ✅ Quick Fix (2 Minutes)

### Method 1: Edit the .ovpn File Manually

1. **Find your downloaded .ovpn file**
   - Usually in Downloads folder
   - Name like: `sslvpn-amar-client-config.ovpn`

2. **Right-click → Open with → Notepad**

3. **Find this line:**
   ```
   remote 192.168.1.20 443
   ```
   or
   ```
   remote 192.168.2.21 443
   ```

4. **Change it to:**
   ```
   remote 122.170.113.117 443
   ```

5. **Save the file** (Ctrl+S)

6. **In Sophos Connect:**
   - Remove the old connection (right-click → Delete)
   - Click "Import" or "+"
   - Select the edited .ovpn file
   - Try connecting again

---

### Method 2: Use PowerShell Script (Automatic)

1. **Open PowerShell** (as Administrator)

2. **Run the fix script:**
   ```powershell
   cd C:\Users\hp\Desktop\tsx\kenmccoy
   .\fix-vpn-config.ps1
   ```

3. **Follow the prompts** - it will ask for your .ovpn file path

4. **Re-import the fixed file in Sophos Connect**

---

## 🔍 Verify the Fix

After editing, your .ovpn file should have:
```
remote 122.170.113.117 443
```

NOT:
```
remote 192.168.1.20 443
remote 192.168.2.21 443
```

---

## 🚀 Try Connecting Again

1. **Open Sophos Connect**
2. **Select your connection**
3. **Click "Connect"**
4. **Enter credentials:**
   - Username: `amar`
   - Password: `Pass@123456`

It should connect now! ✅

---

## 🆘 Still Not Working?

If it still times out:

1. **Check Windows Firewall:**
   - Allow Sophos Connect through firewall
   - Or temporarily disable to test

2. **Test connectivity:**
   ```bash
   ping 122.170.113.117
   ```

3. **Try different port:**
   - Change `443` to `1194` or `8443` in the .ovpn file

4. **Contact client** to verify VPN server is running

---

**Most likely fix:** Edit the `remote` line in your .ovpn file to use `122.170.113.117` instead of the internal IPs.













