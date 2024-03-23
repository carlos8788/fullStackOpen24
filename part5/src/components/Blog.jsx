import { useEffect, useState } from "react"
import api from "../services/blogs"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const handleView = () => setView(!view)
  const [likes, setLikes] = useState(blog?.likes || 0)

  const addLike = async (id) => {
    const likesUpdate = await api.updateBlog(id)
    setLikes(likesUpdate.likes)
  }
  return (
    <div className="box">
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button onClick={handleView}>view</button>
      {view &&
        <div>
          <p>url: {blog.url}</p>
          <p>user: {blog?.user?.name || 'none'}</p>
          <button onClick={() => addLike(blog.id)}>like</button>
          <p>likes: {likes}</p>
        </div>
      }
    </div>
  )
}

export default Blog