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
import { sendToken } from "../handlers/userToken.js";
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

    const user = { name, email, password, avatar: fileUrl };
    // const user = new User({ name, email, password, avatar: fileUrl });
    // const saveUser = await user.save();
    // res.status(201).json(saveUser);
    console.log(user);

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const activateUser = asyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({ name, email, password, avatar });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
