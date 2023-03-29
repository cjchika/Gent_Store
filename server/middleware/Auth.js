import jwt from "jsonwebtoken";
import ErrorHandler from "../handlers/ErrorHandler.js";
import { asyncErrors } from "./catchAsyncErrors.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const userAuth = asyncErrors(async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const user = await User.findById(tokenDecoded.id);

  if (!user) return next(new ErrorHandler("Please login to continue", 401));

  req.user = user;
  console.log(user);
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
