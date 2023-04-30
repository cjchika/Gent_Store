import path from "path";
import Shop from "../models/Shop.Model.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import fs from "fs";
import sendMail from "../handlers/sendMail.js";
import { activationCode } from "../handlers/ActivationCode.js";
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
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    const seller = new Shop({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
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
        <a href=https://gent-store.netlify.app/seller/activation/${seller.activationCode}> Click here</a>
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
    // console.log(seller);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ACTIVATE SELLER
export const activateSeller = asyncErrors(async (req, res, next) => {
  try {
    const { activationCode } = req.params;

    const seller = await Shop.findOne({ activationCode });

    if (!seller) {
      return res.status(400).send({ message: "Invalid token." });
    }

    seller.status = "Active";

    await seller.save();

    const token = seller.getJwtToken();
    // console.log(token);
    res.status(201).json({ token, seller, message: "Seller verified." });
    // console.log(seller);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// LOGIN SELLER

export const loginShop = asyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const seller = await Shop.findOne({ email }).select("+password");

    if (!seller) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }

    if (seller.status !== "Active") {
      next(
        new ErrorHandler(
          "Pending account. Please verify your email address.",
          400
        )
      );
    }
    const isValidPassword = await seller.comparePassword(password);
    // console.log("From login conroller " + isValidPassword);

    if (!isValidPassword) {
      return next(
        new ErrorHandler(
          "Invalid details, please provide correct information",
          400
        )
      );
    }

    const token = seller.getJwtToken();
    res.status(201).json({ token, seller, id: seller._id });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET SELLER

export const getSeller = asyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller.id);

    if (!seller) {
      return next(new ErrorHandler("User doesn't exit", 400));
    }
    delete seller.password;
    res.status(200).json({
      success: true,
      seller,
    });
    // console.log(seller);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET SHOP INFO

export const getShopInfo = asyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
