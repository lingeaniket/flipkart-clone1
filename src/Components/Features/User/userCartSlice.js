import { createSlice } from "@reduxjs/toolkit";

export const userCartSlice = createSlice({
    name: "userCart",
    initialState: {
        // cartItems: [],
        cartItems: (localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : []),
        saveLaterItems: (localStorage.getItem("saveLaterItems") ? JSON.parse(localStorage.getItem("saveLaterItems")) : []),
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push({value: action.payload, quantity: 1});
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
            },
        removeFromCart: (state, action) => {
            // console.log(action.payload.id);
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload.id);
            // console.log(idx);
            if(idx > -1){
            state.cartItems.splice(idx, 1);
            }
            // console.log(state.cartItems[0]);
            const idx2 = state.saveLaterItems.findIndex(item => item.value.id === action.payload.id);
            if(idx2 > -1){
                state.saveLaterItems.splice(idx2, 1);
            }
            // console.log(state.saveLaterItems[0]);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            return state;
        },
        incrementQuantity: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload);
            state.cartItems[idx].quantity++;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        decrementQuantity: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload);
            if(state.cartItems[idx].quantity > 1){
            state.cartItems[idx].quantity--;
            }
            console.log(state.cartItems[idx].quantity)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        updateByValue: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload.id);
            state.cartItems[idx].quantity = action.payload.setValue;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;

        },
        addToSaveLater: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload.value.id);
            state.cartItems.splice(idx, 1);
            state.saveLaterItems.push(action.payload);
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
            },
        moveToCart: (state, action) => {
            const idx = state.saveLaterItems.findIndex(item => item.value.id === action.payload.value.id);
            state.saveLaterItems.splice(idx, 1);
            state.cartItems.push(action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            return state;
        },
    }
})

export const { addToCart, removeFromCart, incrementQuantity, addToSaveLater, removeFromSaveLater, moveToCart, decrementQuantity, updateByValue} = userCartSlice.actions;

export default userCartSlice.reducer;