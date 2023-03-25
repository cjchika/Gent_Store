import path from "path";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ErrorHandler from "../handlers/ErrorHandler.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne(email);

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);
    const avatar = fileUrl;

    const user = { name, email, password, avatar };

    console.log(user);

    // res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
