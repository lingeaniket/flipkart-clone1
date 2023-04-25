
import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from '../Components/Features/User/userCartSlice'
import productReducer from '../Components/Features/User/productsSlice'
import wishListReducer from '../Components/Features/User/userWishListSlice'

export default configureStore({
    reducer: {
        cartState: userCartReducer,
        productState : productReducer,
        wishListState: wishListReducer,
    }
})