import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        savedAddress: (localStorage.getItem("savedAddress") !== null ? JSON.parse(localStorage.getItem("savedAddress")) : []),
        orders: (localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : []),
        cancelledOrders: (localStorage.getItem("cancelledOrders") ? JSON.parse(localStorage.getItem("cancelledOrders")) : []),
        currentOrderDetails : []
    },
    reducers: {
        addOrder: (state, action) => {
            state.cartItems.push({ value: action.payload, quantity: 1 });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        saveAddress: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload.id);
            if (idx > -1) {
                state.cartItems.splice(idx, 1);
            }
            const idx2 = state.saveLaterItems.findIndex(item => item.value.id === action.payload.id);
            if (idx2 > -1) {
                state.saveLaterItems.splice(idx2, 1);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("saveLaterItems", JSON.stringify(state.saveLaterItems));
            return state;
        },
        CancelOrder: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload);
            state.cartItems[idx].quantity++;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
        currentOrderAddressInfo: (state, action) => {
            
        },
        currentOrderCardInfo: (state, action) => {
            const idx = state.cartItems.findIndex(item => item.value.id === action.payload);
            if (state.cartItems[idx].quantity > 1) {
                state.cartItems[idx].quantity--;
            }
            console.log(state.cartItems[idx].quantity)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        }
    }
})

export const { addOrder, CancelOrder, addAddress, currentOrderAddressInfo, currentOrderCardInfo } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;


