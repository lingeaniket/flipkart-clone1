import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        orders: (localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : []),
        checkout: false,
        fromCart: false,
        singleOrder: [],
        orderPrice: 0,
    },
    reducers: {
        updateOrderPrice: (state, action) => {
            state.orderPrice = action.payload;
            return state;
        },

        addOrder: (state, action) => {
            const obj = {};
            const order_id = `FLPK-${Math.random()*100}-${uuidv4().slice(-12)}`;
            const { products,} = action.payload;
            const newProducts = products.map((product, index) =>{
                return {...product, order_product_id : `${order_id}_${index}` }
            })
            obj['orderDetails'] = { ...action.payload, products: newProducts, priceDetails: state.orderPrice };
            const date = new Date();
            obj['orderDate'] = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
            obj['orderId'] = `FLPK-${Math.random() * 100}-${order_id.slice(-12)}`;
            obj['orderStatus'] = 'ordered';
            state.orders.unshift(obj);
            localStorage.setItem("orders", JSON.stringify(state.orders));
            return state;
        },

        cancelOrder: (state, action) => {
            const idx = state.orders.findIndex(order => order.orderId === action.payload.id);
            state.orders[idx].orderStatus = "canceled";

            localStorage.setItem("orders", JSON.stringify(state.orders));
            return state
        },

        checkoutInProgress: (state) => {
            state.checkout = true;
        },

        checkoutCompleted: (state) => {
            state.checkout = false;
        },

        addSingleOrder: (state, action) => {
            state.singleOrder = [{ id: action.payload, quantity: 1 }];
        },

        incrementSingleOrdeQuantity: (state, action) => {
            state.singleOrder[0].quantity++;
        },

        decrementSingleOrdeQuantity: (state, action) => {
            if (state.singleOrder[0].quantity > 1) {
                state.singleOrder[0].quantity--;
            }
        },

        updateSingleOrdeQuantityByValue: (state, action) => {
            state.singleOrder[0].quantity = action.payload.setValue;
        },

        removeSingleOrder: (state, action) => {
            state.singleOrder = [];
        }
    }
})

export const { updateOrderPrice, addOrder, addSingleOrder, removeSingleOrder, incrementSingleOrdeQuantity, decrementSingleOrdeQuantity, updateSingleOrdeQuantityByValue, cancelOrder, checkoutInProgress, checkoutCompleted, } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;