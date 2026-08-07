
import express from "express";
import authProxy from "./routes/auth.proxy.js";
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT ?? '';
const app = express();

// app.use(express.json());

app.use("/api/auth", authProxy);

app.listen(PORT, () => {
  console.log("Gateway running on 8000");
});
