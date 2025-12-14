/**
 * Helper script to create .env file from env.example.txt
 * Run with: node create-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envExamplePath = path.join(__dirname, 'env.example.txt');
const envPath = path.join(__dirname, '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  rl.question('Do you want to overwrite it? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      createEnvFile();
    } else {
      console.log('❌ Cancelled. Existing .env file preserved.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n📝 Creating .env file...\n');
  
  // Read example file
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ env.example.txt not found!');
    rl.close();
    return;
  }

  const exampleContent = fs.readFileSync(envExamplePath, 'utf8');
  
  // Ask for MongoDB URI
  console.log('Please provide your MongoDB connection details:');
  console.log('1. For local MongoDB: mongodb://localhost:27017/taskflow');
  console.log('2. For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskflow\n');
  
  rl.question('MongoDB URI: ', (mongoURI) => {
    if (!mongoURI.trim()) {
      mongoURI = 'mongodb://localhost:27017/taskflow';
      console.log(`Using default: ${mongoURI}`);
    }
    
    rl.question('JWT Secret (press Enter for default): ', (jwtSecret) => {
      if (!jwtSecret.trim()) {
        jwtSecret = 'your_super_secret_jwt_key_change_this_in_production_' + Date.now();
        console.log('Generated random JWT secret');
      }
      
      // Create .env content
      const envContent = `PORT=5000
MONGODB_URI=${mongoURI.trim()}
JWT_SECRET=${jwtSecret.trim()}
NODE_ENV=development
`;

      // Write .env file
      fs.writeFileSync(envPath, envContent);
      
      console.log('\n✅ .env file created successfully!');
      console.log(`📁 Location: ${envPath}\n`);
      console.log('⚠️  Remember to:');
      console.log('   • Keep your .env file secure (never commit it to git)');
      console.log('   • Change JWT_SECRET to a strong random string in production');
      console.log('   • Verify MongoDB is running before starting the server\n');
      
      rl.close();
    });
  });
}

