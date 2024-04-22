import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { addCommentBlog } from '../redux/blogSlice';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

const AddComment = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        dispatch(addCommentBlog({ id, ...data }));
        formRef.current.reset();
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField name='comment' label="Add Comment" variant="outlined" size="small" fullWidth />
                <Button type='submit' variant="contained">Add</Button>
            </Box>
        </form>
    );
};

export default AddComment;
