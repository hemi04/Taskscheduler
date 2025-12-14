/**
 * MongoDB Connection Checker
 * Run with: node check-mongodb.js
 * 
 * This script helps diagnose MongoDB connection issues
 */

const mongoose = require('mongoose');
const { exec } = require('child_process');
const os = require('os');

console.log('\n🔍 MongoDB Connection Diagnostics\n');
console.log('=' .repeat(50));

// Check if .env exists
const dotenv = require('dotenv');
const envResult = dotenv.config();

if (envResult.error) {
  console.error('❌ .env file not found!');
  console.error('💡 Run: Copy-Item env.example.txt .env');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env file!');
  process.exit(1);
}

const mongoURI = process.env.MONGODB_URI;
const displayURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');

console.log(`📍 Connection String: ${displayURI}`);
console.log(`\n🔍 Running diagnostics...\n`);

// Check if it's local MongoDB or Atlas
const isLocal = mongoURI.includes('localhost') || mongoURI.includes('127.0.0.1');
const isAtlas = mongoURI.includes('mongodb+srv://');

if (isLocal) {
  console.log('📌 Detected: Local MongoDB\n');
  checkLocalMongoDB();
} else if (isAtlas) {
  console.log('📌 Detected: MongoDB Atlas\n');
  checkAtlasConnection();
} else {
  console.log('📌 Detected: Custom MongoDB connection\n');
  testConnection();
}

function checkLocalMongoDB() {
  console.log('1️⃣ Checking if MongoDB service is running...\n');
  
  const platform = os.platform();
  
  if (platform === 'win32') {
    // Windows: Check MongoDB service
    exec('sc query MongoDB', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ MongoDB service not found or not running\n');
        console.log('💡 Solutions:');
        console.log('   Option 1: Install MongoDB');
        console.log('     Download: https://www.mongodb.com/try/download/community');
        console.log('     Install and start MongoDB service\n');
        console.log('   Option 2: Use MongoDB Atlas (Cloud - Free)');
        console.log('     Sign up: https://www.mongodb.com/cloud/atlas/register');
        console.log('     See MONGODB_SETUP.md for instructions\n');
        
        // Try to test connection anyway
        testConnection();
      } else {
        if (stdout.includes('RUNNING')) {
          console.log('✅ MongoDB service is RUNNING\n');
        } else {
          console.log('⚠️  MongoDB service exists but is NOT running\n');
          console.log('💡 Start MongoDB service:');
          console.log('   1. Press Win + R');
          console.log('   2. Type: services.msc');
          console.log('   3. Find "MongoDB" service');
          console.log('   4. Right-click → Start\n');
        }
        testConnection();
      }
    });
  } else {
    // Linux/Mac: Check if mongod process is running
    exec('pgrep mongod', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ MongoDB process not found\n');
        console.log('💡 Start MongoDB:');
        console.log('   Linux: sudo systemctl start mongod');
        console.log('   Mac: brew services start mongodb-community\n');
        testConnection();
      } else {
        console.log('✅ MongoDB process is running (PID: ' + stdout.trim() + ')\n');
        testConnection();
      }
    });
  }
}

function checkAtlasConnection() {
  console.log('1️⃣ Testing MongoDB Atlas connection...\n');
  console.log('💡 If connection fails, check:');
  console.log('   • Your IP is whitelisted in Atlas dashboard');
  console.log('   • Username and password are correct');
  console.log('   • Internet connection is working\n');
  testConnection();
}

function testConnection() {
  console.log('2️⃣ Testing connection to MongoDB...\n');
  
  mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => {
      console.log('✅ SUCCESS! MongoDB connection works!\n');
      console.log(`   Host: ${mongoose.connection.host}`);
      console.log(`   Database: ${mongoose.connection.name}`);
      console.log(`   Ready State: Connected\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.log('❌ Connection FAILED\n');
      console.log(`   Error: ${error.message}\n`);
      
      if (error.message.includes('ECONNREFUSED')) {
        console.log('🔴 Problem: MongoDB is not accessible\n');
        console.log('💡 Solutions:\n');
        
        if (isLocal) {
          console.log('   For Local MongoDB:');
          console.log('   1. Install MongoDB: https://www.mongodb.com/try/download/community');
          console.log('   2. Start MongoDB service');
          console.log('   3. Verify: mongosh (should connect)\n');
          console.log('   OR use MongoDB Atlas (easier):');
          console.log('   1. Sign up: https://www.mongodb.com/cloud/atlas/register');
          console.log('   2. Create free cluster');
          console.log('   3. Update MONGODB_URI in .env file\n');
        } else {
          console.log('   For MongoDB Atlas:');
          console.log('   1. Check IP whitelist in Atlas dashboard');
          console.log('   2. Verify connection string is correct');
          console.log('   3. Check username/password\n');
        }
      } else if (error.message.includes('authentication failed')) {
        console.log('🔴 Problem: Authentication failed\n');
        console.log('💡 Check:');
        console.log('   • Username and password in connection string');
        console.log('   • Database user has proper permissions\n');
      } else if (error.message.includes('timeout')) {
        console.log('🔴 Problem: Connection timeout\n');
        console.log('💡 Check:');
        console.log('   • Internet connection');
        console.log('   • Firewall settings');
        console.log('   • IP whitelist (for Atlas)\n');
      } else {
        console.log('💡 See MONGODB_SETUP.md for detailed setup instructions\n');
      }
      
      process.exit(1);
    });
}

