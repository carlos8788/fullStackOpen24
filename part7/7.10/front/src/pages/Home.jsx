
import { useDispatch, useSelector } from 'react-redux';
import Blog from '../components/Blog'
import './app.css'
import { deleteBlog, fetchBlogs } from '../redux/blogSlice';
import { useEffect } from 'react';



const Home = () => {

    const dispatch = useDispatch()
    const { blogs } = useSelector((state) => state.blogs);
    const user = useSelector(state => state.user)

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

    const deleteBlogs = async (id) => {
        dispatch(deleteBlog(id))
    }
    return (
        <div>

            <h2>blogs</h2>
            {user.name !== null && [...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} userID={user.id} deleteBlog={deleteBlogs} />
            )}
        </div>
    )
}
export default Home