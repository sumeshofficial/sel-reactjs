import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { checkoutProduct } from "./cartSlice";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { deleted: true });
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkoutProduct.fulfilled, (state, action) => {
        state.items = state.items.map((product) =>
          product.id === action.payload.productId
            ? { ...product, sold: true }
            : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
