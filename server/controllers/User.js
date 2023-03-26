import path from "path";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import { upload } from "../multer.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../handlers/sendMail.js";
import { userAuth } from "../middleware/Auth.js";
import dotenv from "dotenv";

dotenv.config();

export const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne(email);

    if (userEmail) {
      const fileName = req.file.filename;
      const filePath = `uploads/${fileName}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const fileName = req.file.filename;
    const avatar = path.join(fileName);

    const user = { name, email, password, avatar };

    console.log(user);

    // res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
