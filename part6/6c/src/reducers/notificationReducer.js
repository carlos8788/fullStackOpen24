import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'hola', 
  reducers: {
    setNotification(state, action) {
      console.log(action, 'action', action)
      return action.payload;
    },
  },
});

export const notification = (message, time) =>{
  const milliseconds = time * 1000;
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(''));
    }, milliseconds);
  }
}

export const { setNotification } = notificationSlice.actions;


export default notificationSlice.reducer;