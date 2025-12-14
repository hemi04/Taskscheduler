# 🐛 Debug MongoDB Connection Error

## Current Error
```
❌ Connection Attempt 1/5 Failed
   Error: connect ECONNREFUSED...
💡 This means MongoDB is NOT running...
```

This error means **MongoDB is not accessible** on your machine.

---

## 🔍 Step 1: Run Diagnostic Script

First, let's check what's wrong:

```powershell
cd backend
node check-mongodb.js
```

This will tell you:
- ✅ If MongoDB is installed
- ✅ If MongoDB service is running
- ✅ If connection string is correct
- ✅ Specific error details

---

## 🔧 Step 2: Choose Your Solution

### Option A: Use MongoDB Atlas (EASIEST - 5 minutes) ⭐ RECOMMENDED

**Why Atlas?**
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works immediately
- ✅ No local setup required

#### Quick Setup:

1. **Sign up** (free): https://www.mongodb.com/cloud/atlas/register

2. **Create Cluster** (3-5 minutes):
   - Click "Build a Database"
   - Choose **FREE (M0)** tier
   - Select region closest to you
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `taskflow_user`
   - Password: Create a strong password (save it!)
   - Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Add Current IP Address"
   - OR use `0.0.0.0/0` (allows all IPs - less secure but easier)

5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

6. **Update .env file**:
   ```env
   MONGODB_URI=mongodb+srv://taskflow_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
   ```
   Replace:
   - `taskflow_user` with your username
   - `YOUR_PASSWORD` with your password
   - `cluster0.xxxxx.mongodb.net` with your cluster URL

7. **Restart backend**:
   ```powershell
   npm run dev
   ```

✅ **Done!** Should work now.

---

### Option B: Install Local MongoDB

#### For Windows:

**Step 1: Download MongoDB**
- Go to: https://www.mongodb.com/try/download/community
- Select: Windows, MSI package
- Click "Download"

**Step 2: Install**
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. ✅ Check "Install MongoDB as a Service"
4. ✅ Check "Install MongoDB Compass" (optional GUI)
5. Click "Install"

**Step 3: Verify Installation**
```powershell
mongosh --version
```

**Step 4: Start MongoDB Service**
1. Press `Win + R`
2. Type: `services.msc`
3. Find "MongoDB" service
4. Right-click → "Start" (if not running)
5. Status should be "Running"

**Step 5: Test Connection**
```powershell
mongosh
```
If you see `test>` prompt, MongoDB is working! Type `exit` to leave.

**Step 6: Update .env**
Your `.env` should have:
```env
MONGODB_URI=mongodb://localhost:27017/taskflow
```

**Step 7: Restart Backend**
```powershell
npm run dev
```

✅ **Done!**

---

## 🔍 Step 3: Verify Connection

After setting up MongoDB, you should see:

**✅ Success:**
```
✅ MongoDB Connected Successfully!
   Host: localhost:27017
   Database: taskflow
```

**❌ Still Error:**
Run diagnostic again:
```powershell
node check-mongodb.js
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "MongoDB service won't start"

**Fix:**
1. Check if port 27017 is in use:
   ```powershell
   netstat -ano | findstr :27017
   ```
2. Restart your computer
3. Reinstall MongoDB
4. **OR** use MongoDB Atlas instead (easier!)

### Issue 2: "mongosh command not found"

**Fix:**
- MongoDB is not installed
- Install MongoDB or use Atlas

### Issue 3: "Connection timeout" (Atlas)

**Fix:**
1. Check IP whitelist in Atlas dashboard
2. Verify connection string
3. Check internet connection
4. Try `0.0.0.0/0` in Network Access (allows all IPs)

### Issue 4: "Authentication failed"

**Fix:**
1. Verify username/password in connection string
2. Check database user has proper permissions
3. URL-encode special characters in password

### Issue 5: "Port 27017 already in use"

**Fix:**
1. Find what's using the port:
   ```powershell
   netstat -ano | findstr :27017
   ```
2. Stop the process or use different port
3. **OR** use MongoDB Atlas

---

## 📋 Quick Checklist

Before running backend, verify:

- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` is set in `.env`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] MongoDB is running (local) OR Atlas connection is correct
- [ ] Ran `node check-mongodb.js` and got ✅ success

---

## 🎯 Recommended Solution

**For quickest setup: Use MongoDB Atlas**

1. Takes 5 minutes to set up
2. No installation needed
3. Free tier available
4. Works immediately
5. Accessible from anywhere

See detailed instructions in [MONGODB_SETUP.md](./MONGODB_SETUP.md)

---

## 🆘 Still Stuck?

1. Run diagnostic: `node check-mongodb.js`
2. Check [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed guide
3. Check [QUICK_FIX.md](./QUICK_FIX.md) for quick solutions
4. Verify your `.env` file is correct

**Most common fix:** Use MongoDB Atlas instead of local MongoDB! 🚀

