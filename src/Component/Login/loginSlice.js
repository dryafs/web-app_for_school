import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from '../../hooks/useHttp'


const initialState = {
    fullInformation: {},
    currentPassword: '',
    loading: false,
    error: false,
    proof: null
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, state => {state.loading = true})
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload !== undefined){
                    state.fullInformation = action.payload 
                    state.proof = true
                }else{
                    state.proof = false
                }
            })
            .addCase(getUser.rejected, state => {state.error = true; state.loading = false})
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.proof= false;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.error = false;
                state.proof = true;
            })
            .addCase(createUser.rejected, (state) => {
                state.error = true;
                state.loading = false;
                state.proof = false;
            })
            .addDefaultCase(() => {})
    }
})

export const {action, reducer} = userSlice;

export default reducer;
