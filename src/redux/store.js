import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartSlice,
  },
});
