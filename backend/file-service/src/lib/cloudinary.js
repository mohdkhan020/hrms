// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
// 👇 IMPORTANT FIX
dotenv.config({
  path: path.resolve("file-service/.env"),
});

console.log("pr", process.env.CLOUDINARY_CLOUD_NAME);
console.log("pr", process.env.CLOUDINARY_API_KEY);
console.log("pr", process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary
