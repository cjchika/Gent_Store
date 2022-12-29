import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 10,
      max: 150,
    },
    category: String,
    rating: Number,
    brand: String,
    imagePath: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
