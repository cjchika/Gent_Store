import express from "express";
import { createUser, activateUser } from "../controllers/User.js";
// import { authToken } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/create-user", upload.single("avatar"), createUser);
router.post("/activation", activateUser);

export default router;
