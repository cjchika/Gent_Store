import mongoose, { Schema } from "mongoose";

// const ObjectID = Schema.Types.ObjectId;

const CartSchema = new Schema({
  cartItems: [
    {
      products: {
        type: Object,
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
});

export const Cart = mongoose.model("Cart", CartSchema);
