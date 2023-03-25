import jwt from "jsonwebtoken";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "./catchAsyncErrors.js";
import User from "../models/User.js";

export const userAuth = asyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

// export const sellerAuth = asyncErrors(async(req,res,next) => {
//   const {seller_token} = req.cookies;

//   if(!seller_token){
//       return next(new ErrorHandler("Please login to continue", 401));
//   }

//   const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);

//   req.seller = await Shop.findById(decoded.id);

//   next();
// });
