import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSavedCart: builder.query({
            query: () => ({
                url: `${CART_URL}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        saveCart: builder.mutation({
            query: (cartItems) => ({
                url: `${CART_URL}`,
                method: "POST",
                body: cartItems,
            }),
        }),
        getWishList: builder.query({
            query: () => ({
                url: `${CART_URL}/wishList`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        saveWishList: builder.mutation({
            query: (wishList) => ({
                url: `${CART_URL}/wishList`,
                method: "POST",
                body: wishList,
            }),
        }),
    })
})

export const { useCreateCartMutation, useGetSavedCartQuery, useGetWishListQuery, useSaveCartMutation, useSaveWishListMutation } = cartApiSlice