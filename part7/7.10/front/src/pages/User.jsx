import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchOneUser } from "../redux/usersSlice"

const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useParams().id
    const user = useSelector(state => state.users.currentUser.entity)
    useEffect(()=> {
        dispatch(fetchOneUser(id))
    }, [dispatch])
    return (
        <>
            <h3>{user.name}</h3>
            <h4>added blogs</h4>
            {user.blogs.map( blog => <li key={blog.id}>{blog.title}</li>)}
            <button onClick={() => navigate('/users')}>BACK</button>
        </>
    )
}
export default User