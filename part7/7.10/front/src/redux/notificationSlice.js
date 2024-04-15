import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    style: 'success',
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

        setMessages: (state, action) => {
            console.log(JSON.parse(JSON.stringify(state)))
            state = {
                message : action.payload.message,
                style : action.payload.style

            }
            console.log(JSON.parse(JSON.stringify(state)))
        },
        cleanMessages: (state, action) => {
            state.message = null;
        }
        
    },
});


export const { setMessages, cleanMessages } = notificationSlice.actions;
export default notificationSlice.reducer;
