import express from "express";
import { createUser } from "../controllers/User.js";
// import { authToken } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);

export default router;
