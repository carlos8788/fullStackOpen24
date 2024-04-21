import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers, getUser } from '../services/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await getAllUsers();
    return users;
});

export const fetchOneUser = createAsyncThunk('users/fetchOneUser', async (id) => {
    const user = await getUser(id);
    // console.log(user)
    return user;
});

const initialState = {
    entities: [],
    loading: false,
    error: null,
    currentUser: {
        entity: null,
        loading: false,
        error: null
    }
}


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.entities = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchOneUser.pending, (state) => {
                state.currentUser.loading = true;
            })
            .addCase(fetchOneUser.fulfilled, (state, action) => {
                state.currentUser.entity = action.payload;
                state.currentUser.loading = false;
            })
            .addCase(fetchOneUser.rejected, (state, action) => {
                state.currentUser.error = action.error.message;
                state.currentUser.loading = false;
            });
    }
});

export default usersSlice.reducer;
