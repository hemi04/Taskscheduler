# 📚 How TaskFlow Code Works - Complete Explanation

This document explains how every part of the TaskFlow application works.

---

## 🏗️ Architecture Overview

```
┌─────────────┐         HTTP Requests         ┌─────────────┐
│   Browser   │ ────────────────────────────> │   Frontend  │
│  (React)    │ <──────────────────────────── │   (Vite)    │
└─────────────┘         JSON Responses        └─────────────┘
                                                      │
                                                      │ API Calls
                                                      │ (Axios)
                                                      ▼
                                              ┌─────────────┐
                                              │   Backend   │
                                              │  (Express)  │
                                              └─────────────┘
                                                      │
                        ┌────────────────────────────┼────────────────────────────┐
                        │                            │                            │
                        ▼                            ▼                            ▼
                  ┌──────────┐                ┌──────────┐                ┌──────────┐
                  │   JWT    │                │ Mongoose │                │  Routes  │
                  │  Auth    │                │   ODM    │                │          │
                  └──────────┘                └──────────┘                └──────────┘
                        │                            │                            │
                        │                            ▼                            │
                        │                    ┌──────────┐                        │
                        │                    │ MongoDB  │                        │
                        │                    │ Database │                        │
                        │                    └──────────┘                        │
                        │                                                          │
                        └──────────────────────────────────────────────────────────┘
```

---

## 🔵 BACKEND ARCHITECTURE

### 1. Entry Point: `server.js`

**What it does:**
- Starts the Express server
- Loads environment variables from `.env`
- Connects to MongoDB database
- Sets up middleware (CORS, JSON parsing)
- Registers all API routes
- Handles errors

**Code Flow:**
```javascript
1. Load .env file → Get MONGODB_URI, JWT_SECRET, PORT
2. Connect to MongoDB → Wait for connection
3. Create Express app
4. Add middleware:
   - CORS (allows frontend to call API)
   - express.json() (parses JSON request bodies)
5. Register routes:
   - /api/auth → Authentication routes
   - /api/user → User profile routes
   - /api/tasks → Task CRUD routes
6. Start listening on port 5000
```

**Key Code:**
```javascript
// Load environment variables
dotenv.config();

// Connect to database (async)
connectDB();

// Create Express app
const app = express();

// Middleware - runs on every request
app.use(cors());              // Allow frontend requests
app.use(express.json());      // Parse JSON bodies

// Routes - handle specific URLs
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(5000);
```

---

### 2. Database Connection: `config/database.js`

**What it does:**
- Connects to MongoDB using Mongoose
- Retries connection if it fails
- Shows helpful error messages

**How it works:**
```javascript
1. Get MONGODB_URI from environment
2. Try to connect (with 5 second timeout)
3. If fails → Retry up to 5 times (5 seconds apart)
4. If succeeds → Log success message
5. Set up event listeners for disconnections
```

**Key Code:**
```javascript
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      // Connect to MongoDB
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected!');
      return; // Success!
    } catch (error) {
      // Wait 5 seconds and retry
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};
```

---

### 3. Database Models

#### `models/User.js` - User Schema

**What it stores:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password_here",  // Never stored as plain text!
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

**How password hashing works:**
```javascript
// Before saving user to database:
userSchema.pre('save', async function() {
  // Only hash if password is new/modified
  if (!this.isModified('password')) return;
  
  // Generate salt (random string)
  const salt = await bcrypt.genSalt(10);
  
  // Hash password: password + salt → hashed_password
  this.password = await bcrypt.hash(this.password, salt);
});

// When user logs in:
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Compare: enteredPassword vs stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};
```

**Why hash passwords?**
- If database is hacked, passwords are unreadable
- Even admins can't see user passwords
- Industry standard security practice

---

#### `models/Task.js` - Task Schema

**What it stores:**
```javascript
{
  title: "Complete project",
  description: "Finish TaskFlow",
  status: "pending",  // or "completed"
  user: ObjectId("507f1f77bcf86cd799439011"),  // Links to User
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

**Key features:**
- `user` field links task to the user who created it
- `status` can only be "pending" or "completed"
- Indexed on `user` and `status` for faster queries

---

### 4. Authentication Middleware: `middleware/auth.js`

**What it does:**
- Protects routes (only logged-in users can access)
- Verifies JWT tokens
- Attaches user info to request

**How JWT works:**
```
1. User logs in → Backend creates JWT token
   Token = Encrypted(userId + expiration)
   
