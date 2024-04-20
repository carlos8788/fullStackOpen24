import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const NavBar = () => {
    const user = useSelector(state => state.user)

    return (
        <nav className="nav">
            <Link to='/'>Home</Link>
            {user.name
                ? <Link to='/users'>Users</Link>
                : ''
            }
        </nav>
    )
}
export default NavBar