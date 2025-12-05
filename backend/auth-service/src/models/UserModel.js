import { connection1 } from "../lib/mongodb.js";
import mongoose from "mongoose";

// HRMS User Schema
const UserSchema = new mongoose.Schema(
  {
    //   fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, enum: ["HR", "Admin"], default: "Admin" },
    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
    },
    department: { type: String }, // optional
    phone: { type: String }, // optional
    //   terms: { type: Boolean, required: true }
    // resetOTP: Number,
    // otpExpiry: Number,
  },
  { timestamps: true }
);

// Model
export const UserModel = connection1.model("Users", UserSchema);
