import express from "express";
import { upload } from "../multer.js";
import {
  createProduct,
  getAllShopProducts,
  deleteShopProduct,
  getAllProducts,
  getProduct,
} from "../controllers/Product.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createProduct", upload.array("images"), createProduct);
router.get("/getAllShopProducts/:id", getAllShopProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProduct);
router.delete("/deleteShopProduct/:id", sellerAuth, deleteShopProduct);

export default router;
