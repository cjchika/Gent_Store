import ErrorHandler from "../handlers/ErrorHandler.js";

export const handleErr = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //   Mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
};
