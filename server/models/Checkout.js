import mongoose, { Schema } from "mongoose";

const ObjectID = Schema.Types.ObjectId;

const checkoutSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  user: {
    type: ObjectID,
    required: true,
    ref: "User",
  },
});

export const Checkout = mongoose.model("Checkout", checkoutSchema);
