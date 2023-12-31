import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";
import errorResponse from "../utils/errorResponse.js";
import addCartItems from "../utils/addCartItems.js";

//@desc createCart
//@route POST /api/cart/create
//@access private
export const createCart = asyncHandler(async (req, res, next) => {
  const isCartCreated = await Cart.findOne({ user: req.user._id });

  if (!isCartCreated) {
    const cart = new Cart();
    cart.user = req.user._id;
    const createdCart = await cart.save();
    console.log(createdCart, "createdCart");
    return res.status(200).json({
      message: `Cart created successfully with ID : ${createdCart._id}`,
    });
  }
  console.log(isCartCreated, "isCartCreated");
  res.status(200).json({
    message: `Cart created successfully with ID : ${isCartCreated._id}`,
  });
});

//@desc add wishList
//@route POST /api/cart/wishList
//@access private
export const addToWishList = asyncHandler(async (req, res, next) => {
  const { wishList } = req.body;
  if (wishList.length === 0) {
    return res.status(200).json({ message: "WishList Saved" });
  }
  const cart = await Cart.findOne({ user: req.user._id });
  cart.wishList = addCartItems(cart.wishList, wishList);
  cart.wishList = wishList.map((item) => ({
    ...item,
    product: item._id,
    _id: item._id,
  }));
  const updatedWishList = await cart.save();
  res.status(200).json({ message: "Wishlist added successfully!" });
});

//@desc get wishList
//@route GET /api/cart/wishList
//@access private
export const getWishList = asyncHandler(async (req, res, next) => {
  const { wishList } = await Cart.find({ user: req.user._id });
  res.status(200).json({ wishList });
});

//@desc getCart
//@route POST /api/cart
//@access private
export const getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  res.status(200).json(cart);
});

//@desc saveCart
//@route POST /api/cart
//@access private
export const saveCart = asyncHandler(async (req, res, next) => {
  const { cartItems } = req.body;
  if (cartItems.length === 0) {
    return res.status(200).json({ message: "Cart Saved" });
  }
  const cart = await Cart.findOne({ user: req.user._id });
  cart.cartItems = addCartItems(cart.cartItems, cartItems);
  cart.cartItems = cartItems.map((item) => ({
    ...item,
    product: item._id,
    _id: item._id,
  }));
  const savedCart = await cart.save();
  res.status(200).json(savedCart);
});
