# How to Run TaskFlow - Step by Step Guide

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** installed (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open PowerShell/CMD and run `node --version`

2. **MongoDB** installed and running
   - Option A: Local MongoDB
     - Download from: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
   - Option B: MongoDB Atlas (Cloud - Free tier available)
     - Sign up at: https://www.mongodb.com/cloud/atlas
     - Create a free cluster

3. **Code Editor** (Optional but recommended)
   - VS Code, WebStorm, etc.

---

## 🚀 Step-by-Step Instructions

### Step 1: Open Two Terminal Windows

You'll need **TWO terminal windows** open:
- **Terminal 1**: For the Backend server
- **Terminal 2**: For the Frontend server

**On Windows:**
- Open PowerShell or Command Prompt
- Or use VS Code's integrated terminal (split into two)

---

### Step 2: Setup Backend (Terminal 1)

#### 2.1 Navigate to Backend Folder

```powershell
cd C:\Users\hemra\Hemraj_D\Taskflow\backend
```

#### 2.2 Install Dependencies

```powershell
npm install
```

This will install all required packages (Express, Mongoose, JWT, etc.)
**Wait for this to complete** - it may take 1-2 minutes.

#### 2.3 Create Environment File

**On Windows PowerShell:**
```powershell
Copy-Item env.example.txt .env
```

**Or on Windows CMD:**
```cmd
copy env.example.txt .env
```

#### 2.4 Edit the .env File

Open `backend\.env` file in a text editor and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=my_super_secret_jwt_key_12345
NODE_ENV=development
```

**Important:**
- If using **local MongoDB**: Keep `mongodb://localhost:27017/taskflow`
- If using **MongoDB Atlas**: Replace with your connection string:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskflow
  ```
- Change `JWT_SECRET` to any random string (keep it secret!)

#### 2.5 Start Backend Server

```powershell
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server running on port 5000
```

✅ **Backend is now running on http://localhost:5000**

**Keep this terminal open!** Don't close it.

---

### Step 3: Setup Frontend (Terminal 2)

#### 3.1 Open a NEW Terminal Window

Open a second terminal/PowerShell window.

#### 3.2 Navigate to Frontend Folder

```powershell
cd C:\Users\hemra\Hemraj_D\Taskflow\frontend
```

#### 3.3 Install Dependencies

```powershell
npm install
```

This will install React, Tailwind CSS, Axios, etc.
**Wait for this to complete** - it may take 2-3 minutes.

#### 3.4 Start Frontend Server

```powershell
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ **Frontend is now running on http://localhost:3000**

**Keep this terminal open too!**

---

### Step 4: Open the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:3000**
3. You should see the **Login page**

---

### Step 5: Test the Application

#### 5.1 Create an Account

1. Click **"Sign up"** link
2. Fill in the form:
   - Name: Your name
   - Email: your.email@example.com
   - Password: (at least 6 characters)
   - Confirm Password: (same as password)
3. Click **"Sign Up"**
4. You'll be automatically logged in and redirected to the Dashboard

#### 5.2 Create Your First Task

1. On the Dashboard, click **"+ Add Task"**
2. Fill in:
   - Title: "My First Task"
   - Description: "This is a test task"
   - Status: Pending
3. Click **"Create Task"**
4. Your task should appear in the list!

#### 5.3 Try Other Features

- ✅ Edit a task
- ✅ Mark task as completed
- ✅ Search for tasks
- ✅ Filter by status (Pending/Completed)
- ✅ Delete a task
- ✅ Logout and login again

---

## 🛑 How to Stop the Servers

When you're done:

1. **Stop Backend**: In Terminal 1, press `Ctrl + C`
2. **Stop Frontend**: In Terminal 2, press `Ctrl + C`

---

## ❌ Troubleshooting

### Problem: "MongoDB connection error"

**Solution:**
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `backend/.env`
- For MongoDB Atlas: Ensure your IP is whitelisted in Atlas dashboard

**Test MongoDB connection:**
```powershell
# If MongoDB is installed locally, test with:
mongosh
# Or
mongo
```

### Problem: "Port 5000 already in use"

**Solution:**
- Change `PORT=5000` to `PORT=5001` in `backend/.env`
- Restart the backend server

### Problem: "Port 3000 already in use"

**Solution:**
- Vite will automatically use the next available port (3001, 3002, etc.)
- Check the terminal output for the actual port number

### Problem: "npm install fails"

**Solution:**
- Make sure Node.js is installed: `node --version`
- Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again
- Check your internet connection

### Problem: "Cannot find module" errors

**Solution:**
- Make sure you ran `npm install` in both `backend` and `frontend` folders
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Problem: "CORS error" in browser console

**Solution:**
- Make sure backend is running on port 5000
- Check that frontend is trying to connect to `http://localhost:5000/api`
- Restart both servers

### Problem: "JWT token errors"

**Solution:**
- Make sure `JWT_SECRET` is set in `backend/.env`
- Try logging out and logging in again
- Clear browser localStorage: Open DevTools (F12) → Application → Local Storage → Clear

---

## 📝 Quick Command Reference

### Backend Commands
```powershell
cd backend
npm install          # First time only
npm run dev          # Start development server
npm start            # Start production server
```

### Frontend Commands
```powershell
cd frontend
npm install          # First time only
npm run dev          # Start development server
npm run build        # Build for production
```

---

## 🎯 Summary

**To run the application:**

1. ✅ Install Node.js and MongoDB
2. ✅ Open 2 terminals
3. ✅ Terminal 1: `cd backend` → `npm install` → `npm run dev`
4. ✅ Terminal 2: `cd frontend` → `npm install` → `npm run dev`
5. ✅ Open browser: http://localhost:3000
6. ✅ Register and start using!

**Both servers must be running at the same time!**

---

## 🆘 Still Having Issues?

1. Check the full [README.md](./README.md) for detailed documentation
2. Verify all prerequisites are installed
3. Check that MongoDB is running
4. Ensure both terminals show no errors
5. Try restarting both servers

**Happy coding! 🚀**


