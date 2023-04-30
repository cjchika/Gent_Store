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
        <a href=https://gent-store.netlify.app/activation/${user.activationCode}> Click here</a>
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
export const updateUserInfo = asyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// UPDATE USER AVATAR
export const updateUserAvatar = asyncErrors(async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.user.id);

    const existingAvatarPath = `uploads/${existingUser.avatar}`;

    fs.unlinkSync(existingAvatarPath);

    const fileUrl = path.join(req.file.filename);

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// UPDATE USER ADDRESSES
export const updateUserAddress = asyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddresss = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );

    if (sameTypeAddresss) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }

    const existingAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existingAddress) {
      Object.assign(existingAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// DELETE USER ADDRESS
export const deleteUserAddress = asyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    console.log(addressId);

    await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// UPDATE USER PASSWORD
export const updateUserPassword = asyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
