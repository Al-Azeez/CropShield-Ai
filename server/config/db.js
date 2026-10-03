import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cropshield_db';
    // Set short timeout so if mongo is not running locally it gracefully falls back immediately
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.log(`⚠️ MongoDB not reachable locally (${error.message}). Using CROPSHIELD In-Memory Data Store.`);
  }
};

export const getDBStatus = () => isMongoConnected;
