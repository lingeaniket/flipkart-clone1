
import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from '../Components/Features/User/userCartSlice'
import productReducer from '../Components/Features/User/productsSlice'

export default configureStore({
    reducer: {
        cartState: userCartReducer,
        productState : productReducer,
    }
})