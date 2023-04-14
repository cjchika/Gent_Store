import Product from "../models/Product.Model.js";
import Shop from "../models/Shop.Model.js";
import Coupon from "../models/Coupon.Model.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import fs from "fs";

export const createCouponCode = asyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;
    const hasCouponCode = await Coupon.find({ name });

    if (hasCouponCode.length !== 0) {
      return next(new ErrorHandler("Coupon code already exits.", 400));
    }

    const couponCode = await Coupon.create(req.body);

    res.status(201).json({ success: true, couponCode });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
