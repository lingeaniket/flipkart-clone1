import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        savedAddress: (localStorage.getItem("savedAddress") ? JSON.parse(localStorage.getItem("savedAddress")) : []),
        savedPayment: (localStorage.getItem("savedPayment") ? JSON.parse(localStorage.getItem("savedPayment")) : []),
        orders: (localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : []),
        cancelledOrders: (localStorage.getItem("cancelledOrders") ? JSON.parse(localStorage.getItem("cancelledOrders")) : []),
        currentOrderDetails: [],
        lastId: localStorage.getItem("lastId") ? JSON.parse(localStorage.getItem("lastId")) : 0,
        checkout: false,
        fromCart: false
    },
    reducers: {
        addOrder: (state, action) => {
            const obj = {};
            obj['orderShipping'] = state.currentOrderDetails[0];
            const date = new Date();
            obj['orderDate'] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
            obj['orderId'] = state.currentOrderDetails[2];
            obj['orderProducts'] = action.payload.products;
            obj['orderTotal'] = action.payload.totalPrice;
            obj['orderDeliveryFree'] = action.payload.freeDelivery;
            state.orders.unshift(obj);
            localStorage.setItem("orders", JSON.stringify(state.orders));
            // state.currentOrderDetails = [];
            return state;
        },
        clearCurrentOrder : (state) => {
            state.currentOrderDetails = [];
            return state;

        },
        saveAddress: (state) => {
            state.savedAddress = state.currentOrderDetails[0]
            localStorage.setItem("savedAddress", JSON.stringify(state.savedAddress));
        },
        savePayment: (state) => {
            state.savedPayment = state.currentOrderDetails[1]
            localStorage.setItem("savedPayment", JSON.stringify(state.savedPayment));
        },
        handleCurrentOrderId: (state, action) => {
            state.currentOrderDetails.push(action.payload);
            state.lastId += 1;
            localStorage.setItem('lastId', JSON.stringify(state.lastId));
        },
        cancelOrder: (state, action) => {
            const obj ={}
            const idx = state.orders.findIndex(order => order.orderId === action.payload.id)
            obj['orderId'] = action.payload.id;
            obj['orderDetails'] = state.orders.splice(idx, 1)[0];
            obj['cancelledOrderReason'] = action.payload.reason;
            state.cancelledOrders.unshift(obj);
            localStorage.setItem("orders", JSON.stringify(state.orders));
            localStorage.setItem("cancelledOrders", JSON.stringify(state.cancelledOrders));
        },
        currentOrderAddressInfo: (state, action) => {
            state.currentOrderDetails.push(action.payload);
        },
        currentOrderPaymentInfo: (state, action) => {
            state.currentOrderDetails.push(action.payload);
        },
        removeLastInfo: (state) => {
            state.currentOrderDetails.pop();
        },
        checkoutInProgress: (state) => {
            state.checkout = true;
        },
        checkoutCompleted: (state) => {
            state.checkout = false;
        },
        changeFromCart: (state, action) => {
            state.fromCart = action.payload;
        }
    }
})

export const { addOrder, cancelOrder,changeFromCart, checkoutInProgress,clearCurrentOrder, checkoutCompleted, saveAddress, savePayment, currentOrderAddressInfo, currentOrderPaymentInfo, removeLastInfo, handleCurrentOrderId } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;


