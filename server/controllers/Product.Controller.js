import Product from "../models/Product.Model.js";
import Shop from "../models/Shop.Model.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../handlers/ErrorHandler.js";

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

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await Product.find({ brand });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
