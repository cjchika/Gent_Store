import express from "express";
import dotenv from "dotenv";
import { handleErr } from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/User.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(`${process.cwd()}/uploads`, express.static("/uploads"));

// Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "server/config/.env",
  });
}

app.use("/api/v1/user", userRoutes);

app.use(handleErr);

export default app;
