import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'
import blogsReducer from './blogSlice';
import usersReducer from './userSlice';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: usersReducer
    },
});
