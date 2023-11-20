import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/updateCart";
import { decimals } from "../utils/updateCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

export const cartSlice = createSlice({
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload
        const existItem = state.cartItems.find((x) => item._id === x._id)
        if(existItem){
            state.cartItems = state.cartItems.map((x) => existItem._id === x._id ? item : x)
        }
        else{
            state.cartItems = [...state.cartItems,item];
        }
        return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((x) => x._id !== id)
      return updateCart(state)
    }
  },
  name: "cart",
  initialState,
});

export default cartSlice.reducer;
export const {addToCart, removeFromCart} = cartSlice.actions;