2. Frontend stores token in localStorage
   
3. Frontend sends token in every request:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
4. Middleware verifies token:
   - Decrypts token
   - Checks if expired
   - Gets userId from token
   - Finds user in database
   - Attaches user to request
   
5. If valid → Request continues
   If invalid → Returns 401 Unauthorized
```

**Code Flow:**
```javascript
const auth = async (req, res, next) => {
  // 1. Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // 2. Verify token (decrypt and check)
  const decoded = jwt.verify(token, JWT_SECRET);
  
  // 3. Find user in database
  const user = await User.findById(decoded.userId);
  
  // 4. Attach user to request
  req.user = user;
  
  // 5. Continue to next middleware/route
  next();
};
```

---

### 5. Controllers - Business Logic

#### `controllers/authController.js`

**Register Flow:**
```javascript
POST /api/auth/register
{
  name: "John",
  email: "john@example.com",
  password: "password123"
}

→ Validate input
→ Check if email already exists
→ Hash password (bcrypt)
→ Create user in database
→ Generate JWT token
→ Return token + user info
```

**Login Flow:**
```javascript
POST /api/auth/login
{
  email: "john@example.com",
  password: "password123"
}

→ Find user by email
→ Compare password (bcrypt.compare)
→ If match → Generate JWT token
→ Return token + user info
```

**JWT Token Generation:**
```javascript
const generateToken = (userId) => {
  return jwt.sign(
    { userId },                    // Payload (data in token)
    process.env.JWT_SECRET,         // Secret key
    { expiresIn: '30d' }            // Expires in 30 days
  );
};
```

---

#### `controllers/taskController.js`

**Create Task:**
```javascript
POST /api/tasks
Authorization: Bearer <token>
{
  title: "New task",
  description: "Task description",
  status: "pending"
}

→ Verify token (auth middleware)
→ Get user from req.user (from middleware)
→ Create task with user._id
→ Save to database
→ Return created task
```

**Get Tasks (with filters):**
```javascript
GET /api/tasks?status=pending&search=project
Authorization: Bearer <token>

→ Verify token
→ Get user from req.user
→ Build query:
  - user: req.user._id (only user's tasks)
  - status: "pending" (if filter provided)
  - $or: [title matches search, description matches search]
→ Find tasks matching query
→ Return tasks
```

**Update Task:**
```javascript
PUT /api/tasks/:id
Authorization: Bearer <token>
{
  title: "Updated title",
  status: "completed"
}

→ Verify token
→ Find task by ID AND verify user owns it
→ Update fields
→ Save to database
→ Return updated task
```

**Delete Task:**
```javascript
DELETE /api/tasks/:id
Authorization: Bearer <token>

→ Verify token
→ Find task by ID AND verify user owns it
→ Delete from database
→ Return success message
```

---

### 6. Routes - URL Mapping

**Route Structure:**
```javascript
// authRoutes.js
POST   /api/auth/register  → authController.register
POST   /api/auth/login      → authController.login

// userRoutes.js
GET    /api/user/profile    → userController.getProfile
       (protected by auth middleware)

// taskRoutes.js
POST   /api/tasks           → taskController.createTask
GET    /api/tasks           → taskController.getTasks
PUT    /api/tasks/:id       → taskController.updateTask
DELETE /api/tasks/:id       → taskController.deleteTask
       (all protected by auth middleware)
```

**How routes work:**
```javascript
// Example: taskRoutes.js
router.post('/', auth, createTask);
//        │    │    │
//        │    │    └─ Controller function
//        │    └────── Middleware (runs before controller)
//        └─────────── URL path

// When request comes in:
1. Check URL matches '/'
2. Run auth middleware (verify token)
3. If auth passes → Run createTask controller
4. If auth fails → Return 401 error
```

---

## 🟢 FRONTEND ARCHITECTURE

### 1. Entry Point: `main.jsx`

**What it does:**
- Renders React app into HTML
- Sets up React Router

**Code:**
```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 2. App Component: `App.jsx`

**What it does:**
- Sets up routing
- Defines which component shows for each URL

**Route Structure:**
```javascript
/login     → Login component (public)
/register  → Register component (public)
/dashboard → Dashboard component (protected)
/          → Redirects to /dashboard
```

**Protected Route:**
```javascript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

// ProtectedRoute checks:
// - Is token in localStorage?
// - If yes → Show Dashboard
// - If no → Redirect to /login
```

---

### 3. API Service: `services/api.js`

**What it does:**
- Centralized API calls
- Automatically adds JWT token to requests
- Handles errors (401 → logout)

**Axios Interceptors:**

**Request Interceptor:**
```javascript
// Before every API request:
api.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Add to request header
  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});
```

**Response Interceptor:**
```javascript
// After every API response:
api.interceptors.response.use(
  (response) => response,  // Success → return response
  (error) => {
    // If 401 Unauthorized:
    if (error.response?.status === 401) {
      // Remove token
      localStorage.removeItem('token');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**API Functions:**
```javascript
// Example: Login
authAPI.login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  // POST http://localhost:5000/api/auth/login
  // Body: { email, password }
  // Headers: { Authorization: Bearer <token> }
  return response.data;
};
```

---

### 4. Pages

#### `pages/Login.jsx`

**Flow:**
```javascript
1. User enters email + password
2. Clicks "Sign In"
3. handleSubmit runs:
   - Call authAPI.login({ email, password })
   - If success:
     * Save token to localStorage
     * Save user to localStorage
     * Redirect to /dashboard
   - If error:
     * Show error message
