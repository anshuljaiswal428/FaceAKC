// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["SUPER_ADMIN"],
    default: "SUPER_ADMIN"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
