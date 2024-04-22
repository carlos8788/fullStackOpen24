import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlog } from '../redux/blogSlice'
import Estructure from '../components/Estructure'

const Blogs = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogs.currentBlog);

    useEffect(() => {
        dispatch(getBlog(id));
    }, [dispatch, id]);

    return (
        <div>
            {blog && <Estructure blog={blog} />}
        </div>
    );
};

export default Blogs;
