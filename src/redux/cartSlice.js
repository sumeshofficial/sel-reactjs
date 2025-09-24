import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
      const productIds = cartSnap
        .data()
        .productIds.filter((p) => p !== productId);

      await updateDoc(cartRef, {
        products,
        count: products.length,
        productIds,
      });

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkoutProduct = createAsyncThunk(
  "cart/checkoutProduct",
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { sold: true });

      const cartRef = collection(db, "carts");
      const q = query(
        cartRef,
        where("productIds", "array-contains", productId)
      );
      const querySnapshot = await getDocs(q);

      const updates = querySnapshot.docs.map(async (cartDoc) => {
        const cartData = cartDoc.data();

        if (cartDoc.id === userId) {
          const newProducts = cartData.products.filter(
            (p) => p.id !== productId
          );
          const newProductIds = cartData.productIds.filter(
            (p) => p.id !== productId
          );
          await updateDoc(cartDoc.ref, {
            products: newProducts,
            count: newProducts.length,
            productIds: newProductIds,
          });
          return { userId: cartDoc.id, productId, isCurrentUser: true };
        }

        const updatedProducts = cartData.products.map((product) =>
          product.id === productId ? { ...product, sold: true } : product
        );
        await updateDoc(cartDoc.ref, { products: updatedProducts });
        return { userId: cartDoc.id, productId, isCurrentUser: false };
      });

      await Promise.all(updates);

      return { productId, isCurrentUser: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unAvailable = createAsyncThunk(
  "cart/unAvailable",
  async ( productId , { rejectWithValue }) => {
    try {
      const cartRef = collection(db, "carts");
      const q = query(
        cartRef,
        where("productIds", "array-contains", productId)
      );
      const querySnapshot = await getDocs(q);

      const updates = querySnapshot.docs.map(async (cartDoc) => {
        const cartData = cartDoc.data();

        const updatedProducts = cartData.products.map((product) =>
          product.id === productId ? { ...product, deleted: true } : product
        );

        await updateDoc(cartDoc.ref, { products: updatedProducts });
        return { userId: cartDoc.id, productId, isCurrentUser: false };
      });

      await Promise.all(updates);

      return { productId, isCurrentUser: true };
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
      state.cart.productIds = state.cart.productIds || [];
      state.cart.productIds.push(action.payload.id);
      state.cart.count = state.cart.products.length;
    },
    deleteCartProduct: (state, action) => {
      if (!state.cart) return;
      state.cart.products = state.cart.products.filter(
        (item) => item.id !== action.payload
      );
      state.cart.productIds = state.cart.productIds.filter(
        (id) => id !== action.payload
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
        if (!state.cart) return;
        state.cart.products = state.cart.products.filter(
          (product) => product.id !== action.payload
        );
        state.cart.productIds = state.cart.productIds.filter(
          (product) => product !== action.payload.productId
        );
        state.cart.count = state.cart.products.length;
      })
      .addCase(unAvailable.fulfilled, (state, action) => {
        if (!state.cart) return;
        state.cart.products = state.cart.products.map((product) =>
          product.id === action.payload.productId ? { ...product, deleted: true } : product
        );
        state.cart.productIds = state.cart.products
          .filter((product) => !product.deleted)
          .map((product) => product.id);
        state.cart.count = state.cart.products.filter((product) => !product.deleted).length;
      })
      .addCase(checkoutProduct.fulfilled, (state, action) => {
        if (action.payload.isCurrentUser) {
          state.cart.products = state.cart.products.filter(
            (product) => product.id !== action.payload.productId
          );
          state.cart.productIds = state.cart.productIds.filter(
            (product) => product.id !== action.payload.productId
          );
          state.cart.count = state.cart.products.length;
        } else {
          state.cart.products = state.cart.products.map((product) =>
            product.id === action.payload.productId ? { ...product, sold: true } : product
          );
        }
      });
  },
});

export const { deleteCartProduct, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
