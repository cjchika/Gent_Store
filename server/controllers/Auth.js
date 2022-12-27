import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// USER SIGNUP
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// USER SIGNIN

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    delete existingUser.password;
    res.status(200).json({ token, existingUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
