import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

// OPTIONAL: configurable constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 1000; // 15 minutes

export const loginController = async (req, res) => {
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

    // ✅ Check email verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
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

    if (!user.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    // ✅ Password compare
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("match===>>", isMatch);
    if (!isMatch) {
      // ❗ increase login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      // ❗ lock account if max attempts reached
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }

      await user.save();

      return res.status(400).json({ error: "Invalid Password" });
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
      { expiresIn: "1m" }, // short expiry (best practice)
    );

    // ✅ Refresh Token (long life)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    //Convert RefreshToken into hashFormat for safety purpose
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
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 15 * 60 * 1000, // 15 min
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ local me false
      sameSite: "lax", // ✅ IMPORTANT
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

export const logoutController = async (req, res) => {
  try {
    const userId = req.user.id;
console.log("userId====>>>>",userId)
    // ✅ refresh token DB se hatao
    await UserModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // ✅ cookie clear karo
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const meController = async (req, res) => {
  try {
    console.log("request====>", req?.cookies);
    const token = req?.cookies?.token;
    // const token = req.cookies;
    console.log(token);

    if (!token) {
      return res.status(401).json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select(
      "_id name email role",
    );

    if (!user) {
      return res.status(401).json({ user: null });
    }

    return res.status(200).json({ user });
  } catch (err) {
    // ❗ invalid / expired token → clear cookie
    // res.clearCookie("token");
    return res.status(401).json({ user: null });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    console.log("cookies===>", req.cookies);

    // ✅ 1. Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ 2. Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ 3. Hash incoming token (match with DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // ✅ 4. Find user
    const user = await UserModel.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== hashedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ 5. Check if user active
    if (!user.isActive) {
      return res.status(403).json({ error: "Account disabled" });
    }

    // ✅ 6. Create NEW access token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // ✅ 7. (Optional but recommended) Rotate refresh token 🔥
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    const newHashedRefreshToken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    user.refreshToken = newHashedRefreshToken;
    await user.save();

    // ✅ 8. Set cookies again
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //   maxAge: 15 * 60 * 1000,
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ local me false
      sameSite: "lax", // ✅ IMPORTANT
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ 9. Response
    return res.status(200).json({
      message: "Token refreshed",
    });
  } catch (err) {
    console.error("REFRESH TOKEN ERROR:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signUpController = async (req, res) => {
  try {
    const { fullName, email, password, role, department, phone, terms } =
      req.body;

    // ✅ Required fields check
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // ✅ Terms check
    if (!terms) {
      return res.status(400).json({ message: "Accept terms required" });
    }

    // ✅ Password strength
    if (password?.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    if (!/(?=.*[A-Z])(?=.*\d).{6,}/.test(password)) {
      return res.status(400).json({
        message: "Password must contain 1 uppercase & 1 number",
      });
    }

    // ✅ Normalize email
    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // if(!existingUser?.isVerified){
    //   return res.status(400).json({ message: "Email already exists Please verify email in your gmail" });
    // }

    // ✅ Role validation (security)
    const allowedRoles = ["admin", "hr", "employee"];
    let userRole = "employee";

    if (role) {
      if (!allowedRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ message: "Invalid role" });
      }
      userRole = role.toLowerCase();
    }

    const SALT_ROUNDS = 10;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 🔐 generate token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = new UserModel({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      department,
      phone,
      terms,
      verificationToken: hashedToken,
      verificationTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    await user.save();

    // 📧 send email
    await sendVerificationEmail(user.email, token, user.fullName);

    res.status(201).json({
      message: "Signup successful. Please verify your email.",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Signup failed" });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.body;

    // 🔥 SAME hashing again
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};
