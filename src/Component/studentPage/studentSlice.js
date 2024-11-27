import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    position: '-',
    filteredStudents: [],
    currentStudent: null,
    studentNews: null
}

export const getPersonClass = createAsyncThunk(
    'getAllStudents',
    async (student) => {
        const {request} = useHttp();
        let students = await request(`http://localhost:3001/person`)
        students = students.filter(item => item.type === student.type)
        let filteredStudents = students.sort((a, b) => b.diamond - a.diamond)
        let index = students.findIndex(item => item.id === student.id)
        return {filteredStudents, index}
    }
)

export const getNews = createAsyncThunk(
    'getNews',
    async ({id}) => {
        const {request} = useHttp();
        const student = await request(`http://localhost:3001/person/${id}`)
        return student.lastUpdates
    }
)


const studentSlice = createSlice({
    name: 'studentSlice',
    initialState,
    reducers: {
        getUser: (state, action) => {state.currentStudent = action.payload},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPersonClass.fulfilled, (state, action) => {state.filteredStudents = action.payload.filteredStudents; state.position = action.payload.index + 1})
            .addCase(getNews.fulfilled, (state, action) => {state.studentNews = action.payload})
    }
})

export const {actions, reducer} = studentSlice;
export const {getUser} = actions;
export default reducer;