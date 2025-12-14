# Quick Start Guide

Get TaskFlow up and running in 5 minutes!

## Prerequisites Check

- ✅ Node.js installed (v16+)
- ✅ MongoDB running (local or Atlas)

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example.txt)
# Windows: copy env.example.txt .env
# Mac/Linux: cp env.example.txt .env

# Edit .env and set your MongoDB URI and JWT_SECRET
# For local MongoDB: mongodb://localhost:27017/taskflow
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskflow

# Start the server
npm run dev
```

Backend should now be running on `http://localhost:5000` ✅

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend should now be running on `http://localhost:3000` ✅

### 3. Open in Browser

Open `http://localhost:3000` in your browser.

### 4. Test the Application

1. **Register**: Click "Sign up" and create a new account
2. **Login**: Use your credentials to log in
3. **Dashboard**: You'll see your profile and can start creating tasks
4. **Create Task**: Click "+ Add Task" to create your first task
5. **Manage Tasks**: Edit, complete, or delete tasks as needed

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your MONGODB_URI in backend/.env
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically use the next available port

### CORS Errors
- Ensure backend is running on port 5000
- Check that frontend API URL matches backend URL

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [POSTMAN_API_EXAMPLES.md](./POSTMAN_API_EXAMPLES.md) for API testing
- Explore the codebase and customize as needed

Happy coding! 🚀

