import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
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
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    status: { type: String, default: "Running" },
    tags: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [{ type: String, required: true }],
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

const Event = mongoose.model("Event", EventSchema);
export default Event;
