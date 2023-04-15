import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import crypto from "crypto";

// const ObjectID = Schema.Types.ObjectId;

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      min: [6, "Password should be greater than 6 characters."],
      select: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    activationCode: {
      type: String,
      unique: true,
    },
    description: { type: String },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "seller",
    },
    zipCode: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash Password
ShopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // console.log("Encrypted password " + this.password);
});

// JWT Token
ShopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Compare password
ShopSchema.methods.comparePassword = async function (enteredPassword) {
  // console.log("enteredPassword " + enteredPassword);
  return bcrypt.compare(enteredPassword, this.password);
};
const Shop = mongoose.model("Shop", ShopSchema);
export default Shop;
