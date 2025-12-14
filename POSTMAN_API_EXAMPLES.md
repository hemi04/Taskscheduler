# TaskFlow API - Postman Collection Examples

This document provides ready-to-use API examples for testing the TaskFlow backend API with Postman or any HTTP client.

## Base URL
```
http://localhost:5000/api
```

---

## 1. Register User

**Request:**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...",
  "user": {
    "id": "671234567890123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "User already exists with this email"
}
```

---

## 2. Login User

**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...",
  "user": {
    "id": "671234567890123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

**Note:** Copy the `token` from the response. You'll need it for authenticated requests.

---

## 3. Get User Profile

**Request:**
```http
GET http://localhost:5000/api/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": "671234567890123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "No token, authorization denied"
}
```

---

## 4. Create Task

**Request:**
```http
POST http://localhost:5000/api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "status": "pending"
}
```

**Expected Response (201 Created):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "671234567890124",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "status": "pending",
    "user": "671234567890123",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Please provide a task title"
}
```

---

## 5. Get All Tasks

**Request (All Tasks):**
```http
GET http://localhost:5000/api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Request (Filter by Status):**
```http
GET http://localhost:5000/api/tasks?status=pending
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Request (Search):**
```http
GET http://localhost:5000/api/tasks?search=documentation
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Request (Filter + Search):**
```http
GET http://localhost:5000/api/tasks?status=pending&search=project
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Expected Response (200 OK):**
```json
{
  "count": 2,
  "tasks": [
    {
      "_id": "671234567890124",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API documentation",
      "status": "pending",
      "user": "671234567890123",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    },
    {
      "_id": "671234567890125",
      "title": "Review code",
      "description": "Review all code for bugs",
      "status": "completed",
      "user": "671234567890123",
      "createdAt": "2024-01-01T09:00:00.000Z",
      "updatedAt": "2024-01-01T09:30:00.000Z"
    }
  ]
}
```

---

## 6. Update Task

**Request:**
```http
PUT http://localhost:5000/api/tasks/671234567890124
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed"
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "671234567890124",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "completed",
    "user": "671234567890123",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T11:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Task not found"
}
```

**Note:** You can update individual fields. Only include the fields you want to update.

---

## 7. Delete Task

**Request:**
```http
DELETE http://localhost:5000/api/tasks/671234567890124
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEyMzQ1Njc4OTAxMjMiLCJpYXQiOjE3MTIzNDU2NzgsImV4cCI6MTcxNDkzNzY3OH0.abc123...
```

**Expected Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Task not found"
}
```

---

## 8. Health Check

**Request:**
```http
GET http://localhost:5000/api/health
```

**Expected Response (200 OK):**
```json
{
  "message": "Server is running"
}
```

---

## Postman Setup Tips

### 1. Environment Variables

Create a Postman environment with:
- `base_url`: `http://localhost:5000/api`
- `token`: (will be set after login)

### 2. Pre-request Script (Auto-set Token)

For authenticated requests, add this pre-request script:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

### 3. Test Script (Auto-save Token)

For login/register requests, add this test script:
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set('token', jsonData.token);
    }
}
```

### 4. Collection Structure

Organize your collection:
```
TaskFlow API
├── Authentication
│   ├── Register
│   └── Login
├── User
│   └── Get Profile
└── Tasks
    ├── Create Task
    ├── Get All Tasks
    ├── Update Task
    └── Delete Task
```

---

## Testing Workflow

1. **Register a new user** → Save the token
2. **Login** → Verify token works
3. **Get profile** → Verify authentication
4. **Create multiple tasks** → Test with different statuses
5. **Get all tasks** → Verify all tasks are returned
6. **Filter tasks** → Test status filter
7. **Search tasks** → Test search functionality
8. **Update a task** → Verify update works
9. **Delete a task** → Verify deletion works
10. **Test error cases** → Invalid token, missing fields, etc.

---

## Common Error Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

**Happy Testing! 🚀**

