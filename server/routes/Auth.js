import express from "express";
import { signup } from "../controllers/Auth.js";

const router = express.Router();

export const signUpRoute = router.post("/signup", signup);

// export default router;
