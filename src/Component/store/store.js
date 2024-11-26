import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../Login/loginSlice'
import teacherReducer from '../teacherPage/teacherSlice'
import studentReducer from '../studentPage/studentSlice'

export const store = configureStore({
    reducer: {
        user: loginReducer,
        teacher: teacherReducer,
        student: studentReducer
    },
});