import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCommentBlog, getBlog, updateBlogs } from '../redux/blogSlice'
import Button from '@mui/material/Button';

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
            {/* <button onClick={handleClick}>like</button> */}
            <Button onClick={handleClick} variant='contained' >Like</Button>
            <p>added by {blog?.user.name}</p>

            <h3>Comments</h3>
            <AddComment />
            {
                blog?.comments.map((comment, i) => <li key={i}>{comment}</li>)
            }
        </>
    );
};

const AddComment = () => {

    const dispatch = useDispatch();
    const id = useParams().id
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target))
        console.log(id, data.comment)
        dispatch(addCommentBlog({ id, ...data }))
        formRef.current.reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef}>
                <input type="text" name='comment' />
                <button type='submit'>add comment</button>
            </form>
        </>
    )
}

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