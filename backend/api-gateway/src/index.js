

import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// ===================== GLOBAL ERROR HANDLER FOR PROXY =====================
const proxyErrorHandler = (err, req, res) => {
  console.error(`❌ Proxy Error → ${req.originalUrl}`);
  console.error(err);

  if (!res.headersSent) {
    res.status(503).json({
      success: false,
      message: "Service temporarily unavailable",
      details: err.message || "Cannot reach the service",
    });
  }
};

// ===================== AUTH SERVICE PROXY =====================
const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/auth': '' }, // Remove /auth prefix when forwarding
  onError: (err, req, res) => proxyErrorHandler(err, req, res),
  onProxyReq: (proxyReq, req, res) => {
    console.log(`➡️  Forwarding to AUTH: ${req.method} ${req.originalUrl}`);
    // Forward body if present
    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`⬅️  Response from AUTH: ${proxyRes.statusCode} ${req.originalUrl}`);
  },
});

// Apply proxy to /auth routes
app.use("/auth", authProxy);

// ===================== HEALTH CHECK =====================
app.get("/health", (req, res) => {
  console.log("Loaded ENV → AUTH_SERVICE_URL =", process.env.AUTH_SERVICE_URL);

  res.status(200).json({
    status: "OK",
    service: "APIss Gateway",
    data:`${process.env.AUTH_SERVICE_URL}`,
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.send("APIss Gateway is running");
});

// ===================== GLOBAL 404 HANDLER =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found in API Gateway",
    path: req.originalUrl,
  });
});

// ===================== GLOBAL ERROR HANDLER =====================
app.use((err, req, res, next) => {
  console.error("🔥 Gateway Internal Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error in API Gateway",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  });
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
  console.log(`📡 Auth Service URL: ${process.env.AUTH_SERVICE_URL}`);
});
