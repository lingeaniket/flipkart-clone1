import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userLoggedIn : localStorage.getItem('isUserLoggedIn') || false,
        savedAddresses : (localStorage.getItem('savedAddresses') ? JSON.parse(localStorage.getItem('savedAddresses'))  : []),
    },
    reducers: {
        loginUser : (state, action) =>{
            state.userLoggedIn = true;
        },
        logoutUser : (state, action) =>{
            state.userLoggedIn = false;
        },
        addNewAddress : (state, action) =>{
            state.savedAddresses.push(action.payload);
            localStorage.setItem('savedAddresses', JSON.stringify(state.savedAddresses));
        },
        updateSavedAddress : (state, action) =>{
            console.log(action.payload);

            // const {index, formData} = action.payload;

            // const addresses = state.savedAddresses;
            // addresses[]

            state.savedAddresses[Number(action.payload.index)] = action.payload.formData
            localStorage.setItem('savedAddresses', JSON.stringify(state.savedAddresses));
        }
    }
})

export const { loginUser, logoutUser, addNewAddress, updateSavedAddress } = userSlice.actions;

export default userSlice.reducer;


