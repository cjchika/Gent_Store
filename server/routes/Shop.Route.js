import express from "express";
import {
  createShop,
  activateSeller,
  loginShop,
} from "../controllers/Shop.Controller.js";
import { userAuth } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/createShop", upload.single("avatar"), createShop);
router.post("/loginShop", loginShop);
// router.get("/getUser", userAuth, getUser);
// router.get("/logoutUser", logoutUser);
router.get("/activation/:activationCode", activateSeller);

export default router;
