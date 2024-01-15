import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateOTP from "../utils/generateOTP.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    otp: String,
    otpExpire: Date,
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//generate and hash forgot password token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash the token and set it to resetPasswordToken feild.

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set expire time

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.getOTP = function () {
  //create OTP
  const otp = generateOTP(5);

  //set expire time
  this.otp = otp;
  this.otpExpire = Date.now() + 5 * 60 * 1000;

  return otp;
};

userSchema.methods.verifyOTP = function (enteredOTP) {
  console.log(this.otp);
  console.log(enteredOTP, "e");
  console.log(enteredOTP === this.otp);
  return enteredOTP === this.otp;
};

const User = mongoose.model("User", userSchema);

export default User;
