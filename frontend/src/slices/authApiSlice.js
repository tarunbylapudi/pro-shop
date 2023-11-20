import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
