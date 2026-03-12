import mongoose from "mongoose";

/**
 * MongoDB connection URI.
 *
 * Prefer `MONGODB_URI` (standard name). If it's not set, we fall back
 * to the existing `Mongo_Uri` variable so current local setups keep working.
 */
// Read the URI from environment variables.
// We support both MONGODB_URI (preferred) and the legacy Mongo_Uri name.
const MONGODB_URI: string | undefined =
  process.env.MONGODB_URI?.trim() ||
  process.env.Mongo_Uri?.trim();

// Fail fast during runtime if the URI is missing.
const checkUri = () => {
  if (!MONGODB_URI) {
    throw new Error(
      "Missing MongoDB connection string. Please set MONGODB_URI (preferred) or Mongo_Uri in your environment.",
    );
  }
}

// ── Mongoose connection cache ─────────────────────────────────────────────────
// Next.js hot-reload creates new module instances, so we store the connection
// on `globalThis` to avoid opening a new connection on every hot-reload.
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
 * Call this at the top of any API route handler before using Mongoose models.
 * Usage:
 *   await connectMongo();
 *   // then use mongoose models (e.g. UserModel.findOne(...))
 */
export async function connectMongo() {
  checkUri();
  // Return already established connection immediately
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    // At this point MONGODB_URI is guaranteed to be a non-empty string
    // (the guard above throws if it's falsy), so the cast is safe.
    cache.promise = mongoose
      .connect(MONGODB_URI as string)
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
