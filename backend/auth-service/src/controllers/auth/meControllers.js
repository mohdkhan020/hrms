import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserModel.js";

export const meController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select(
      "_id name email role"
    );

    if (!user) {
      return res.status(401).json({ user: null });
    }

    return res.status(200).json({ user });

  } catch (err) {
    // ❗ invalid / expired token → clear cookie
    res.clearCookie("token");
    return res.status(401).json({ user: null });
  }
};
