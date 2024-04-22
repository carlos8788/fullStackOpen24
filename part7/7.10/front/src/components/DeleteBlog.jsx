import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteBlog = ({ blog, userID, deleteBlog }) => {
  return (
    <>
      {blog.user?.id === userID && (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deleteBlog(blog.id)}
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      )}
    </>
  );
};

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

export default DeleteBlog;
