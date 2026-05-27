import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
// 👇 IMPORTANT FIX
dotenv.config({
  path: path.resolve("auth-service/.env"),
});


// console.log("MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) throw new Error("Please define MONGO_URI in .env");

// Cache connection for dev mode (Next.js / serverless friendly)
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Agar multiple connections chahiye
export const connection = mongoose.createConnection(process.env.MONGO_URI);
// export const connection2 = mongoose.createConnection(process.env.MONGO_URI_2); // optional
