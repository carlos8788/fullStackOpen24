import { useState } from "react"


const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const handleView = () => setView(!view)
  return (
    <div className="box">
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button onClick={handleView}>view</button>
      {view &&
        <div>
          <p>url: {blog.url}</p>
          <p>user: {blog?.user?.name || 'none'}</p>
          <p>likes: {blog?.likes || 0}</p>
        </div>
      }
    </div>
  )
}

export default Blog