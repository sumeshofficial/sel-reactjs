import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ cartItems, address, totalPrice, userId }, { rejectWithValue }) => {
    const generateOrderNumber = () => {
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
      const rand = Math.floor(1000 + Math.random() * 9000);
      return `#${date}${rand}`;
    };
    try {
      const orderId = generateOrderNumber();
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, {
        userId,
        orderId,
        shippinpAddress: address,
        items: cartItems,
        totalPrice,
        status: "placed",
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        userId,
        shippinpAddress: address,
        items: cartItems,
        totalPrice,
        status: "placed",
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
