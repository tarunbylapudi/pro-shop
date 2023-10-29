import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ProductSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const { useGetProductsQuery } = ProductSlice;
