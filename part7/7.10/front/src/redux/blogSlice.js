import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const blogs = await blogService.getAll();
  return blogs;
});

export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData) => {
  const newBlog = await blogService.create(blogData);
  return newBlog;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await blogService.deleteBlog(id);
  return id;
});

export const updateBlogs = createAsyncThunk('blogs/updateBlog', async (id) => {
  const updatedBlog = await blogService.updateBlog(id);
  return updatedBlog;
});

export const getBlog = createAsyncThunk('blogs/getBlog', async (id) => {
  const blog = await blogService.getBlog(id)
  return blog
})

export const addCommentBlog = createAsyncThunk('Comments/addCommentBlog', async ({id, comment}) => {
  console.log({id, comment})
  const blog = await blogService.addComment({id, comment})
  return blog;
})

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
    currentBlog: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      })
      .addCase(updateBlogs.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index].likes = action.payload.likes; 
        }
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload
      })
      .addCase(addCommentBlog.fulfilled, (state, action) => {
        state.currentBlog.comments = action.payload.comments
      });
  }
});

export default blogsSlice.reducer;
