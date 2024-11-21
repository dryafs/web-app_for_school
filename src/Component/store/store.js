import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../mainpage/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});