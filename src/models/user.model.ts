import mongoose from "mongoose";

interface IUser {
    _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: "user" | "vendor" | "admin";
}


const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
    role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user"
    }
},{timestamps: true});

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;