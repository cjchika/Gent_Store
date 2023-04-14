import express from "express";
import { upload } from "../multer.js";
import {
  createEvent,
  getAllShopEvents,
  deleteShopEvent,
} from "../controllers/Event.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createEvent", upload.array("images"), createEvent);
router.get("/getAllShopEvents/:id", getAllShopEvents);
router.delete("/deleteShopEvent/:id", sellerAuth, deleteShopEvent);

export default router;
