import mongoose, { Connection } from 'mongoose';

// Define a global variable to store the cached connection
declare global {
  var mongooseCache: {
    conn: Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize global cache if not already defined
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  // Return cached connection if it exists
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  // If no cached promise, create a new one
  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'Maharaniz', // Ensure you're using the correct database
    }).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully!');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err);
      throw err;
    });
  }

  // Wait for the connection to be established and cache it
  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
};

