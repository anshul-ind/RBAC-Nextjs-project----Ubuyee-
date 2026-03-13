import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "";

async function inspectDb() {
  try {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is undefined");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
    
    // Get the raw collection to see exact field names
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established: mongoose.connection.db is undefined");
    }
    const users = await mongoose.connection.db.collection("users").find({}).limit(5).toArray();
    console.log("Raw User Records (First 5):");
    users.forEach(u => {
      const keys = Object.keys(u);
      console.log(`- ID: ${u._id}, Email: ${u.email}, Fields: ${keys.join(", ")}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error("Inspection failed:", err);
    process.exit(1);
  }
}

inspectDb();
