import { connectMongo } from "./db/mongoose";

/**
 * Backwards-compatible wrapper around the new Mongo connection helper.
 *
 * Existing code imports the default export from `@/lib/db`.
 * To avoid breaking that code, we simply delegate to `connectMongo`.
 */
const connectToDatabase = async () => {
  return connectMongo();
};

export default connectToDatabase;
