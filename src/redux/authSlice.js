import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        userLoggedIn: false,
        loading: true,
    },
    reducers: {
        currentUser: (state, action) => {
            state.currentUser = action.payload
        },
        userLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload
        },
        loading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { currentUser, userLoggedIn, loading } = authSlice.actions;

export default authSlice.reducer
