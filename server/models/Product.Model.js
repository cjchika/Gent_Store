import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
