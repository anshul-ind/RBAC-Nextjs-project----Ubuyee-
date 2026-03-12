const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Try to load MONGODB_URI from .env.local if not in process.env
let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  try {
    const envPath = path.join(__dirname, '../../.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/^MONGODB_URI=(.+)$/m);
      if (match) {
        MONGODB_URI = match[1].trim();
      }
    }
  } catch (err) {
    console.warn("Could not read .env.local for MONGODB_URI");
  }
}

// Final fallback if still not found
if (!MONGODB_URI) {
  MONGODB_URI = "mongodb://127.0.0.1:27017/ubuyee";
}

async function seed() {
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
