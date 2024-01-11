import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import ThemeSlice from './theme';
const store = configureStore({
    reducer: {
        AuthReducer : authSlice,
        ThemeReducer : ThemeSlice,
    }
});


export default store;