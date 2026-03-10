import mongoose from "mongoose";

/**
 * MongoDB connection URI.
 *
 * Prefer `MONGODB_URI` (standard name). If it's not set, we fall back
 * to the existing `Mongo_Uri` variable so current local setups keep working.
 */
const MONGODB_URI =
  process.env.MONGODB_URI?.trim() ||
  process.env.Mongo_Uri?.trim();

if (!MONGODB_URI) {
  throw new Error(
    "Missing MongoDB connection string. Please set MONGODB_URI (preferred) or Mongo_Uri in your environment.",
  );
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as { mongoose?: MongooseCache };

const cache: MongooseCache = globalForMongoose.mongoose ?? { conn: null, promise: null };
globalForMongoose.mongoose = cache;

/**
 * Singleton MongoDB connection for the whole app.
 *
 * Usage:
 *   await connectMongo();
 *   // then use mongoose models (e.g. UserModel.findOne(...))
 */
export async function connectMongo() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI)
      .then((m) => m)
      .catch((error) => {
        // Surface a clear error if the initial connection fails.
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
