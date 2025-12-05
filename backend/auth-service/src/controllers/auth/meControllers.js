import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserModel.js";

export const meController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select(
      "_id name email role"
    );

    res.json({ user });

  } catch (err) {
    res.json({ user: null });
  }
};
