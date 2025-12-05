// import express from "express";
// import cors from "cors";
// import router from './routes/userRoutes.js'
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     allowedHeaders: "Content-Type, Authorization",
//     credentials: true,
//   })
// );

// app.use("/auth/", router);

// const PORT = process.env.PORT || 7000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Auth service running on ${PORT}`);
// });


import express from "express";
import cors from "cors";
import router from './routes/userRoutes.js'
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update CORS to allow API Gateway
app.use(
  cors({
    // origin: ["http://localhost:3000", "http://localhost:8000"], // Add API Gateway
    origin: ["http://localhost:3000", "http://api-gateway:8000", "http://localhost:8000"],
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    service: "Auth Service",
    timestamp: new Date().toISOString()
  });
});

app.use("/", router); // Changed from "/auth/" to "/"

const PORT = process.env.PORT || 7000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Auth service running on http://localhost:${PORT}`);
});