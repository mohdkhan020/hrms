import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginControllers = async (req, res) => {
  console.log("++++++++++++==========>>>>>>>", req.body);
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    // Validation check
    if (!email || !password) {
      return res.status(400).json({ error: "Email & Password are required" });
    }

    // 1) Email check
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // 2) Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // 3) JWT Secret check to avoid crash
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in env file");
      return res.status(500).json({ error: "Server config error" });
    }

    // 4) Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5) Send token inside a cookie
    return (
      res
        // .cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "strict",
        //   path: "/",
        // })
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        })
        .status(200)
        .json({
          message: "Login successful",
          role: user.role,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        })
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
