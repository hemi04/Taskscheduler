# MongoDB Setup Guide

## 🔴 Current Error
```
Error: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

This means MongoDB is **not running** or **not accessible** on your machine.

---

## ✅ Solution Options

### Option 1: Use MongoDB Atlas (Cloud - RECOMMENDED for Quick Start)

**MongoDB Atlas is free and easiest to set up!**

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Choose **FREE (M0) tier**

#### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **FREE** shared cluster
3. Select a cloud provider and region (closest to you)
4. Click **"Create"** (takes 3-5 minutes)

#### Step 3: Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `taskflow_user` (or any name)
5. Password: Create a strong password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

#### Step 4: Whitelist Your IP
1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"** (or use `0.0.0.0/0` for all IPs - less secure but easier)
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

#### Step 6: Update Your .env File
Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://taskflow_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```

**Replace:**
- `taskflow_user` with your database username
- `YOUR_PASSWORD` with your database password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL

#### Step 7: Restart Backend
```powershell
# Stop the server (Ctrl+C) and restart
npm run dev
```

✅ **Done!** Your backend should now connect to MongoDB Atlas.

---

### Option 2: Install Local MongoDB

#### For Windows:

**Step 1: Download MongoDB**
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0+)
   - Platform: Windows
   - Package: MSI
3. Click **"Download"**

**Step 2: Install MongoDB**
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Check **"Install MongoDB as a Service"**
4. Check **"Install MongoDB Compass"** (GUI tool - optional but helpful)
5. Click **"Install"**

**Step 3: Verify Installation**
Open PowerShell and run:
```powershell
mongod --version
```

**Step 4: Start MongoDB Service**
MongoDB should start automatically as a Windows service.

To check if it's running:
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **"MongoDB"** service
4. Make sure it's **"Running"**

If not running:
- Right-click **"MongoDB"** → **"Start"**

**Step 5: Test Connection**
Open PowerShell:
```powershell
mongosh
```

If you see `test>` prompt, MongoDB is working! Type `exit` to leave.

**Step 6: Update .env File**
Your `.env` should already have:
```env
MONGODB_URI=mongodb://localhost:27017/taskflow
```

**Step 7: Restart Backend**
```powershell
npm run dev
```

✅ **Done!** Your backend should now connect to local MongoDB.

---

## 🔍 Verify Connection

After setting up MongoDB, restart your backend server. You should see:

```
✅ MongoDB Connected: localhost:27017
📊 Database: taskflow
Server running on port 5000
```

**NOT:**
```
❌ MongoDB Connection Error: ...
```

---

## 🐛 Troubleshooting

### Problem: "MongoDB service won't start"

**Solution:**
1. Check if port 27017 is already in use
2. Restart your computer
3. Reinstall MongoDB
4. Use MongoDB Atlas instead (easier!)

### Problem: "Connection timeout to Atlas"

**Solution:**
1. Check your IP is whitelisted in Atlas
2. Verify your connection string is correct
3. Check your internet connection
4. Try using `0.0.0.0/0` in Network Access (less secure but works)

### Problem: "Authentication failed"

**Solution:**
1. Verify username and password in connection string
2. Make sure database user has proper permissions
3. URL-encode special characters in password

### Problem: "Still getting connection refused"

**Solution:**
1. Double-check your `.env` file exists in `backend/` folder
2. Verify `MONGODB_URI` is correct (no extra spaces)
3. Restart the backend server
4. Check MongoDB is actually running

---

## 💡 Quick Test

Test your MongoDB connection string:

**For Local MongoDB:**
```powershell
mongosh "mongodb://localhost:27017/taskflow"
```

**For MongoDB Atlas:**
```powershell
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskflow"
```

If this works, your connection string is correct!

---

## 🎯 Recommended: Use MongoDB Atlas

**Why MongoDB Atlas?**
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works immediately
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ Easy to scale

**Local MongoDB is good for:**
- Offline development
- Learning MongoDB internals
- Full control over database

---

**Need more help?** Check the main [README.md](../README.md) or [HOW_TO_RUN.md](../HOW_TO_RUN.md)

