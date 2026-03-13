import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { connectMongo as connectDB } from "../lib/db/mongoose"
import { UserModel as User } from "../lib/db/models/User"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

async function seedAdmin() {
  await connectDB()

  const existing = await User.findOne({
    email: "admin@ubuyee.com"
  })

  if (existing) {
    console.log("Admin already exists. Skipping.")
    process.exit(0)
  }

  const hashedPassword = await bcrypt.hash(
    "Admin@Ubuyee2024",
    12
  )

  await User.create({
    name:     "Super Admin",
    email:    "admin@ubuyee.com",
    passwordHash: hashedPassword,
    role:     "admin",
  })

  console.log("✅ Admin created successfully")
  console.log("   Email:    admin@ubuyee.com")
  console.log("   Password: Admin@Ubuyee2024")
  console.log("   Login at: /admin/login")
  console.log("⚠️  Change password after first login!")

  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error("❌ Seed failed:", err)
  process.exit(1)
})
