import mongoose, { Schema } from "mongoose";

const ObjectID = Schema.Types.ObjectId;

const orderSchema = new Schema({
  user: {
    type: ObjectID,
    required: true,
    ref: "User",
  },
  products: {
    type: Array,
    default: [],
    ref: "Product",
  },
  totalAmount: Number,
});

export const Order = mongoose.model("Order", orderSchema);
