import path from "path";
import User from "../models/User.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import fs from "fs";
import sendMail from "../handlers/sendMail.js";
import { activationCode } from "../handlers/ActivationCode.js";
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

// ACTIVATE USER
export const activateUser = asyncErrors(async (req, res, next) => {
  try {
    const { activationCode } = req.params;

    const user = await User.findOne({ activationCode });

    if (!user) {
      return res.status(400).send({ message: "Invalid token." });
    }

    user.status = "Active";

    await user.save();

    const token = user.getJwtToken();
    // console.log(token);
    res.status(201).json({ token, user, message: "User verified" });
    // console.log(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// LOGIN USER

export const loginUser = asyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }

    if (user.status !== "Active") {
      next(
        new ErrorHandler(
          "Pending account. Please verify your email address.",
          400
        )
      );
    }
    const isValidPassword = await user.comparePassword(password);
    // console.log("From login conroller " + isValidPassword);

    if (!isValidPassword) {
      return next(
        new ErrorHandler(
          "Invalid details, please provide correct information",
          400
        )
      );
    }

    const token = user.getJwtToken();
    res.status(201).json({ token, user, id: user._id });
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
    delete user.password;
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

// UPDATE USER INFO
export const updateUserInfo = asyncErrors(async (req, res, ext) => {
  //
});
