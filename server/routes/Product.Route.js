import express from "express";
import { upload } from "../multer.js";
import { createProduct } from "../controllers/Product.Controller.js";

const router = express.Router();

// router.get("/", getProducts);
// router.get("/category/:category", getProductByCategory);
// router.get("/brand/:brand", getProductByBrand);
router.post("/createProduct", upload.array("images"), createProduct);

export default router;
