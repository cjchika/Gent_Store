import express from "express";

import {
  getUser,
  getUserFavorites,
  addRemoveFavorite,
} from "../controllers/User.js";
import { authToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/favorites", getUserFavorites);
router.patch("/:id/:productId", addRemoveFavorite);

export default router;
