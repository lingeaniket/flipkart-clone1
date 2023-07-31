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
            const date = new Date();
            console.log(date.getTime())
            console.log(date.getTime())
            console.log(date.getTime())
            const order_id = `${Number(parseInt(uuidv4().replace(/-/g, ''), 16).toString().slice(2, 5) + date.getTime())}0`
            const { products } = action.payload;

            console.log(order_id)

            //order_id=OD428729702139432100&item_id=428729702139432100&unit_id=428729702139432100000
            const newProducts = products.map((product, index) => {
                const item_id = order_id + index
                console.log(item_id, index)
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
            obj['order_status'] = 'on_the_way';
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