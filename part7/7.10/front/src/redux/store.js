import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'
import blogsReducer from './blogSlice';
import loginReducer from './loginSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: loginReducer,
        users: usersReducer
    },
});
