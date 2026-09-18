const mongoose = require('mongoose');

// Defining database connection 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dia14'

// Start up database connection (async function w a try-catch block)
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB'); 
    } catch (error) {
        console.error(`Error connecting to MongoDB`, error.message);
        process.exit(1)
    }
}

module.exports = connectDB;