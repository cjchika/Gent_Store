import express from "express";
import dotenv from "dotenv";
import { handleErr } from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/User.js";
import shopRoutes from "./routes/Shop.Route.js";
import productRoutes from "./routes/Product.Route.js";
import eventRoutes from "./routes/Event.Route.js";
import couponRoutes from "./routes/Coupon.Route.js";
import orderRoutes from "./routes/Order.Route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://gent-store.netlify.app",
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
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(handleErr);

export default app;