```

**State Management:**
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

// When user types:
onChange={(e) => setFormData({
  ...formData,
  [e.target.name]: e.target.value
})}
```

---

#### `pages/Dashboard.jsx`

**What it does:**
- Shows user profile
- Lists all tasks
- Allows CRUD operations on tasks
- Search and filter tasks

**Data Flow:**
```javascript
1. Component mounts
   ↓
2. useEffect runs:
   - fetchProfile() → Get user info
   - fetchTasks() → Get all tasks
   ↓
3. Display data:
   - Show user name/email
   - Show task list
   ↓
4. User interacts:
   - Creates task → Call taskAPI.createTask()
   - Updates task → Call taskAPI.updateTask()
   - Deletes task → Call taskAPI.deleteTask()
   - Searches → Update search state → Refetch tasks
   ↓
5. Re-render with new data
```

**Task CRUD Example:**
```javascript
// Create Task
const handleTaskSubmit = async (e) => {
  e.preventDefault();
  await taskAPI.createTask({
    title: taskForm.title,
    description: taskForm.description,
    status: taskForm.status
  });
  fetchTasks(); // Refresh list
};

// Update Task
const handleToggleStatus = async (task) => {
  await taskAPI.updateTask(task._id, {
    status: task.status === 'pending' ? 'completed' : 'pending'
  });
  fetchTasks(); // Refresh list
};

// Delete Task
const handleDeleteTask = async (id) => {
  await taskAPI.deleteTask(id);
  fetchTasks(); // Refresh list
};
```

**Search & Filter:**
```javascript
// When user types in search box:
const [search, setSearch] = useState('');

// When search changes:
useEffect(() => {
  fetchTasks(); // Refetch with new search
}, [search]);

// In fetchTasks:
const response = await taskAPI.getTasks({
  status: filter,  // 'all', 'pending', 'completed'
  search: search   // Search term
});
```

---

## 🔄 Complete Request Flow Example

### User Creates a Task

