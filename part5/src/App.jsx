import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import api from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll();
          setBlogs(blogs);
        } catch (error) {
          console.error('Error getting blogs:', error);
        }
      }
    };

    fetchBlogs();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const response = await api.login(Object.fromEntries(data))
    setUser({ name: response.name, usernames: response.username })
    api.setToken(response.token)
    console.log(response)
  }

  return (
    <div>

      {
        user
          ? <h2>{user.name} Log in</h2>
          : <Login handleSubmit={handleSubmit} />
      }
      <h2>blogs</h2>
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App