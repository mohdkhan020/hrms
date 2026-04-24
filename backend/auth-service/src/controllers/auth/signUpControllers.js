import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

// user.verificationToken = token;
// user.verificationTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour

export const signUpControllers = async (req, res) => {
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
    if (password.length < 6) {
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

    const user = new UserModel({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      department,
      phone,
      terms,
      verificationToken: token,
      verificationTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    await user.save();

    // 📧 send email
    await sendVerificationEmail(user.email, token);

    // res.status(201).json({ message: "User successfully created!" });
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
