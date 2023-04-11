import path from "path";
import Shop from "../models/Shop.Model.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../handlers/sendMail.js";
import { activationCode } from "../handlers/ActivationCode.js";
import { sendShopToken } from "../handlers/sendShopToken.js";
import dotenv from "dotenv";

dotenv.config();

// SHOP SIGNUP

export const createShop = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
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

    const seller = new Shop({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipcode,
      activationCode: activationCode,
      avatar: fileUrl,
    });

    const saveSeller = await seller.save();

    try {
      await sendMail({
        email: seller.email,
        subject: "Please confirm your seller account",
        message: `<h3>Email Confirmation</h3>
        <h4>Hello, ${seller.name}.</h4>
        <p>You are almost there, please confirm your email by clicking on the following link.</p>
        <a href=http://localhost:5173/seller/activation/${seller.activationCode}> Click here</a>
        </div>`,
      });
      res.status(201).json({
        shop: saveSeller,
        success: true,
        message: `Please check your email: ${seller.email} to activate your seller account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    // console.log(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
