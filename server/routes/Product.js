import express from "express";
import {
  getProducts,
  getProductByCategory,
  getProductByBrand,
} from "../controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:category", getProductByCategory);
router.get("/:brand", getProductByBrand);

export default router;
