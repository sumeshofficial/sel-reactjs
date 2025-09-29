import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartSlice from "./cartSlice";
import ordersSlice from "./ordersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartSlice,
    orders: ordersSlice,
  },
});
