import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    successSnackbarOpen: false,
    snackbarMessage: '',
    errorSnackbarOpen: false,
    infoSnackbarOpen: false
};

export const snackbarSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        showSuccess: (state, action) => {
            state.successSnackbarOpen = true;
            state.snackbarMessage = action.payload
        },
        showError: (state, action) => {
            console.log(state, action);
            state.errorSnackbarOpen = true;
            state.snackbarMessage = action.payload
        },
        clear: (state, action) => {
            state.successSnackbarOpen = false;
            state.errorSnackbarOpen = false;
            state.infoSnackbarOpen = false
        },
    },
});

export const { showSuccess, showError, clear } = snackbarSlice.actions;

export default snackbarSlice.reducer;
