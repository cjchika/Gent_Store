import express from "express";
import { upload } from "../multer.js";
import { createCouponCode } from "../controllers/Coupon.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createCouponCode", sellerAuth, createCouponCode);
// router.get("/getAllShopEvents/:id", getAllShopEvents);
// router.delete("/deleteShopEvent/:id", sellerAuth, deleteShopEvent);

export default router;
