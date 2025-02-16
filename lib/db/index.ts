import mongoose, { Connection, ConnectOptions } from 'mongoose';

// Define the type for the cached object
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny: any = global;
const cached: MongooseCache = globalAny.mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn; // Return cached connection if exists

  if (!MONGODB_URI) throw new Error('❌ MONGODB_URI is missing');

  if (!cached.promise) {
    try {
      // Define mongoose options
      const mongooseOptions: ConnectOptions = {
        maxPoolSize: 10, // Increased pool size for better concurrent connections
        minPoolSize: 3, // Ensure some persistent connections stay alive
        
      };

      cached.promise = mongoose.connect(MONGODB_URI, mongooseOptions).then((mongoose) => {
        console.log('✅ MongoDB Connected Successfully!');
        return mongoose.connection;
      });

      cached.conn = await cached.promise;
    } catch (err) {
      console.error('❌ MongoDB Connection Error:', err);
      cached.promise = null; // Reset promise to allow retrying
      throw err;
    }
  }

  return cached.conn;
};
