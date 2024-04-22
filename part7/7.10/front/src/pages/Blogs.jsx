import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlog, updateBlogs } from '../redux/blogSlice'

const Estructure = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes);
    const dispatch = useDispatch();

    useEffect(() => {
        setLikes(blog.likes);
    }, [blog.likes]);

    const handleClick = () => {
        dispatch(updateBlogs(blog.id));
        setLikes(prevLikes => prevLikes + 1);
    };

    return (
        <>
            <h2>{blog?.title}</h2>
            <a href={blog?.url}>{blog?.url}</a>
            <p>{likes} likes</p>
            <button onClick={handleClick}>like</button>
            <p>added by {blog?.user.name}</p>
        </>
    );
};

const Blogs = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.currentBlog)
    useEffect(() => {
        dispatch(getBlog(id))
    }, [])
    return (
        <div>
            {
                blog && <Estructure blog={blog} />
            }
        </div>
    )
}

export default Blogs