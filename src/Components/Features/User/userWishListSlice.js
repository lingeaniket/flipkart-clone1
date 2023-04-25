import { createSlice } from "@reduxjs/toolkit";

export const userWishListSlice = createSlice({
    name: "userCart",
    initialState: {
        wishListItems: (localStorage.getItem("wishListItems") !== null ? JSON.parse(localStorage.getItem("wishListItems")) : []),
        // saveLaterItems: (localStorage.getItem("saveLaterItems") ? JSON.parse(localStorage.getItem("saveLaterItems")) : []),
    },
    reducers: {
        addToWishList: (state, action) => {
            state.wishListItems.push(action.payload);
            // console.log('added to wish list')
            localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
            console.log(JSON.parse(localStorage.getItem("wishListItems")))
            return state;
        },
        removeFromWishList: (state, action) => {
            const idx = state.wishListItems.findIndex(item => item.id === action.payload);
            if (idx > -1) {
                state.wishListItems.splice(idx, 1);
            }
            // console.log('removed item')
            localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems));
            console.log(JSON.parse(localStorage.getItem("wishListItems")))
            return state;
        },
    }
})

export const { addToWishList, removeFromWishList} = userWishListSlice.actions;

export default userWishListSlice.reducer;


