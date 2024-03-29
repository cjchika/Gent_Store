import ErrorHandler from "../handlers/ErrorHandler.js";

export const handleErr = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //   Mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //   Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }

  //   Jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
