<<<<<<< HEAD
# Taskscheduler
=======
# TaskFlow – Secure Task Management Dashboard

A production-ready full-stack web application for secure task management with JWT authentication, built with React.js and Node.js.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **User Profile**: View and manage user information
- **Task Management**: Full CRUD operations for tasks
- **Search & Filter**: Search tasks by keyword and filter by status (pending/completed)
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Protected Routes**: Secure dashboard accessible only to authenticated users

## 📋 Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Axios
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
Taskflow/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User profile logic
│   │   └── taskController.js    # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── userRoutes.js        # User routes
│   │   └── taskRoutes.js        # Task routes
│   ├── server.js                # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components (if any)
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   └── Dashboard.jsx    # Main dashboard
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx  # Route protection
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskflow
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

   **Note:** For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
   ```

5. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   **Note:** If not set, the frontend defaults to `http://localhost:5000/api`

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Endpoints

#### Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Task Endpoints

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the TaskFlow project",
  "status": "pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the TaskFlow project",
    "status": "pending",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Tasks
```http
GET /api/tasks?status=pending&search=project
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (`pending` or `completed`)
- `search` (optional): Search in title and description

**Response:**
```json
{
  "count": 2,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the TaskFlow project",
      "status": "pending",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Backend routes protected with JWT middleware
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured for secure cross-origin requests

## 🚀 Scalability Notes for Production

### Backend Optimizations

1. **Database Indexing**: Already implemented on Task model for faster queries
2. **Environment Variables**: Use strong JWT_SECRET in production
3. **Error Handling**: Centralized error handling middleware
4. **Rate Limiting**: Consider adding rate limiting (e.g., express-rate-limit)
5. **Helmet.js**: Add for security headers
6. **Logging**: Implement proper logging (e.g., Winston, Morgan)
7. **Database Connection Pooling**: Mongoose handles this automatically

### Frontend Optimizations

1. **Code Splitting**: Implement React.lazy() for route-based code splitting
2. **Environment Variables**: Use different API URLs for dev/prod
3. **Error Boundaries**: Add React error boundaries for better error handling
4. **Loading States**: Already implemented for better UX
5. **Token Refresh**: Consider implementing token refresh mechanism

### Deployment Considerations

1. **MongoDB**: Use MongoDB Atlas for production database
2. **Environment Variables**: Never commit `.env` files
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS to allow only your frontend domain
5. **Build Optimization**: Use production builds for frontend
6. **PM2**: Use PM2 or similar for Node.js process management
7. **Reverse Proxy**: Use Nginx for serving static files and reverse proxy

### Additional Features to Consider

1. **Email Verification**: Add email verification on registration
2. **Password Reset**: Implement forgot password functionality
3. **Task Categories/Tags**: Add categorization for tasks
4. **Due Dates**: Add due date functionality
5. **Task Priorities**: Add priority levels
6. **File Attachments**: Allow file uploads for tasks
7. **Real-time Updates**: Implement WebSocket for real-time task updates
8. **Pagination**: Add pagination for large task lists
9. **Export/Import**: Allow exporting tasks to CSV/JSON

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with valid data
- [ ] User registration with duplicate email (should fail)
- [ ] User login with correct credentials
- [ ] User login with incorrect credentials (should fail)
- [ ] Access protected routes without token (should redirect)
- [ ] Create, read, update, delete tasks
- [ ] Search and filter tasks
- [ ] Logout functionality

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in `.env` file
   - Verify network connectivity for MongoDB Atlas

2. **JWT Token Errors**
   - Ensure JWT_SECRET is set in `.env`
   - Check token expiration
   - Verify token is being sent in Authorization header

3. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check frontend API URL matches backend URL

4. **Port Already in Use**
   - Change PORT in backend `.env`
   - Update frontend API URL accordingly

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**

>>>>>>> 4a47175 (initial project upload)
