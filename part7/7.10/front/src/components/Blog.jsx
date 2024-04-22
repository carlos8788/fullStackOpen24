import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { updateBlogs } from "../redux/blogSlice";
import DeleteBlog from "./DeleteBlog";
import { Card, CardContent, CardActions, Button, Typography, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Blog = ({ blog, userID, deleteBlog }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddLike = () => {
    dispatch(updateBlogs(blog.id));
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {blog.title} - {blog.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {blog.id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" onClick={handleExpandClick}>
          {expanded ? 'Hide' : 'View'} <ExpandMoreIcon />
        </Button>
        {expanded && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', paddingLeft: 16 }}>
            <Typography variant="body2">URL: {blog.url}</Typography>
            <Typography variant="body2">User: {blog?.user?.name || 'None'}</Typography>
            <Typography variant="body2">Likes: {blog.likes}</Typography>
            <Button size="small" onClick={handleAddLike} color="primary">
              Like
            </Button>
            <Link href={blog.url} target="_blank" rel="noopener noreferrer">
              Go to blog
            </Link>
            <DeleteBlog blog={blog} userID={userID} deleteBlog={deleteBlog} />
          </div>
        )}
      </CardActions>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string
    }),
    likes: PropTypes.number
  }).isRequired,
  userID: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog;
