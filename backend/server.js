const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
const envResult = dotenv.config();

// Check if .env file exists
if (envResult.error) {
  console.error('\n❌ Error: .env file not found!');
  console.error('💡 Please create a .env file in the backend folder.');
  console.error('   You can copy env.example.txt to .env:');
  console.error('   Windows: copy env.example.txt .env');
  console.error('   Mac/Linux: cp env.example.txt .env\n');
  console.error('📖 See MONGODB_SETUP.md for detailed instructions.\n');
  // Don't exit - allow server to start but warn user
}

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error('\n❌ Error: MONGODB_URI is not set in .env file');
  console.error('💡 Please add MONGODB_URI to your .env file:');
  console.error('   For local MongoDB: MONGODB_URI=mongodb://localhost:27017/taskflow');
  console.error('   For MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow');
  console.error('\n📖 See MONGODB_SETUP.md for detailed setup instructions.\n');
  // Don't exit - allow server to start but warn user
}

if (!process.env.JWT_SECRET) {
  console.error('\n❌ Error: JWT_SECRET is not set in .env file');
  console.error('💡 Please add JWT_SECRET to your .env file:');
  console.error('   JWT_SECRET=your_super_secret_jwt_key_here\n');
  // Don't exit - allow server to start but warn user
}

// Connect to database (with retry logic)
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.error('⚠️  Skipping database connection - MONGODB_URI not set\n');
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


