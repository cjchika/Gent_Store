import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connectDatabase from "./DB/Database.js";
import dotenv from "dotenv";
import app from "./app.js";

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server for uncaught exception...`);
});

// Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "server/config/.env",
  });
}

// Connect to Database
connectDatabase();

const PORT = process.env.PORT || 4000;

// Create Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandle promise rejection...`);

  server.close(() => {
    process.exit(1);
  });
});

// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/Auth.js";
// import productRoutes from "./routes/Product.js";
// import userRoutes from "./routes/User.js";
// import { postProduct } from "./controllers/Product.js";
// import { authToken } from "./middleware/Auth.js";
// import { dataProduct } from "./data/index.js";

// import Product from "./models/Product.js";

// // CONFIGURATION
// dotenv.config();
// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// // ROUTES WITH FILE
// app.post("/products", authToken, upload.single("picture"), postProduct);

// // ROUTES
// app.use("/auth", authRoutes);
// app.use("/products", productRoutes);
// app.use("/user", userRoutes);

// // MONGOOSE SETUP
// const PORT = process.env.PORT || 4000;
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGO_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     // Product.insertMany(dataProduct);
//   })
//   .catch((error) => console.log(`${error} failed to connect`));
