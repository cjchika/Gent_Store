import express from "express";
import { upload } from "../multer.js";
import {
  createProduct,
  getAllShopProducts,
} from "../controllers/Product.Controller.js";

const router = express.Router();

router.post("/createProduct", upload.array("images"), createProduct);
router.get("/getAllShopProducts/:id", getAllShopProducts);

export default router;
