import Product from "../models/Product.Model.js";
import Shop from "../models/Shop.Model.js";
import { asyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../handlers/ErrorHandler.js";
import fs from "fs";

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

export const getAllShopProducts = asyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const products = await Product.find({ shopId: id });

    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});

// DELETE SHOP PRODUCT

export const deleteShopProduct = asyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productData = await Product.findById(productId);

    productData.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler("No product match this Id", 500));
    }

    res.status(201).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// GET PRODUCT
export const getProduct = asyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(200).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});

// GET ALL PRODUCTS
export const getAllProducts = asyncErrors(async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});
