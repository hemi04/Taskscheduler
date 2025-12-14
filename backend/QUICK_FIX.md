# 🔧 Quick Fix for MongoDB Connection Error

## Current Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
```

## ✅ Solution: Create .env File

You're missing the `.env` file! Here are **3 easy ways** to create it:

---

### Method 1: Use Setup Script (Easiest) ⭐

**Windows PowerShell:**
```powershell
cd backend
.\setup-env.ps1
```

**Windows CMD:**
```cmd
cd backend
setup-env.bat
```

**Node.js:**
```powershell
cd backend
node create-env.js
```

The script will ask you for:
- MongoDB URI (or use default)
- JWT Secret (or auto-generate)

---

### Method 2: Manual Copy (Quick)

**Windows PowerShell:**
```powershell
cd backend
Copy-Item env.example.txt .env
```

**Windows CMD:**
```cmd
cd backend
copy env.example.txt .env
```

**Mac/Linux:**
```bash
cd backend
cp env.example.txt .env
```

Then **edit `.env`** file and update:
```env
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_secret_key_here
```

---

### Method 3: Create Manually

1. Create a new file named `.env` in the `backend` folder
2. Copy this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=my_super_secret_jwt_key_12345
NODE_ENV=development
```

3. **Update `MONGODB_URI`**:
   - **Local MongoDB**: `mongodb://localhost:27017/taskflow`
   - **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/taskflow`

---

## 🚀 After Creating .env File

1. **Restart your backend server**:
   ```powershell
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **You should see**:
   ```
   ✅ MongoDB Connected Successfully!
      Host: localhost:27017
      Database: taskflow
   ```

---

## ⚠️ Still Getting Error?

If you still see connection errors after creating `.env`:

### For Local MongoDB:
1. **Check if MongoDB is running**:
   ```powershell
   # Test connection
   mongosh
   ```
   If this fails, MongoDB is not installed/running.

2. **Start MongoDB service**:
   - Press `Win + R`
   - Type `services.msc`
   - Find "MongoDB" service
   - Right-click → Start

### For MongoDB Atlas:
1. **Verify connection string** in `.env`
2. **Check IP whitelist** in Atlas dashboard
3. **Verify username/password** are correct

---

## 📖 Need More Help?

- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed MongoDB setup
- See [README.md](../README.md) for full documentation

---

## ✅ Quick Checklist

- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` is set correctly
- [ ] `JWT_SECRET` is set
- [ ] MongoDB is running (local) OR Atlas connection string is correct
- [ ] Backend server restarted after creating `.env`

**Once all checked, your server should connect! 🎉**

