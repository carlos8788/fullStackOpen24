import PropTypes from 'prop-types';


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

DeleteBlog.propTypes = {
    blog: PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    userID: PropTypes.string.isRequired,
    deleteBlog: PropTypes.func.isRequired
  };
  
export default DeleteBlog