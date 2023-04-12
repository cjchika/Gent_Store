import express from "express";
import {
  createShop,
  activateSeller,
  loginShop,
  getSeller,
} from "../controllers/Shop.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/createShop", upload.single("avatar"), createShop);
router.post("/loginShop", loginShop);
router.get("/getSeller", sellerAuth, getSeller);
router.get("/activation/:activationCode", activateSeller);

export default router;
