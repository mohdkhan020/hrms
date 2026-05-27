import pg from "pg";
import dotenv from 'dotenv'
import path from 'path'
const { Pool } = pg;

dotenv.config();
// 👇 IMPORTANT FIX
dotenv.config({
  path: path.resolve("auth-service/.env"),
});


export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
