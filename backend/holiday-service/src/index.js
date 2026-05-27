import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { pool } from "./lib/postgresql.js";
import router from './modules/holidays/holiday.routes.js';
const PORT = process.env.PORT

dotenv.config();

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Update CORS to allow API Gateway
app.use(
  cors({
    origin: ["http://localhost:3000", "http://api-gateway:8000", "http://localhost:8000"],
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);


// PostgreSQl DB Connect
pool
  .connect()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//routes
app.use("/api", router);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Holiday service running on http://localhost:${PORT}`);
});

// console.log("hello")
