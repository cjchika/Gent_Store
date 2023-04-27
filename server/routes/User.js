import express from "express";
import {
  createUser,
  activateUser,
  loginUser,
  getUser,
  logoutUser,
  updateUserInfo,
} from "../controllers/User.js";
import { userAuth } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/createUser", upload.single("avatar"), createUser);
router.post("/loginUser", loginUser);
router.get("/getUser", userAuth, getUser);
router.get("/logoutUser", logoutUser);
router.put("/updateUserInfo", userAuth, updateUserInfo);
router.get("/activation/:activationCode", activateUser);

export default router;
