import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from '../../hooks/useHttp'

const savedFullInformation = sessionStorage.getItem('fullInformation');
const initialState = {
    fullInformation: savedFullInformation ? JSON.parse(savedFullInformation) : null,
    currentPassword: '',
    loading: false,
    error: false,
    proofSing: null,
    proofLogin: null
}

export const getUser = createAsyncThunk(
    'getUser',
    async ({path, login, password}) => {
        const {request} = useHttp();
        const user = await request(`http://localhost:3001/${path}/${login}`)
        if(user.password === password){
            return user
        }
    
    }
)

export const createUser = createAsyncThunk(
    'createUser',
    async (data) => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/teacher`, 'POST',  JSON.stringify(data))
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFullInformation: (state, action) => {
            state.fullInformation = action.payload;
            if (action.payload) {
              sessionStorage.setItem('fullInformation', JSON.stringify(action.payload));
            } else {
              sessionStorage.removeItem('fullInformation');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, state => {state.loading = true})
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload !== undefined){
                    state.fullInformation = action.payload 
                    state.proofLogin = true
                    sessionStorage.setItem('fullInformation', JSON.stringify(action.payload));
                } else{
                    state.proofLogin = false
                }
            })
            .addCase(getUser.rejected, state => {state.error = true; state.loading = false})
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.proofSing= false;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.error = false;
                state.proofSing = true;
            })
            .addCase(createUser.rejected, (state) => {
                state.error = true;
                state.loading = false;
                state.proofSing = false;
            })
            .addDefaultCase(() => {})
    }
})

export const {action, reducer} = userSlice;

export default reducer;
