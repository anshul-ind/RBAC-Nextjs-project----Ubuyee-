const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function checkAll() {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  try {
    const client = await mongoose.createConnection(MONGODB_URI).asPromise();
    if (!client.db) {
      throw new Error("Database not connected correctly: client.db is undefined");
    }
    const admin = client.db.admin();
    const dbs = await admin.listDatabases();
    
    for (const dbInfo of dbs.databases) {
      console.log(`--- DB: ${dbInfo.name} ---`);
      const db = client.useDb(dbInfo.name);
      if (!db.db) {
        console.warn(`  [Warning] db.db is undefined for ${dbInfo.name}, skipping...`);
        continue;
      }
      const collections = await db.db.listCollections().toArray();
      for (const col of collections) {
        if (col.name === 'users' || col.name === 'User') {
          const users = await db.db.collection(col.name).find({ role: 'admin' }).toArray();
          console.log(`  Collection ${col.name} Admins:`, users.map(u => u.email));
        }
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkAll();
