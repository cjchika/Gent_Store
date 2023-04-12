import Product from "../models/Product.Model.js";
import Shop from "../models/Shop.Model.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../handlers/ErrorHandler.js";

// CREATE PRODUCT

export const createProduct = asyncErrors(async (req, res, next) => {
  try {
    const sellerId = req.body.shopId;
    const seller = await Shop.findById(sellerId);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = seller;

      const product = await Product.create(productData);

      res.status(201).json({ success: true, product });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// GET ALL PRODUCTS OF A SHOP

export const getAllShopProducts = async (req, res) => {
  try {
    const sellerId = req.params.shopId;

    const products = await Product.find(sellerId);

    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};
