const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
require('dotenv').config({ path: envPath });
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ubuyee";

async function seed() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined and no fallback available.");
    process.exit(1);
  }

  try {
    console.log(`Connecting to: ${MONGODB_URI.split('@').pop()}`); // Log only domain/db for safety
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      passwordHash: String,
      role: String
    });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const targetEmail = "admin@ubuyee.com";
    const targetPassword = "Admin@Ubuyee2024";
    const hashedPassword = await bcrypt.hash(targetPassword, 12);

    console.log(`Cleaning up existing admins and seeding: ${targetEmail}...`);

    // Remove all existing users with 'admin' role to ensure a single fresh admin
    await User.deleteMany({ role: "admin" });

    await User.create({
      name: "Super Admin",
      email: targetEmail,
      passwordHash: hashedPassword,
      role: "admin"
    });

    console.log(`✅ Admin reset/created: ${targetEmail} / ${targetPassword}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seed();
