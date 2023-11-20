import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    addUserToLocal: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export default authSlice.reducer;

export const { addUserToLocal } = authSlice.actions;
