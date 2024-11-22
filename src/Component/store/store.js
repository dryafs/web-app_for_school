import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../Login/loginSlice'
import teacherReducer from '../teacherPage/teacherSlice'

export const store = configureStore({
    reducer: {
        user: loginReducer,
        teacher: teacherReducer
    },
});