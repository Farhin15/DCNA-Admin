// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { postApi } from 'feature/api/apiSlice';
import templateReducer from './reducers/templateSlice';
import requestReducer from './reducers/requestSlice';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        menu: reducers,
        template: templateReducer,
        request: requestReducer,
        [postApi.reducerPath]: postApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware),
});

const { dispatch } = store;

export { store, dispatch };
