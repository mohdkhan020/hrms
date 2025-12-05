import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcryptjs";

export const signUpControllers = async (req, res) => {
  try {
    const { fullName, email, password, role, department, phone, terms } = req.body;
console.log('email==>',fullName,email)
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      role,
      department,
      phone,
      terms
    });

    await user.save();

    res.status(201).json({ message: "User successfully created!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};
