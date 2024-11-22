import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    allStudents: [],
    loading: false,
    error: false,
    classes: [],
    filteredStudents: []
}

export const getClasses = createAsyncThunk(
    'getClasses',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/classes`)
    }
)

export const getAllStudents = createAsyncThunk(
    'getAllStudents',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/person`)
    }
)

export const sendAllMark = createAsyncThunk(
    'sendAllMark',
    async (props) => {
        const {key, type, mark} = props
        const {request} = useHttp()
        const student = await request(`http://localhost:3001/person/${key}`)
        const subject = student.subjects.find(item => item['subjectname'] == type)
        if (subject) {
            subject['subjects-marks'].push(mark);
        } else {
            student.subjects.push({
                'subjectname': type,
                'subjects-marks': [mark]
            });
        }



        return await request(
            `http://localhost:3001/person/${key}`,
            'PUT',
            JSON.stringify(student)
        );
    }
)

export const addStudent = createAsyncThunk(
    'addStudent',
    async (data) => {
        const {request} = useHttp()
        request(`http://localhost:3001/person`, 'POST', JSON.stringify(data))
    }
)

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        filterStudents: (state, action) => {
            if(action.payload === undefined){
                state.filteredStudents = state.allStudents
            } else{
                state.filteredStudents = state.allStudents.filter(item => item.type === action.payload)   
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClasses.pending, state => {state.loading = true})
            .addCase(getClasses.fulfilled, (state, action) => {
                state.loading = false
                state.classes = action.payload
            })
            .addCase(getClasses.rejected, state => {state.error = true; state.loading = false})
            .addCase(getAllStudents.pending, state => {state.loading = true; state.error = false})
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.allStudents = action.payload
            })
            .addCase(getAllStudents.rejected, state => {state.error = true; state.loading = false})
    }
})

export const {actions, reducer} = teacherSlice;
export const {filterStudents} = actions
export default reducer;