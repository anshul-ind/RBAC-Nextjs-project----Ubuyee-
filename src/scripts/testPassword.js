const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function testPassword() {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      email: String,
      passwordHash: String
    }));

    const user = await User.findOne({ email: 'admin@ubuyee.com' });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    console.log("Stored Hash:", user.passwordHash);
    const isMatch = await bcrypt.compare("Admin@Ubuyee2024", user.passwordHash);
    console.log("Does 'Admin@Ubuyee2024' match?", isMatch);

    // Also check if there's any weird whitespace in the hash
    if (user.passwordHash.length !== user.passwordHash.trim().length) {
      console.log("WARNING: Hash has leading/trailing whitespace!");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testPassword();
