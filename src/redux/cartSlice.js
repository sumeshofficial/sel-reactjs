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
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartSnap = await getDoc(cartRef);

      const checkoutProducts = cartSnap
        .data()
        .products.filter((p) => !p.sold && !p.deleted)
        .map((p) => p.id);

      for (const productId of checkoutProducts) {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.data().sold || productSnap.data().deleted) {
          return rejectWithValue("Product is already sold or deleted");
        }

        await updateDoc(productRef, { sold: true });
        const cartsColRef = collection(db, "carts");
        const q = query(
          cartsColRef,
          where("productIds", "array-contains", productId)
        );
        const querySnapshot = await getDocs(q);

        for (const cartDoc of querySnapshot.docs) {
          const cartData = cartDoc.data();

          if (cartDoc.id === userId) {
            const newProducts = cartData.products.filter(
              (p) => p.sold && p.deleted
            );
            await updateDoc(cartDoc.ref, {
              products: newProducts,
              count: newProducts.length,
              productIds: newProducts.filter((p) => !p.id),
            });
          } else {
            const updatedProducts = cartData.products.map((p) =>
              p.id === productId ? { ...p, sold: true } : p
            );
            await updateDoc(cartDoc.ref, { products: updatedProducts });
          }
        }
      }

      return { checkoutProducts, isCurrentUser: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unAvailable = createAsyncThunk(
  "cart/unAvailable",
  async (productId, { rejectWithValue }) => {
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
          (product) => product !== action.payload
        );
        state.cart.count = state.cart.products.length;
      })
      .addCase(unAvailable.fulfilled, (state, action) => {
        if (!state.cart) return;
        state.cart.products = state.cart.products.map((product) =>
          product.id === action.payload.productId
            ? { ...product, deleted: true }
            : product
        );
        state.cart.productIds = state.cart.products
          .filter((product) => !product.deleted)
          .map((product) => product.id);
        state.cart.count = state.cart.products.filter(
          (product) => !product.deleted
        ).length;
      })
      .addCase(checkoutProduct.fulfilled, (state, action) => {
        action.payload.checkoutProducts.forEach((productId) => {
          if (action.payload.isCurrentUser) {
            state.cart.products = state.cart.products.filter(
              (product) => product.id !== productId
            );
            state.cart.productIds = state.cart.productIds.filter(
              (id) => id !== productId
            );
            state.cart.count = state.cart.products.length;
          } else {
            state.cart.products = state.cart.products.map((product) =>
              product.id === productId ? { ...product, sold: true } : product
            );
          }
        });
      })
      .addCase(checkoutProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteCartProduct, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
