import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import api from './services/blogs';
import { getUser, setLogin, setLogout } from './utils/permanentSession';
import NewBlog from './components/NewBlog';
import './app.css'
import Togglable from './components/Togglable';
import { useDispatch } from 'react-redux';
import { cleanMessages, setMessages } from './redux/notificationSlice';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = getUser()
    if (loggedUserJSON) {
      setUser({
        id: loggedUserJSON.id,
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
      console.log(response)
      setLogin(response)
      setUser({ name: response.name, usernames: response.username, id: response.id})
      api.setToken(response.token)

    } catch (error) {
      dispatch(setMessages({message: 'Wrong username or password', style: 'danger'}))
      setTimeout(() => {
        dispatch(cleanMessages(null))
      }, 4000)
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
      blogRef.current.toggleVisibility()
      const response = await api.create(data)
      console.log(response)
      setBlogs(blogs.concat({ title: response.title, author: response.author, url: response.url, id: response.id, user: response.user }))
      dispatch(setMessages({message: `a new blog ${response.title}`, style: 'success'}))
      setTimeout(() => {
        dispatch(cleanMessages(null))
      }, 4000)
    } else {
      console.log('no')
    }

  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogRef} buttonId='newBlog'>
        <NewBlog handlesubmit={handleSubmitBlog} />
      </Togglable>
    )
  }

  const deleteBlog = async (id) => {
    api.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }
  return (
    <div>
      <div>{<Notification/>}</div>
      {
        user
          ? <>
            <h2>{user.name} Log in </h2>
            <button onClick={logout}>Logout</button>
            {blogForm()}
          </>
          : <Login handleSubmit={handleSubmit} />
      }
      <h2>blogs</h2>
      {user !== null && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} userID={user.id} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App