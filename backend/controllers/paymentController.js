import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import errorResponse from "../utils/errorResponse.js";
import sendMail from "../utils/sendMail.js";
import razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/OrderModel.js";

dotenv.config();

//@desc create paymentOrderID
//@route POST /api/payment/checkout
//@access private
const ctreatePaymentOrder = asyncHandler(async (req, res, next) => {
  // receipt: "receipt#1",
  // notes: {
  //   key1: "value3",
  //   key2: "value2",
  // },
  console.log(req.body.orderID);
  const order = await Order.findById(req.body.orderID);
  console.log(order);

  const options = {
    amount: Number(order.totalPrice * 100),
    currency: "INR",
  };

  try {
    //rezorPay instance
    const instance = new razorpay({
      key_id: process.env.RZP_KEY,
      key_secret: process.env.RZP_SECRET,
    });
    const rzpOrder = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      ...rzpOrder,
    });
  } catch (error) {
    console.log(error);
    return next(new errorResponse(error.description, 400));
  }
});

//@desc payment verification
//@route POST /api/payment/verification
//@access private
const paymentVarification = asyncHandler(async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderID,
  } = req.body;

  const order = await Order.findById(orderID);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedsgnature = crypto
    .createHmac("sha256", process.env.RZP_SECRET)
    .update(body.toString())
    .digest("hex");
  const isauth = expectedsgnature === razorpay_signature;
  if (isauth) {
    order.paymentResult.razorpay_order_id = razorpay_order_id;
    order.paymentResult.razorpay_payment_id = razorpay_payment_id;
    order.paymentResult.razorpay_signature = razorpay_signature;
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

    res.status(200).json({ message: "Payment Successfull!" });
  } else {
    return next(new errorResponse(error.description, 400));
  }
});

//@desc get rzp key
//@route GET /api/payment/getRzpKey
//@access private
const getRzpKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({ key: process.env.RZP_KEY });
});

export { ctreatePaymentOrder, paymentVarification, getRzpKey };
