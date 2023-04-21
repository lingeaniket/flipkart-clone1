
import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from '../Components/Features/User/userCartSlice'

export default configureStore({
    reducer: {
        cartState: userCartReducer,
    }
})