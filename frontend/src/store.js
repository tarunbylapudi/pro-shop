import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import logger from "redux-logger";

const middleware = (getDefaultMiddleware) => {
  const middlewares = [apiSlice.middleware];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }
  return getDefaultMiddleware().concat(middlewares);
};

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware,
  devTools: true,
});

export default store;
