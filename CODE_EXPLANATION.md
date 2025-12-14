# 📖 Quick Code Explanation

## 🎯 What Each File Does

### Backend Files

| File | Purpose | Key Function |
|------|---------|--------------|
| `server.js` | **Entry point** | Starts Express server, connects to DB, sets up routes |
| `config/database.js` | **DB connection** | Connects to MongoDB with retry logic |
| `models/User.js` | **User schema** | Defines user structure, hashes passwords |
| `models/Task.js` | **Task schema** | Defines task structure, links to user |
| `middleware/auth.js` | **Security** | Verifies JWT tokens, protects routes |
| `controllers/authController.js` | **Auth logic** | Handles register/login, generates tokens |
| `controllers/userController.js` | **User logic** | Gets user profile |
| `controllers/taskController.js` | **Task logic** | CRUD operations for tasks |
| `routes/authRoutes.js` | **Auth URLs** | Maps `/api/auth/*` to controllers |
| `routes/userRoutes.js` | **User URLs** | Maps `/api/user/*` to controllers |
| `routes/taskRoutes.js` | **Task URLs** | Maps `/api/tasks/*` to controllers |

### Frontend Files

| File | Purpose | Key Function |
|------|---------|--------------|
| `main.jsx` | **Entry point** | Renders React app |
| `App.jsx` | **Router** | Sets up routes (login, register, dashboard) |
| `pages/Login.jsx` | **Login page** | User login form |
| `pages/Register.jsx` | **Register page** | User registration form |
| `pages/Dashboard.jsx` | **Main page** | Shows tasks, user profile, CRUD operations |
| `services/api.js` | **API layer** | All API calls, adds JWT token automatically |
| `routes/ProtectedRoute.jsx` | **Security** | Checks if user is logged in |

---

## 🔄 How Data Flows

### Example: User Creates a Task

```
1. User clicks "Create Task" button
   ↓
2. Dashboard.jsx → handleTaskSubmit()
   ↓
3. services/api.js → taskAPI.createTask(data)
   ↓
4. Axios sends POST request to backend
   Headers: { Authorization: Bearer <token> }
   ↓
5. server.js receives request
   ↓
6. routes/taskRoutes.js → Matches POST /api/tasks
   ↓
7. middleware/auth.js → Verifies token, gets user
   ↓
8. controllers/taskController.js → createTask()
   - Gets user from req.user
   - Creates task with user._id
   - Saves to MongoDB
   ↓
9. MongoDB stores task document
   ↓
10. Response sent back to frontend
    ↓
11. Dashboard.jsx → Updates UI, shows new task
```

---

## 🔐 Security Flow

### How Authentication Works

```
REGISTER:
User → Frontend → POST /api/auth/register
→ Backend hashes password → Saves user → Returns JWT token
→ Frontend saves token to localStorage

LOGIN:
User → Frontend → POST /api/auth/login
→ Backend verifies password → Returns JWT token
→ Frontend saves token to localStorage

PROTECTED REQUEST:
Frontend → Adds token to header → Backend
→ Middleware verifies token → If valid, continue
→ Controller processes request → Returns data
```

---

## 📦 Key Packages Explained

| Package | What It Does |
|---------|--------------|
| **express** | Web server framework - handles HTTP requests |
| **mongoose** | MongoDB ODM - connects to database, defines schemas |
| **jsonwebtoken** | Creates/verifies JWT tokens for authentication |
| **bcryptjs** | Hashes passwords - never store plain text passwords |
| **cors** | Allows frontend (different port) to call backend |
| **dotenv** | Loads environment variables from .env file |
| **axios** | Makes HTTP requests from frontend to backend |
| **react-router-dom** | Handles routing/navigation in React app |

---

## 🎨 Frontend State Management

### How React Components Work

```javascript
// Component has state (data)
const [tasks, setTasks] = useState([]);

// When component loads
useEffect(() => {
  fetchTasks(); // Get data from API
}, []);

// When user does something
const handleCreate = async () => {
  await taskAPI.createTask(data);
  fetchTasks(); // Refresh data
};

// Component renders UI
return (
  <div>
    {tasks.map(task => <TaskCard key={task._id} task={task} />)}
  </div>
);
```

---

## 🗄️ Database Structure

### User Collection
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$hashed...", // Never plain text!
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId("..."),
  title: "Complete project",
  description: "Finish TaskFlow",
  status: "pending", // or "completed"
  user: ObjectId("..."), // Links to User
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔑 Key Concepts

### 1. **Middleware**
Functions that run before controllers:
- `auth` - Checks if user is logged in
- `express.json()` - Parses JSON request bodies
- `cors()` - Allows cross-origin requests

### 2. **JWT Token**
Encrypted string containing user ID:
- Created when user logs in
- Sent with every request
- Backend verifies it to know who's making the request

### 3. **Password Hashing**
Passwords are never stored as plain text:
- `bcrypt` hashes password before saving
- When user logs in, compares hashed password
- Even if database is hacked, passwords are safe

### 4. **Protected Routes**
Routes that require authentication:
- Frontend: Checks if token exists
- Backend: Middleware verifies token
- If no token/invalid → Redirect to login

---

## 🚀 Quick Reference

### Backend API Endpoints

```
POST   /api/auth/register    - Create account
POST   /api/auth/login       - Login
GET    /api/user/profile     - Get user info (protected)
POST   /api/tasks            - Create task (protected)
GET    /api/tasks            - Get all tasks (protected)
PUT    /api/tasks/:id        - Update task (protected)
DELETE /api/tasks/:id        - Delete task (protected)
```

### Frontend Routes

```
/login     - Login page
/register  - Register page
/dashboard - Main app (protected)
/          - Redirects to /dashboard
```

---

## 💡 Common Patterns

### 1. **CRUD Operations**
```javascript
Create: POST   /api/tasks
Read:   GET    /api/tasks
Update: PUT    /api/tasks/:id
Delete: DELETE /api/tasks/:id
```

### 2. **Error Handling**
```javascript
try {
  await api.call();
} catch (error) {
  setError(error.message);
}
```

### 3. **Loading States**
```javascript
const [loading, setLoading] = useState(false);

setLoading(true);
await api.call();
setLoading(false);
```

---

**For detailed explanation, see [HOW_IT_WORKS.md](./HOW_IT_WORKS.md)**

