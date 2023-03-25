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

const PORT = process.env.PORT;
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