```
1. USER ACTION
   User fills form and clicks "Create Task"
   ↓
2. FRONTEND (Dashboard.jsx)
   handleTaskSubmit() runs
   ↓
3. API CALL (services/api.js)
   taskAPI.createTask(taskData)
   ↓
4. AXIOS REQUEST
   POST http://localhost:5000/api/tasks
   Headers: { Authorization: Bearer <token> }
   Body: { title, description, status }
   ↓
5. BACKEND (server.js)
   Express receives request
   ↓
6. ROUTE (taskRoutes.js)
   Matches POST /api/tasks
   ↓
7. MIDDLEWARE (auth.js)
   Verifies JWT token
   Extracts user from token
   Attaches user to req.user
   ↓
8. CONTROLLER (taskController.js)
   createTask() runs:
   - Gets user from req.user
   - Creates task with user._id
   - Saves to MongoDB
   ↓
9. DATABASE (MongoDB)
   Task document saved:
   {
     title: "...",
     user: ObjectId("..."),
     ...
   }
   ↓
10. RESPONSE
    Backend returns: { message, task }
    ↓
11. FRONTEND
    Receives response
    Updates UI (shows new task)
    Refreshes task list
```

---

## 🔐 Security Flow

### How Authentication Works

```
REGISTRATION:
1. User submits form → Frontend sends to /api/auth/register
2. Backend hashes password → Saves user to DB
3. Backend generates JWT token → Returns to frontend
4. Frontend saves token to localStorage

LOGIN:
1. User submits credentials → Frontend sends to /api/auth/login
2. Backend finds user → Compares password (bcrypt)
3. If match → Generate JWT token → Return to frontend
4. Frontend saves token to localStorage

PROTECTED REQUEST:
1. Frontend makes API call → Axios interceptor adds token to header
2. Backend receives request → auth middleware verifies token
3. If valid → Extract userId → Find user → Attach to req.user
4. Controller uses req.user → Process request
5. If invalid → Return 401 → Frontend redirects to login
```

---

## 📊 Data Flow Diagram

```
┌──────────────┐
│   Browser    │
│  (React UI)  │
└──────┬───────┘
       │
       │ User Action
       │ (click, type, submit)
       ▼
┌──────────────┐
│   Component  │
│  (useState)  │
└──────┬───────┘
       │
       │ API Call
       │ (taskAPI.createTask)
       ▼
┌──────────────┐
│  Axios API    │
│  (api.js)     │
└──────┬───────┘
       │
       │ HTTP Request
       │ + JWT Token
       ▼
┌──────────────┐
│   Express    │
│  (server.js) │
└──────┬───────┘
       │
       │ Route Match
       ▼
┌──────────────┐
│   Middleware │
│   (auth.js)  │
└──────┬───────┘
       │
       │ Verify Token
       │ Attach User
       ▼
┌──────────────┐
│  Controller   │
│ (taskController)│
└──────┬───────┘
       │
       │ Database Operation
       ▼
┌──────────────┐
│   Mongoose    │
│   (ODM)      │
└──────┬───────┘
       │
       │ Query/Update
       ▼
┌──────────────┐
│   MongoDB    │
│  (Database)  │
└──────────────┘
```

---

## 🎯 Key Concepts Explained

### 1. **JWT (JSON Web Token)**
- Encrypted string containing user ID
- Sent with every request
- Backend verifies it to know who's making the request
- Expires after 30 days

### 2. **Middleware**
- Functions that run before controllers
- `auth` middleware: Verifies user is logged in
- `express.json()`: Parses JSON request bodies
- `cors()`: Allows frontend to call backend

### 3. **Mongoose**
- Object Document Mapper (ODM)
- Converts JavaScript objects ↔ MongoDB documents
- Provides schema validation
- Handles relationships between documents

### 4. **React Hooks**
- `useState`: Store component data
- `useEffect`: Run code on mount/update
- `useNavigate`: Programmatic navigation

### 5. **Protected Routes**
- Check if user is logged in
- If yes → Show page
- If no → Redirect to login

---

## 🚀 Summary

**Backend:**
- Express server handles HTTP requests
- Mongoose connects to MongoDB
- JWT middleware protects routes
- Controllers contain business logic
- Models define data structure

**Frontend:**
- React components render UI
- Axios makes API calls
- localStorage stores JWT token
- React Router handles navigation
- Protected routes check authentication

**Security:**
- Passwords hashed with bcrypt
- JWT tokens for authentication
- Middleware verifies every request
- Users can only access their own tasks

This architecture is **scalable**, **secure**, and follows **industry best practices**! 🎉

