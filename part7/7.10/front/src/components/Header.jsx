import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "../redux/loginSlice";
import { setLogin, setLogout } from "../utils/permanentSession";
import { useNavigate } from "react-router-dom"
import Notification from "./Notification";
import Togglable from "./Togglable";
import NewBlog from "./NewBlog";
import Login from "./Login";
import { cleanMessages, setMessages } from "../redux/notificationSlice";
import { addBlog } from "../redux/blogSlice";
import { useEffect, useRef } from 'react'
import api from '../services/blogs';
import { setUsers } from '../redux/loginSlice';
import { getUser } from '../utils/permanentSession';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const blogRef = useRef()
    const logout = () => {
        setLogout()
        dispatch(setUserLogout())
        navigate('/')
    };
    useEffect(() => {

        const loggedUserJSON = getUser()
        if (loggedUserJSON) {
            dispatch(setUsers(loggedUserJSON))
            api.setToken(loggedUserJSON.token)
        }
    }, [dispatch])
    const blogForm = () => {
        return (
            <Togglable buttonLabel='new blog' ref={blogRef} buttonId='newBlog'>
                <NewBlog handlesubmit={handleSubmitBlog} />
            </Togglable>
        )
    }
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
    return (
        <>
            <div>{<Notification />}</div>
            {
                user && user.name
                    ?
                    <>
                        <h2>{user?.name} Log in </h2>
                        <button onClick={logout}>Logout</button>
                        {blogForm()}
                    </>
                    : <Login handleSubmit={handleSubmit} />
            }

        </>
    )
}
export default Header