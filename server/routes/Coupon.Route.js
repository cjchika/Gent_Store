import express from "express";
import { upload } from "../multer.js";
import {
  createCouponCode,
  getAllShopCoupons,
  deleteShopCoupon,
  getCouponCodeByName,
} from "../controllers/Coupon.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createCouponCode", sellerAuth, createCouponCode);
router.get("/getAllShopCoupons/:id", sellerAuth, getAllShopCoupons);
router.delete("/deleteShopCoupon/:id", sellerAuth, deleteShopCoupon);
router.get("/getCouponCodeByName/:name", getCouponCodeByName);

export default router;
