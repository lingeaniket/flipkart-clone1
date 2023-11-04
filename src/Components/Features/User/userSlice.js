import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userLoggedIn: localStorage.getItem("isUserLoggedIn") ? JSON.parse(localStorage.getItem("isUserLoggedIn")) : false,
        savedAddresses: localStorage.getItem("savedAddresses") ? JSON.parse(localStorage.getItem("savedAddresses")) : [],
        userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {},
        loginOpen: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.userLoggedIn = true;
            if (action.payload) {
                state.userData.email = action.payload;
            }
            localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
            return state;
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(state.userData));
            return state;
        },
        logoutUser: (state) => {
            state.userLoggedIn = false;
            localStorage.setItem("isUserLoggedIn", JSON.stringify(state.userLoggedIn));
            return state;
        },
        addNewAddress: (state, action) => {
            state.savedAddresses.push(action.payload);
            localStorage.setItem("savedAddresses", JSON.stringify(state.savedAddresses));
        },
        updateSavedAddress: (state, action) => {
            state.savedAddresses[Number(action.payload.index)] = action.payload.formData;
            localStorage.setItem("savedAddresses", JSON.stringify(state.savedAddresses));
        },
        deleteAddress: (state, action) => {
            const id = action.payload;
            state.savedAddresses.splice(id, 1);
        },
        openLogin: (state, action) => {
            state.loginOpen = true;
        },
        closeLogin: (state, action) => {
            state.loginOpen = false;
        },
    },
});

export const { loginUser, updateUserData, logoutUser, addNewAddress, updateSavedAddress, deleteAddress, openLogin, closeLogin } =
    userSlice.actions;

export default userSlice.reducer;
