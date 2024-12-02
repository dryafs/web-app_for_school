import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const savedFullInformation = sessionStorage.getItem('currentStudent');
const initialState = {
    position: '-',
    filteredStudents: [],
    currentStudent: savedFullInformation ? JSON.parse(savedFullInformation) : null,
    studentNews: null,
    homework: null,
    marks: null,
    review: null,
    contacts: null,
    percentage: 0
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

export const getMarks = createAsyncThunk(
    'getMars',
    async ({id}) => {
        const {request} = useHttp();
        const student = await request(`http://localhost:3001/person/${id}`)
        return student.subjects
    }
)

export const getReview = createAsyncThunk(
    'getReview',
    async ({id}) => {
        const {request} = useHttp();
        const student = await request(`http://localhost:3001/person/${id}`)
        return student.review
    }
)

export const getContacts = createAsyncThunk(
    'getContacts',
    async () => {
        const {request} = useHttp();
        const teachers = await request(`http://localhost:3001/teacher`)
        let arrayOfTeachers = [];
        teachers.map(item => {
            let contact = {
                name: '',
                email: '',
                id: ''
            }
            contact.name = item.name;
            contact.email = item.email;
            contact.id = item.id
            arrayOfTeachers.push(contact)
        })
        return arrayOfTeachers
    }
)


export const getHomework = createAsyncThunk(
    'getHomework',
    async (student) => {
        const {request} = useHttp();
        const classes = await request(`http://localhost:3001/classes`)
        const filteredClass = classes.find(item => item.schoolClass === student.type)
        return filteredClass.homework
    }
)


const studentSlice = createSlice({
    name: 'studentSlice',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.currentStudent = action.payload
            if (action.payload) {
                sessionStorage.setItem('currentStudent', JSON.stringify(action.payload));
            } 
        },
        getPresentage: (state, action) => {
            if(action.payload !== undefined){
                const {subjects, name} = action.payload;
                const subject = subjects.find(item => item.subjectname === name);
            
                if (subject) {
                    const total = subject.subjectsmarks.reduce((sum, mark) => sum + +mark, 0);
                    const numOfMarks = subject.subjectsmarks.length;
                    state.percentage = (total / numOfMarks).toFixed(1);
                } else {
                    state.percentage = 0;
                }
            }

        },
        setStudent: (state, action) => {
            state.fullInformation = action.payload;
            if (action.payload) {
              sessionStorage.setItem('fullInformation', JSON.stringify(action.payload));
            } else {
              sessionStorage.removeItem('fullInformation');
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPersonClass.fulfilled, (state, action) => {state.filteredStudents = action.payload.filteredStudents; state.position = action.payload.index + 1})
            .addCase(getNews.fulfilled, (state, action) => {state.studentNews = action.payload})
            .addCase(getHomework.fulfilled, (state, action) => {state.homework = action.payload})
            .addCase(getMarks.fulfilled, (state, action) => {state.marks = action.payload})
            .addCase(getReview.fulfilled, (state, action) => {state.review = action.payload})
            .addCase(getContacts.fulfilled, (state, action) => {state.contacts = action.payload})
    }
})

export const {actions, reducer} = studentSlice;
export const {getUser, getPresentage} = actions;
export default reducer;