import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const loaderSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        show: (state, action) => {
            state.isLoading = true;
        },
        hide: (state, action) => {
            console.log(state, action);
            state.isLoading = false;
        },
    },
});

export const { show, hide } = loaderSlice.actions;

export default loaderSlice.reducer;
