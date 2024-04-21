import { createSlice } from '@reduxjs/toolkit';


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
});


export const { setUsers, setUserLogout } = loginSlice.actions;
export default loginSlice.reducer;
