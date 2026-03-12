const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function testPassword() {
  let MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '..', '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match) MONGODB_URI = match[1].trim();
  } catch (err) {}

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
