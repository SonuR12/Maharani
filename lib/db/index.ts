import mongoose, { Connection, ConnectOptions } from 'mongoose';

// Define the type for the cached object
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('❌ MONGODB_URI is missing');

  if (!cached.promise) {
    // Define mongoose options with the correct type
    const mongooseOptions: ConnectOptions = {
      maxPoolSize: 5, // Reduce pool size for faster initial connection
      connectTimeoutMS: 5000, // Reduce connection timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, mongooseOptions).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully!');
      return mongoose.connection; // Return the connection object
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};