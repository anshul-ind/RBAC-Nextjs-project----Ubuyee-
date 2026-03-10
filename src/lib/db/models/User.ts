import mongoose, { Schema } from "mongoose";

export type UserRole = "user" | "vendor" | "admin";

/**
 * Canonical User document for the application.
 *
 * NOTE:
 * - `passwordHash` stores the hashed password (never store plain text).
 * - `name` is optional for flexibility in auth flows.
 */
export type UserDocument = mongoose.Document & {
  name?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "vendor", "admin"], default: "user" },
  },
  { timestamps: true },
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);
