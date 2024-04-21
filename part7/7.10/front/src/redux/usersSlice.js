import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await getAllUsers()
    return users
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default usersSlice.reducer;