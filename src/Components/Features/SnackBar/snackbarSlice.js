import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
    name: "snackBar",

    initialState: {
        open: false,
        message: "",
    },

    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },

        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setOpen, setMessage } = snackBarSlice.actions;

export default snackBarSlice.reducer;
