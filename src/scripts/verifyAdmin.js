const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function verify() {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to Atlas");
    
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      email: String,
      role: String
    }));

    const users = await User.find({ role: 'admin' });
    console.log("Admin Users in DB:", users.map(u => u.email));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

verify();
