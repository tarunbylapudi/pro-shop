import mongoose from "mongoose";
import calcPrices from "../utils/calcPrices.js";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  // image: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [productSchema],
    wishList: [productSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
