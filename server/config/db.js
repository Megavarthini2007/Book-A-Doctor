const mongoose = require('mongoose');
const dns = require('dns');

// Optimize DNS lookup for MongoDB Atlas SRV connections
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore DNS fallback errors
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (
      error.message.includes('Could not connect to any servers') ||
      error.name === 'MongooseServerSelectionError' ||
      error.message.includes('whitelisted')
    ) {
      console.warn(`💡 Atlas Tip: Please verify that your current IP address (or 0.0.0.0/0) is allowed in your MongoDB Atlas Network Access control panel: https://cloud.mongodb.com`);
    }
  }
};

module.exports = connectDB;
