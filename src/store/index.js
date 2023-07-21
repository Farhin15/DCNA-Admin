// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import templateReducer from './reducers/templateSlice';
import requestReducer from './reducers/requestSlice';
import userReducer from './reducers/userSlice';
// import snackReducer from './reducers/uiReducer';
import snackbarReducer from './reducers/snackbarSlice';
import loaderReducer from './reducers/loaderSlice';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        menu: reducers,
        template: templateReducer,
        request: requestReducer,
        user: userReducer,
        snack: snackbarReducer,
        loader: loaderReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(templateReducer.middleware, requestReducer.middleware),
});

const { dispatch } = store;

export { store, dispatch };
