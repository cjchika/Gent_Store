import express from "express";
import {
  getProducts,
  getProductByCategory,
  getProductByBrand,
  postProduct,
} from "../controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductByCategory);
router.get("/brand/:brand", getProductByBrand);
router.post("/", postProduct);

export default router;
