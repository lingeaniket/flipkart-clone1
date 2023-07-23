import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userLoggedIn : localStorage.getItem('isUserLoggedIn') || false,
    },
    reducers: {
        loginUser : (state, action) =>{
            state.userLoggedIn = true;
        },
        logoutUser : (state, action) =>{
            state.userLoggedIn = false;
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;


