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

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // const user = { name, email, password, avatar: fileUrl };
    const user = new User({
      name,
      email,
      password: hashedPassword,
      activationCode: activationCode,
      avatar: fileUrl,
    });

    // const activationToken = createActivationToken(user);
    // const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Please confirm your account",
        message: `<h3>Email Confirmation</h3>
        <h4>Hello ${user.name}</h4>
        <p>You are almost there, please confirm your email by clicking on the following link.</p>
        <a href=http://localhost:5173/activation/${user.activationCode}> Click here</a>
        </div>`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    const saveUser = await user.save();
    res.status(201).json(saveUser);
    console.log(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ACTIVATE USER
export const activateUser = asyncErrors(async (req, res, next) => {
  try {
    const { activationCode } = req.params;

    const user = User.findOne({ activationCode });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    user.status = "Active";
    await user.save();
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

    const user = await User.findOne({ email });

    if (user.status !== "Active") {
      return res.status(401).send({
        message: "Pending account. Please verify your email.",
      });
    }

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isValidPassword = bcrypt.compare(password.user.password);

    if (!isValidPassword) {
      return next(
        new ErrorHandler(
          "Invalid details, please provide correct information",
          400
        )
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
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
