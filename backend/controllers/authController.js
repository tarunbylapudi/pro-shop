import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import createToken from "../utils/createToken.js";
import errorResponse from "../utils/errorResponse.js";
import sendMail from "../utils/sendMail.js";

//@desc generate OTP
//@route POST /api/auth/login/otp
//@access public
const loginWithOTP = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;

  const user = await User.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new errorResponse("Invalid OTP!", 500));
  }

  if (!user.verifyOTP(otp)) {
    return next(new errorResponse("Invalid OTP!", 500));
  }

  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();

  createToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//@desc generate OTP
//@route POST /api/auth/generate/otp
//@access public
const generateOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new errorResponse("Email Not Found", 404));
  }

  const otp = await user.getOTP();
  await user.save();

  const message = `your OTP for login is ${otp}, It is valid for next 5 minutes`;

  try {
    sendMail({ email: user.email, subject: "Login OTP", message });
    res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return next(new errorResponse("email could not be sent!", 500));
  }
});

export { loginWithOTP, generateOtp };
