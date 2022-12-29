import Product from "../models/Product.js";

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

export const postProduct = async (req, res) => {
  const { name, price, description, rating, category, brand, imagePath } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      rating,
      brand,
      imagePath,
    });

    await newProduct.save();
    const product = await Product.find();
    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
