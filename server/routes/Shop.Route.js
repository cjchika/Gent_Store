import express from "express";
import { createShop } from "../controllers/Shop.Controller.js";
import { userAuth } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/createShop", upload.single("avatar"), createShop);
// router.post("/loginUser", loginUser);
// router.get("/getUser", userAuth, getUser);
// router.get("/logoutUser", logoutUser);
// router.get("/activation/:activationCode", activateUser);

export default router;
