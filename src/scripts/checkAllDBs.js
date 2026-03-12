const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function checkAll() {
  let MONGODB_URI;
  try {
    const envPath = path.join(__dirname, '..', '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match) MONGODB_URI = match[1].trim();
  } catch (err) {}

  if (!MONGODB_URI) {
    console.error("No URI");
    process.exit(1);
  }

  try {
    const client = await mongoose.createConnection(MONGODB_URI).asPromise();
    const admin = client.db.admin();
    const dbs = await admin.listDatabases();
    
    for (const dbInfo of dbs.databases) {
      console.log(`--- DB: ${dbInfo.name} ---`);
      const db = client.useDb(dbInfo.name);
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
