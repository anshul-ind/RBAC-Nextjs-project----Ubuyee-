import mongoose from "mongoose";
import { UserModel as User } from "./src/lib/db/models/User.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || process.env.Mongo_Uri;

async function checkDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
    
    const users = await User.find({}, { email: 1, role: 1 });
    console.log("Users in DB:", JSON.stringify(users, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error("DB check failed:", err);
    process.exit(1);
  }
}

checkDb();
