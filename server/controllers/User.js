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

// USER SIGNUP

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
    // console.log(user);

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ACTIVATE USER
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

// LOGIN USER

export const loginUser = asyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (user.status !== "Active") {
      return res.status(401).send({
        message: "Pending account. Please verify your email.",
      });
    }

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const passwordValid = await user.comparePassword(password);

    if (!passwordValid) {
      return next(
        new ErrorHandler(
          "Invalid details, please provide correct information",
          400
        )
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET USER

export const getUser = asyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exit", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// LOGOUT USER

export const logoutUser = asyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      sucess: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
