import { connection } from "../lib/mongodb.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName:{type:String},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ["admin", "hr", "employee"],
      default: "employee",
      set: (v) => v?.toLowerCase(), // 🔥 FIX
    },

    department: { type: String },
    phone: { type: String },
    //for  email verification
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
  },
  { timestamps: true },
);

export const UserModel = connection.model("Users", UserSchema);
