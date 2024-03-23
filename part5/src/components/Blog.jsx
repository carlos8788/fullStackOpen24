import { useEffect, useState } from "react"
import api from "../services/blogs"
import DeleteBlog from "./DeleteBlog"
import PropTypes from 'prop-types';


const Blog = ({ blog, userID, deleteBlog }) => {
  const [view, setView] = useState(false)
  const handleView = () => setView(!view)
  const [likes, setLikes] = useState(blog?.likes || 0)

  const addLike = async (id) => {
    const likesUpdate = await api.updateBlog(id)
    setLikes(likesUpdate.likes)
  }

  return (
    <div className="box">
      <p>{blog.id}</p>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button onClick={handleView}>view</button>
      {view &&
        <div className="infoExtra">
          <p>url: {blog.url}</p>
          <p>user: {blog?.user?.name || 'none'}</p>
          <button onClick={() => addLike(blog.id)}>like</button>
          <a href={blog.url}>link</a>
          <p>likes: {likes}</p>
          <DeleteBlog blog={blog} userID={userID} deleteBlog={deleteBlog} />
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    likes: PropTypes.number
  }).isRequired,
  userID: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog