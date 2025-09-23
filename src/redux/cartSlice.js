import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchCart = createAsyncThunk(
  "carts/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        return { id: cartSnap.id, ...cartSnap.data() };
      } else {
        return { id: userId, products: [], count: 0 };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartSnap = await getDoc(cartRef);

      if (!cartSnap.exists()) return rejectWithValue("Cart not found");

      const products = cartSnap
        .data()
        .products.filter((p) => p.id !== productId);

      await updateDoc(cartRef, {
        products,
        count: products.length,
      });

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.products.push(action.payload);
      state.cart.count = state.cart.products.length;
    },
    deleteCartProduct: (state, action) => {
      state.cart.products = state.cart.products.filter(
        (item) => item.productId !== action.payload
      );
      state.cart.count = state.cart.products.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart.products = state.cart.products.filter(
          (p) => p.id !== action.payload
        );
        state.cart.count = state.cart.products.length;
      });
  },
});

export const { deleteCartProduct, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
