import express from "express";
import { upload } from "../multer.js";
import { createEvent } from "../controllers/Event.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createProduct", upload.array("images"), createEvent);
// router.get("/getAllShopProducts/:id", getAllShopProducts);
// router.delete("/deleteShopProduct/:id", sellerAuth, deleteShopProduct);

export default router;
