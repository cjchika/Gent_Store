import mongoose, { Schema } from "mongoose";

const ObjectID = Schema.Types.ObjectId;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectID,
      required: true,
      ref: "User",
    },
  },
});

export const Order = mongoose.model("Order", orderSchema);
