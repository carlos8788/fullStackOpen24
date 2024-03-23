
const DeleteBlog = ({ blog, userID, deleteBlog }) => {

    return (
        <>
            {
                blog.user?.id === userID &&
                <button onClick={() => deleteBlog(blog.id)} className="danger">delete</button>
            }
        </>
    )
}
export default DeleteBlog