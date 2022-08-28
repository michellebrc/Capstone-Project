import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./Reducer/cart";
import authReducer from "./Reducer/auth";
import userReducer from "./Reducer/user";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    authStore: authReducer,
    userStore: userReducer,
  },
});

store.dispatch(getTotals);
