import { createSlice } from "@reduxjs/toolkit";

export const userWishListSlice = createSlice({
    name: "userWishList",
    initialState: {
        wishListItems:
            localStorage.getItem("wishListItems") !== null && localStorage.getItem("isUserLoggedIn")
                ? JSON.parse(localStorage.getItem("wishListItems"))
                : [],
        loginForWishlist: false,
        productToAdd: null,
    },
    reducers: {
        addToWishList: (state, action) => {
            state.wishListItems.push(action.payload);
            localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
            return state;
        },
        removeFromWishList: (state, action) => {
            const idx = state.wishListItems.findIndex((item) => item === action.payload);
            if (idx > -1) {
                state.wishListItems.splice(idx, 1);
            }
            localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
            return state;
        },
        startLoginWishlist: (state, action) => {
            state.loginForWishlist = true;
            state.productToAdd = action.payload;
            console.log(action.payload);
        },
        stopForLoginWishlist: (state, action) => {
            state.loginForWishlist = false;
            state.productToAdd = null;
        },
    },
});

export const { addToWishList, removeFromWishList, startLoginWishlist, stopForLoginWishlist } = userWishListSlice.actions;

export default userWishListSlice.reducer;
