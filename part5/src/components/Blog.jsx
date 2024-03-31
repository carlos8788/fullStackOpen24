import { useEffect, useState } from "react"
import api from "../services/blogs"
import DeleteBlog from "./DeleteBlog"
import PropTypes from 'prop-types';

const addLike = async (id) => {
  const likesUpdate = await api.updateBlog(id)
  return likesUpdate.likes
}

const Blog = ({ blog, userID, deleteBlog, addLikes=addLike }) => {
  const [view, setView] = useState(false)
  const handleView = () => setView(!view)
  const [likes, setLikes] = useState(blog?.likes || 0)

  const handleAddLike = async () => {
    const newLikes = await addLikes(blog.id);
    if (newLikes !== null) { 
      setLikes(newLikes);
    }
  };

  return (
    <div className="box">
      <p>{blog.id}</p>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button onClick={handleView} id="view">view</button>
      {view &&
        <div className="infoExtra">
          <p>url: {blog.url}</p>
          <p>user: {blog?.user?.name || 'none'}</p>
          <button onClick={handleAddLike} className="likeBtn">like</button>
          <a href={blog.url} className="url">link</a>
          <p className="likes">likes: {likes}</p>
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