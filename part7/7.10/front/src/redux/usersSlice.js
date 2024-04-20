import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await getAllUsers()
    return users
})


const initialState = {
    name: "",
    username: "",
    id: "",
    token: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUserLogout: () => {
            return { ...initialState, name: null };
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUsers.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchUsers.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.blogs = action.payload;
    //         })
    //         .addCase(fetchUsers.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         })
    // }
});


export const { setUsers, setUserLogout } = loginSlice.actions;
export default loginSlice.reducer;