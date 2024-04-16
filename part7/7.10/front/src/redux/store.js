import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'
import blogsReducer from './blogSlice';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
    },
});
