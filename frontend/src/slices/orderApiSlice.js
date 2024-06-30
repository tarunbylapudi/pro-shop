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
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderInvoice: builder.query({
      query: (orderID) => ({
        url: `${ORDERS_URL}/${orderID}/invoice`,
        method: "GET",
      }),
    }),
    updateOrderToDelivered: builder.mutation({
      query: (orderID) => ({
        url: `${ORDERS_URL}/${orderID}/delivered`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderToDeliveredMutation,
  useGetOrderInvoiceQuery,
} = orderApiSlice;
