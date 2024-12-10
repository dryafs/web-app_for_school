import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
    allStudents: [],
    classes: [],
    filteredStudents: [],
    currentStudent: null
}

export const getClasses = createAsyncThunk(
    'getClasses',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/classes`)
    }
)

export const addClass = createAsyncThunk(
    'addClass',
    async (data, {dispatch}) => {
        const {request} = useHttp()
        await request(`http://localhost:3001/classes`, 'POST', JSON.stringify(data))
        dispatch(getClasses())
    }
)



export const getAllStudents = createAsyncThunk(
    'getAllStudents',
    async () => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/person`)
    }
)

export const addStudent = createAsyncThunk(
    'addStudent',
    async (data, {dispatch}) => {
        const {request} = useHttp()
        await request(`http://localhost:3001/person`, 'POST', JSON.stringify(data))
        dispatch(getAllStudents())
    }
)

export const getOneStudent = createAsyncThunk(
    'getOneStudent',
    async (id) => {
        const {request} = useHttp()
        return await request(`http://localhost:3001/person/${id}`)
    }
)

export const sendAllMark = createAsyncThunk(
    'sendAllMark',
    async (props) => {
        const {key, type, mark} = props
        const {request} = useHttp()
        const student = await request(`http://localhost:3001/person/${key}`)
        const subject = student.subjects.find(item => item['subjectname'] == type) // eslint-disable-next-line 
        if(mark == 12){
            student.diamond += 5;
            student.coin += 5;
        } else if(mark == 11){
            student.diamond += 3;
            student.coin += 5;
        } else if(mark == 10){
            student.diamond += 3;
            student.coin += 3;
        } else if(mark <= 9){
            student.coin += 3;
        } else if(mark < 7){
            student.coin += 1;
        }
        if (subject) {
            subject['subjectsmarks'].push(mark);
        } else {
            student.subjects.push({
                'subjectname': type,
                'subjectsmarks': [mark]
            });
        }

        return await request(
            `http://localhost:3001/person/${key}`,
            'PUT',
            JSON.stringify(student)
        );
    }
)

export const sendReview = createAsyncThunk(
    'sendReview',
    async ({id, data}) => {
        const {request} = useHttp();
        const student = await request(`http://localhost:3001/person/${id}`)
        if(student.review.length >= 20){
            student.review.shift()
        }

        student.review.push(data)

        return await request(`http://localhost:3001/person/${id}`, 'PUT', JSON.stringify(student))
    }
)

export const sendHomework = createAsyncThunk(
    'sendHomework',
    async ({id, data}) => {
        const {request} = useHttp()
        const schoolClass = await request('http://localhost:3001/classes')

        const element = schoolClass.find(item => item.id == id)
        const existingHomework = element.homework.findIndex(hw => hw.subjectname === data.subjectname);
        if(existingHomework === - 1){
            element.homework.push(data)
        } else{
            element.homework[existingHomework] = data;
        }

        return await request(`http://localhost:3001/classes/${id}`, 'PUT', JSON.stringify(element))
    }
)

export const updateHistory = createAsyncThunk(
    'updateHistory',
    async ({key, text}) => {
        console.log('work history')
        const {request} = useHttp();
        const student = await request(`http://localhost:3001/person/${key}`)
        if(student.lastUpdates.length >= 4){
            student.lastUpdates.shift()
        }

        student.lastUpdates.push({news: text})

        await request(`http://localhost:3001/person/${key}`, 'PUT', JSON.stringify(student))
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
            .addCase(getClasses.fulfilled, (state, action) => {
                state.loading = false
                state.classes = action.payload
            })
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.allStudents = action.payload
            })
            .addCase(getOneStudent.fulfilled, (state, action) => {state.currentStudent = action.payload})
    }
})

export const {actions, reducer} = teacherSlice;
export const {filterStudents} = actions
export default reducer;