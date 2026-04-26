import { UserModel } from "../../models/UserModel.js";

export const verifyEmailController = async (req, res) => {
  try {
    console.log("req===>>>",req.body)
    const { token } = req.body;

    const user = await UserModel.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });
console.log("user===>>>",user)
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
