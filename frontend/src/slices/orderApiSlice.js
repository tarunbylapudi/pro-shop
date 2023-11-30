import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderItems) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: orderItems,
      }),
    }),
    getOrder: builder.query({
      query: (orderID) => ({
        url: `${ORDERS_URL}/${orderID}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: (orderID) => ({
        url: `${ORDERS_URL}/myOrders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery, useGetOrdersQuery } = orderApiSlice;
