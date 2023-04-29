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

// GET ALL COUPONS OF A SHOP

export const getAllShopCoupons = asyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const coupons = await Coupon.find({ shopId: id });

    res.status(201).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// DELETE SHOP COUPON

export const deleteShopCoupon = asyncErrors(async (req, res, next) => {
  try {
    const couponId = req.params.id;

    const event = await Coupon.findByIdAndDelete(couponId);

    if (!event) {
      return next(new ErrorHandler("Coupon not found", 500));
    }

    res.status(201).json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// GET COUPON CODE BY NAME
export const getCouponCodeByName = asyncErrors(async (req, res, next) => {
  try {
    const couponCode = await Coupon.findOne({ name: req.params.name });
    // console.log(couponCode);

    if (!couponCode) {
      next(new ErrorHandler("No coupon found", 404));
      return;
    }

    res.status(200).json({ success: true, couponCode });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
