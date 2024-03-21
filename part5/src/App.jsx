import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import api from './services/blogs';
import { getUser, setLogin, setLogout } from './utils/permanentSession';
import NewBlog from './components/NewBlog';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = getUser()
    if (loggedUserJSON) {
      setUser({
        name: loggedUserJSON.name,
        username: loggedUserJSON.username
      })
      api.setToken(loggedUserJSON.token)
    }
  }, [])

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
    try {
      const data = new FormData(e.target)
      const response = await api.login(Object.fromEntries(data))
      setLogin(response)
      setUser({ name: response.name, usernames: response.username })
      api.setToken(response.token)

    } catch (error) {
      console.log('error')
    }
  }

  const logout = () => {
    setUser(null)
    setLogout()
  };


  const handleSubmitBlog = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    if (Object.values(data).every(d => d)) {
      const response = await api.create(data)
      console.log(response)
      setBlogs(blogs.concat({ title: response.title, author: response.author, url: response.url, id: response.id }))
    } else {
      console.log('no')
    }

  }

  return (
    <div>
      {
        user
          ? <>
            <h2>{user.name} Log in</h2>
            <button onClick={logout}>Logout</button>
            <NewBlog handlesubmit={handleSubmitBlog} />
          </>
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