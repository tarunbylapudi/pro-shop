import { PAYMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/checkout`,
        method: "POST",
        body,
      }),
    }),
    paymentVerification: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/verification`,
        method: "POST",
        body,
      }),
    }),
    getRzpKay: builder.query({
      query: () => ({
        url: `${PAYMENT_URL}/getRzpKey`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetRzpKayQuery,
  useCheckoutMutation,
  usePaymentVerificationMutation,
} = cartApiSlice;
