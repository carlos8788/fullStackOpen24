import { useEffect, useState } from "react"
import { getAllUsers } from "../services/users"
import { useDispatch, useSelector } from "react-redux"



const Users = () => {
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user)
    // useEffect(() => {
    //     const dataUsers = async () => {
    //         const data = await dispatch(fetchUsers())
    //         console.log(data)
    //     }
    //     dataUsers()
    // }, [])

    return (
        <div>
            <h2>Users</h2>
            {
                // user?.map(user => <li key={user.id}>{user.name}</li>)
            }
        </div>
    )
}
export default Users