import { createSlice } from "@reduxjs/toolkit";

export const userCartSlice = createSlice({
    name: "userCart",
    initialState: {
        cartItems: [],
        cartTotal: 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push({value: action.payload, quantity: 1});
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
            },
        removeFromCart: (state, action) => {
            console.log(action.payload);
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload.id);
            console.log(idx);
            state.cartItems.splice(idx, 1);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        }
    }
})

export const { addToCart, removeFromCart } = userCartSlice.actions;

export default userCartSlice.reducer;