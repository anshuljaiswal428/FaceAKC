// models/Staff.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  department: { type: String, required: true },
  photo: String,
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Staff", staffSchema);
