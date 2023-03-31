import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

// Hash Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 8);
  console.log("Encrypted password " + this.password);
});

// JWT Token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("enteredPassword " + enteredPassword);
  return bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
