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
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query({
      query:()=>({
        url: `${USERS_URL}/profile`,
        method:"GET"
      }),
      keepUnusedDataFor:5
    }),
    updateProfile: builder.mutation({
      query:(body)=>({
        url: `${USERS_URL}/profile`,
        method:"PUT",
        body
      }),
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetProfileQuery, useUpdateProfileMutation } =
  authApiSlice;
