// models/Guest.js
import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  guestType: {
    type: String,
    enum: ["ATTENDANT", "OTHER"],
    required: true
  },

  // Common
  mobile: { type: String, required: true },
  photo: String,

  // ATTENDANT fields
  attendantName: String,
  patientToMeet: String,

  // OTHER fields
  name: String,
  description: String,

  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Guest", guestSchema);
