import express from "express";
import {
  getProducts,
  getProductByCategory,
  getProductByBrand,
} from "../controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:categoryId", getProductByCategory);
router.get("/brand/:brandId", getProductByBrand);

export default router;
