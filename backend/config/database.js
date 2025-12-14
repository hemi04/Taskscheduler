const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 * Includes retry logic for better reliability
 */
const connectDB = async (retries = 5, delay = 5000) => {
  const mongoURI = process.env.MONGODB_URI;
  
  // Show connection attempt info (hide password)
  const displayURI = mongoURI 
    ? mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@') // Hide password
    : 'NOT SET';
  
  console.log(`\n🔌 Attempting to connect to MongoDB...`);
  console.log(`📍 URI: ${displayURI}`);
  
  for (let i = 0; i < retries; i++) {
    try {
      // Set connection options for better error handling
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000,
      });

      console.log(`\n✅ MongoDB Connected Successfully!`);
      console.log(`   Host: ${conn.connection.host}`);
      console.log(`   Database: ${conn.connection.name}`);
      console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}\n`);
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB Disconnected. Attempting to reconnect...');
      });

      return; // Success - exit function
    } catch (error) {
      const attemptNum = i + 1;
      console.error(`\n❌ Connection Attempt ${attemptNum}/${retries} Failed`);
      console.error(`   Error: ${error.message}`);
      
      if (error.message.includes('ECONNREFUSED')) {
        console.error(`\n💡 This means MongoDB is NOT running or NOT accessible.`);
        console.error(`   Common causes:`);
        console.error(`   • MongoDB service is not started`);
        console.error(`   • Wrong connection string in .env file`);
        console.error(`   • Firewall blocking port 27017`);
        console.error(`   • MongoDB Atlas IP not whitelisted\n`);
      } else if (error.message.includes('authentication failed')) {
        console.error(`\n💡 Authentication failed. Check:`);
        console.error(`   • Username and password in connection string`);
        console.error(`   • Database user has proper permissions\n`);
      } else if (error.message.includes('timeout')) {
        console.error(`\n💡 Connection timeout. Check:`);
        console.error(`   • Internet connection (for MongoDB Atlas)`);
        console.error(`   • IP whitelist in MongoDB Atlas`);
        console.error(`   • Firewall settings\n`);
      }

      if (attemptNum < retries) {
        console.log(`🔄 Retrying in ${delay / 1000} seconds...\n`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`\n❌ Failed to connect after ${retries} attempts.`);
        console.error(`\n📖 See MONGODB_SETUP.md for detailed setup instructions.`);
        console.error(`\n⚠️  Server will continue running, but database operations will fail.\n`);
        // Don't exit - let server start but warn user
      }
    }
  }
};

module.exports = connectDB;


