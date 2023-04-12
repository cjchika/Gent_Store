import express from "express";
import { upload } from "../multer";
import { createProduct } from "../controllers/Product.Controller";

const router = express.Router();

// router.get("/", getProducts);
// router.get("/category/:category", getProductByCategory);
// router.get("/brand/:brand", getProductByBrand);
router.post("/createProduct", upload.array("images"), createProduct);

export default router;
