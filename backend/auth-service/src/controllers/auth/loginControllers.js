import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// OPTIONAL: configurable constants
const MAX_LOGIN_ATTEMPTS = 7;
const LOCK_TIME = 1 * 60 * 1000; // 15 minutes

export const loginControllers = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email & Password are required" });
      // return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ Normalize email
    email = email.toLowerCase().trim();

    // 1) Email check
    // const user = await UserModel.findOne({ email });
    const user = await UserModel.findOne({ email }).select("+password");

    // ✅ Dummy hash to prevent timing attack
    const dummyHash =
      "$2a$10$CwTycUXWue0Thq9StjUM0uJ8z9l9p1k6Hk6z9l9p1k6Hk6z9l9p1k"; // random bcrypt hash

    if (!user) {
      await bcrypt.compare(password, dummyHash);
      // return res.status(400).json({ error: "Invalid credentials" });
      return res.status(400).json({ error: "Invalid Email & Password" });
    }

    // 🟢 1. Reset expired lock (YAHI ADD KARNA HAI)
    if (user.lockUntil && user.lockUntil < Date.now()) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
    }

    // ✅ Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({
        error: "Account locked. Try again later",
      });
    }

    // ✅ Check email verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    // ✅ Password compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // ❗ increase login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      // ❗ lock account if max attempts reached
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }

      await user.save();

      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3) JWT Secret check to avoid crash
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error("JWT secrets missing");
      return res.status(500).json({ error: "Server config error" });
    }

    // ✅ Create JWT (minimal payload)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }, // short expiry (best practice)
    );

    // ✅ Refresh Token (long life)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // ✅ Reset login attempts on success
    if (user.loginAttempts > 0) {
      user.loginAttempts = 0;
    }
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    user.refreshToken = hashedRefreshToken;

    await user.save();

    // ✅ Send cookies
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Final response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    // console.error("LOGIN ERROR:", err.message);
    console.error("LOGIN ERROR:", {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
