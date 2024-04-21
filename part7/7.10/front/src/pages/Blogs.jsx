import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlog } from '../redux/blogSlice'

const Blogs = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.currentBlog)
    useEffect(() => {
        dispatch(getBlog(id))
    }, [])
    return (
        <div>
            <h2>{blog.title}</h2>
        </div>
    )
}

export default Blogs