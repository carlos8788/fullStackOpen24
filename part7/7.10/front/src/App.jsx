import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import api from './services/blogs';
import { getUser, setLogin, setLogout } from './utils/permanentSession';
import NewBlog from './components/NewBlog';
import './app.css'
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { cleanMessages, setMessages } from './redux/notificationSlice';
import Notification from './components/Notification';
import { addBlog, deleteBlog, fetchBlogs } from './redux/blogSlice';
import { setUserLogout, setUsers } from './redux/userSlice';

const App = () => {
  const blogRef = useRef()

  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state.blogs);
  const user = useSelector(state => state.user)

  useEffect(() => {

    const loggedUserJSON = getUser()
    if (loggedUserJSON) {
      dispatch(setUsers(loggedUserJSON))
      api.setToken(loggedUserJSON.token)
    }
  }, [dispatch])

  useEffect(() => {
    const initfetchBlogs = async () => {
      if (user.name) {
        try {
          dispatch(fetchBlogs());
        } catch (error) {
          console.error('Error getting blogs:', error);
        }
      }
    };

    initfetchBlogs();
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData(e.target)
      const response = await api.login(Object.fromEntries(data))
      setLogin(response)
      
      dispatch(setUsers(response))
      api.setToken(response.token)

    } catch (error) {
      dispatch(setMessages({ message: 'Wrong username or password', style: 'danger' }))
      setTimeout(() => {
        dispatch(cleanMessages(null))
      }, 4000)
    }
  }

  const logout = () => {
    setLogout()
    dispatch(setUserLogout())
    
  };


  const handleSubmitBlog = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (Object.values(data).every(d => d)) {
      blogRef.current.toggleVisibility();

      dispatch(addBlog(data)).then(data => {
        const response = data.payload;
        if (response) {
          dispatch(setMessages({ message: `A new blog ${response.title} added successfully`, style: 'success' }));
          setTimeout(() => {
            dispatch(cleanMessages());
          }, 4000);
        }
      }).catch(error => {
        
        dispatch(setMessages({ message: 'Failed to add blog', style: 'danger' }));
        setTimeout(() => {
          dispatch(cleanMessages());
        }, 4000);
      });
    }
  };


  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogRef} buttonId='newBlog'>
        <NewBlog handlesubmit={handleSubmitBlog} />
      </Togglable>
    )
  }

  const deleteBlogs = async (id) => {
    
    dispatch(deleteBlog(id))
  }
  return (
    <div>
      <div>{<Notification />}</div>
      {
        user && user.name
          ? <>
            <h2>{user?.name} Log in </h2>
            <button onClick={logout}>Logout</button>
            {blogForm()}
          </>
          : <Login handleSubmit={handleSubmit} />
      }
      <h2>blogs</h2>
      {user.name !== null && [...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} userID={user.id} deleteBlog={deleteBlogs} />
      )}
    </div>
  )
}

export default App