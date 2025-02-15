import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('❌ MONGODB_URI is missing');

  if (!cached.promise) {
    const mongooseOptions = {
      maxPoolSize: 5, // Reduce pool size for faster initial connection
      connectTimeoutMS: 5000, // Reduce connection timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, mongooseOptions).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully!');
      return mongoose
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise
  return cached.conn
}
