import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/updateCart";
import updateCartItems from "../utils/updateCartItems";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], wishList: [], shippingAddress: {}, paymentMethod: "PayPal" };

export const cartSlice = createSlice({
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems = updateCartItems(state.cartItems, item)
      return updateCart(state);
    },
    addToWishList: (state, action) => {
      const item = action.payload;
      state.wishList = updateCartItems(state.wishList, item)
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      return updateCart(state);
    },
    removeFromWishList: (state, action) => {
      const id = action.payload;
      state.wishList = state.wishList.filter((x) => x._id !== id);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    saveCart: (state, action) => {
      const { cartItems, wishList } = action.payload
      state.cartItems = cartItems;
      state.wishList = wishList;
      return updateCart(state);
    },
  },
  name: "cart",
  initialState,
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  addToWishList, removeFromWishList,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
  saveCart,
} = cartSlice.actions;
