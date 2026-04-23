import express from "express";
import cors from "cors";
import router from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import { dbConnect } from "./lib/mongodb.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet"; //👉 Helmet ek middleware hai jo HTTP security headers add karta hai
// Common protections:
// X-Content-Type-Options → MIME sniffing block
// X-Frame-Options → clickjacking block
// X-XSS-Protection → basic XSS safety
// Strict-Transport-Security → HTTPS enforce
// Content-Security-Policy (CSP) → powerful XSS control


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); //Ye automatically: $ . remove kar deta hai request se
app.use(helmet());

// Update CORS to allow API Gateway
app.use(
  cors({
    origin: ["http://localhost:3000", "http://api-gateway:8000", "http://localhost:8000"],
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// ✅ DB connect FIRST
await dbConnect();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Auth Service",
    timestamp: new Date().toISOString()
  });
});

//routes
app.use("/auth", router);

//server ke upar security shield 🛡️
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Auth service running on http://localhost:${PORT}`);
});
