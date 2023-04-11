import path from "path";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../handlers/sendMail.js";
import { activationCode } from "../handlers/ActivationCode.js";
import { sendToken } from "../handlers/userToken.js";
import dotenv from "dotenv";

dotenv.config();

// SHOP SIGNUP

export const createShop = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    const user = new User({
      name,
      email,
      password,
      activationCode: activationCode,
      avatar: fileUrl,
    });

    const saveUser = await user.save();

    try {
      await sendMail({
        email: user.email,
        subject: "Please confirm your account",
        message: `<h3>Email Confirmation</h3>
        <h4>Hello, ${user.name}.</h4>
        <p>You are almost there, please confirm your email by clicking on the following link.</p>
        <a href=http://localhost:5173/activation/${user.activationCode}> Click here</a>
        </div>`,
      });
      res.status(201).json({
        user: saveUser,
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    // console.log(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
