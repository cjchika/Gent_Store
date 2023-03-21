import mongoose, { Schema } from "mongoose";

const ObjectID = Schema.Types.ObjectId;

const favoriteSchema = new Schema(
  {
    user: {
      type: ObjectID,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Object,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
