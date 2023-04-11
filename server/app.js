import express from "express";
import dotenv from "dotenv";
import { handleErr } from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/User.js";
import shopRoutes from "./routes/Shop.Route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(`/`, express.static("uploads"));

// Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "server/config/.env",
  });
}

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/seller", shopRoutes);

app.use(handleErr);

export default app;
