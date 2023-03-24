import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// const ObjectID = Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
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
      required: [true, "Please enter you rpassword."],
      min: [6, "Password should be greater than 6 characters."],
      select: false,
    },
    address: String,
    role: {
      type: String,
      default: "user",
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

// Hash

const User = mongoose.model("User", UserSchema);
export default User;
