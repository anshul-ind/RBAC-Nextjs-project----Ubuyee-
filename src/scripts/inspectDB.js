const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function inspect() {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.createConnection(MONGODB_URI).asPromise();
    if (!conn.db) {
      throw new Error("Database not connected correctly: conn.db is undefined");
    }
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
