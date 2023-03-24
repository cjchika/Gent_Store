import express from "express";
import {
  createUser,
  getUserFavorites,
  addRemoveFavorite,
} from "../controllers/User.js";
// import { authToken } from "../middleware/Auth.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.get("/:id", getUser);
router.get("/:id/favorites", getUserFavorites);
router.patch("/:id/:productId", addRemoveFavorite);

export default router;
