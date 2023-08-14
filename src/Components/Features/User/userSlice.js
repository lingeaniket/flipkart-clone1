import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userLoggedIn: (localStorage.getItem('isUserLoggedIn')) ? JSON.parse(localStorage.getItem('isUserLoggedIn')) : false,
        savedAddresses: (localStorage.getItem('savedAddresses') ? JSON.parse(localStorage.getItem('savedAddresses')) : []),
        userData: (localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}),
    },
    reducers: {
        loginUser: (state) => {
            state.userLoggedIn = true;
            console.log('user logged in')
            localStorage.setItem('isUserLoggedIn', JSON.stringify(true));
            return state;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(state.userData));
            return state;
        },
        logoutUser: (state) => {
            state.userLoggedIn = false;
            localStorage.setItem('isUserLoggedIn', JSON.stringify(state.userLoggedIn));
            return state
        },
        addNewAddress: (state, action) => {
            state.savedAddresses.push(action.payload);
            localStorage.setItem('savedAddresses', JSON.stringify(state.savedAddresses));
        },
        updateSavedAddress: (state, action) => {
            console.log(action.payload);
            state.savedAddresses[Number(action.payload.index)] = action.payload.formData
            localStorage.setItem('savedAddresses', JSON.stringify(state.savedAddresses));
        }
    }
})

export const { loginUser, updateUserData, logoutUser, addNewAddress, updateSavedAddress } = userSlice.actions;

export default userSlice.reducer;


