import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    addUserToLocal: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    deleteUserFromLocal: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;

export const { addUserToLocal, deleteUserFromLocal } = authSlice.actions;
