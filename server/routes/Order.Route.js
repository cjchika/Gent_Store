import express from "express";
import { createOrder } from "../controllers/Order.Controller.js";
import { sellerAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/createOrder", createOrder);

export default router;
