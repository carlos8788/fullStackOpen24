import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    username: "",
    id: "",
    token: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUserLogout: () => {
            return { ...initialState, name: null };
        }
        
    },
});


export const { setUsers, setUserLogout } = userSlice.actions;
export default userSlice.reducer;
