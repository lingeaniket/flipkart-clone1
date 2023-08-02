import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { checkStatusAndUpdate, layoutDelivery } from "./functions";

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

        cancelOrder: (state, action) => {
            const order_id = action.payload;
            const idx = state.orders.findIndex((order) => order.order_id === order_id);

            // state.orders[idx].order_status = "cancelled"

            const index = state.orders[idx].order_status_index + 1;
            state.orders[idx] = {
                ...state.orders[idx],
                order_status: "cancelled",
                order_status_index: index,
                order_timeline_length: index,
                order_timeline : {...state.orders[idx].order_timeline, cancelled: new Date().getTime()}
            }
            // state.orders[idx].order_status_index = index
            // state.orders[idx].order_timeline_length = index
            localStorage.setItem("orders", JSON.stringify(state.orders));
        },

        updateOrdersStatus: (state, action) => {
            if (state.orders.length > 0) {
                const newOrders = state.orders.map((order) => {
                    return checkStatusAndUpdate(order);
                })
                state.orders = newOrders;
                console.log(newOrders)
                localStorage.setItem("orders", JSON.stringify(newOrders));
            }
        },

        addOrder: (state, action) => {
            const obj = {};
            const date = new Date();
            const order_id = `${Number(parseInt(uuidv4().replace(/-/g, ''), 16).toString().slice(2, 5) + date.getTime())}0`
            const { products } = action.payload;

            const newProducts = products.map((product, index) => {
                const item_id = order_id + index
                const unitArr = []
                for (let i = 0; i < product.quantity; i++) {
                    const unit_id = `${item_id}0${i}`
                    unitArr.push({
                        order_id, item_id, unit_id, unit: product.product,
                    });
                }
                return unitArr;
            }).flat(1);

            obj['order_details'] = { ...action.payload, products: newProducts, price_details: state.orderPrice };
            obj['order_date'] = date.getTime();
            obj['order_id'] = order_id;
            obj['order_status'] = 'confirmed';
            obj['order_status_index'] = 1;
            obj['order_timeline'] = layoutDelivery(date.getTime());
            obj['order_timeline_length'] = 6;
            console.log(obj)

            state.orders.unshift(obj);
            localStorage.setItem("orders", JSON.stringify(state.orders));
            return state;
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

export const { updateOrderPrice, updateOrdersStatus, addOrder, addSingleOrder, removeSingleOrder, incrementSingleOrdeQuantity, decrementSingleOrdeQuantity, updateSingleOrdeQuantityByValue, cancelOrder, checkoutInProgress, checkoutCompleted, } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;