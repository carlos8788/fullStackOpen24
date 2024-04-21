import { useEffect, useState } from "react"
import { getAllUsers } from "../services/users"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../redux/usersSlice"
import { Link } from "react-router-dom"



const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    useEffect(() => {
        const dataUsers = async () => {
            dispatch(fetchUsers())
        }
        dataUsers()
    }, [dispatch,])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => <tr key={user.id}>
                            <td>
                                <Link to={`/user/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>
                                {user.blogs?.length}
                            </td>
                        </tr>)
                    }
                </tbody>
                <tfoot>
                    
                </tfoot>
            </table>

        </div>
    )
}
export default Users