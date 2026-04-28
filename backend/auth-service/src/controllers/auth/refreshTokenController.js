import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel } from "../../models/UserModel.js";

export const refreshTokenController = async (req, res) => {
  try {

    console.log("cookies===>",req.cookies)

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
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 60 * 1000,
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
