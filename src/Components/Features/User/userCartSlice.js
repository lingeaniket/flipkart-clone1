import { createSlice } from "@reduxjs/toolkit";

export const userCartSlice = createSlice({
    name: "userCart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        saveLaterItems: localStorage.getItem("saveLaterItems") ? JSON.parse(localStorage.getItem("saveLaterItems")) : [],
        recentlyViewed: localStorage.getItem("recentlyViewed") ? JSON.parse(localStorage.getItem("recentlyViewed")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push({ id: action.payload, quantity: 1 });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        removeFromCart: (state, action) => {
            const idx = state.cartItems.findIndex((item) => item.id === action.payload);
            if (idx > -1) {
                state.cartItems.splice(idx, 1);
            }
            const idx2 = state.saveLaterItems.findIndex((item) => item.id === action.payload);
            if (idx2 > -1) {
                state.saveLaterItems.splice(idx2, 1);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            return state;
        },
        incrementQuantity: (state, action) => {
            const idx = state.cartItems.findIndex((item) => item.id === action.payload);
            state.cartItems[idx].quantity++;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        decrementQuantity: (state, action) => {
            const idx = state.cartItems.findIndex((item) => item.id === action.payload);
            if (state.cartItems[idx].quantity > 1) {
                state.cartItems[idx].quantity--;
            }
            console.log(state.cartItems[idx].quantity);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        updateByValue: (state, action) => {
            const idx = state.cartItems.findIndex((item) => item.id === action.payload.id);
            state.cartItems[idx].quantity = action.payload.setValue;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        addToSaveLater: (state, action) => {
            const idx = state.cartItems.findIndex((item) => item.id === action.payload);
            state.saveLaterItems.push(state.cartItems.splice(idx, 1)[0]);

            // state.saveLaterItems.push(action.payload);
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        moveToCart: (state, action) => {
            const idx = state.saveLaterItems.findIndex((item) => item.id === action.payload);
            state.cartItems.push(state.saveLaterItems.splice(idx, 1)[0]);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            return state;
        },
        updateRecentlyViewed: (state, action) => {
            const id = action.payload;
            const isViewed = state.recentlyViewed.some((itemId) => {
                return itemId === id;
            });
            if (isViewed) {
                const index = state.recentlyViewed.findIndex((itemId) => itemId === id);
                state.recentlyViewed.splice(index, 1);
                state.recentlyViewed.unshift(id);
                localStorage.setItem("recentlyViewed", JSON.stringify(state.recentlyViewed));
            } else {
                state.recentlyViewed.unshift(id);
                localStorage.setItem("recentlyViewed", JSON.stringify(state.recentlyViewed));
            }
        },
    },
});

export const {
    addToCart,
    updateRecentlyViewed,
    removeFromCart,
    incrementQuantity,
    addToSaveLater,
    removeFromSaveLater,
    moveToCart,
    decrementQuantity,
    updateByValue,
    clearCart,
} = userCartSlice.actions;

export default userCartSlice.reducer;
