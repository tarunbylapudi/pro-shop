import mongoose from "mongoose";
import calcPrices from "../utils/calcPrices.js";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
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

    currentCart: [productSchema],
    wishList: [productSchema],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
  },
  { timestamps: true }
);

cartSchema.pre("save", function () {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrices(this.currentCart)
  this.itemsPrice = itemsPrice;
  this.taxPrice = taxPrice;
  this.shippingPrice = shippingPrice;
  this.totalPrice = totalPrice;
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
