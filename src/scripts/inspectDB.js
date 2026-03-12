const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function inspect() {
  let MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '..', '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match) MONGODB_URI = match[1].trim();
  } catch (err) {}

  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found in .env.local");
    process.exit(1);
  }

  try {
    const conn = await mongoose.createConnection(MONGODB_URI).asPromise();
    const admin = conn.db.admin();
    const dbs = await admin.listDatabases();
    console.log("Databases:", dbs.databases.map(db => db.name));
    
    // Check current database
    console.log("Current DB:", conn.name);
    
    // List collections in current DB
    const collections = await conn.db.listCollections().toArray();
    console.log("Collections in", conn.name, ":", collections.map(c => c.name));
    
    // Check users with role: 'admin' in 'users' collection of current DB
    const adminUsers = await conn.db.collection('users').find({ role: 'admin' }).toArray();
    console.log("--- ALL ADMIN USERS ---");
    adminUsers.forEach(u => console.log(JSON.stringify(u, null, 2)));
    
    // Specifically check for the anshul email
    const anshulUser = await conn.db.collection('users').findOne({ email: 'anshul@ubuyee.com' });
    console.log("--- SEARCH FOR anshul@ubuyee.com ---");
    console.log(anshulUser ? JSON.stringify(anshulUser, null, 2) : "NOT FOUND");
    
    const allUsersCount = await conn.db.collection('users').countDocuments();
    console.log("Total Users in 'users' collection:", allUsersCount);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

inspect();
