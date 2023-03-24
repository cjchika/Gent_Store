import express from "express";
import dotenv from "dotenv";
const app = express();

// Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "server/config/.env",
  });
}

export default app;
