import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlogs } from '../redux/blogSlice';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Link, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import AddComment from './AddComment';

const Estructure = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes);
    const dispatch = useDispatch();

    useEffect(() => {
        setLikes(blog.likes);
    }, [blog.likes]);

    const handleClick = () => {
        dispatch(updateBlogs(blog.id));
        setLikes(prevLikes => prevLikes + 1);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>{blog.title}</Typography>
                <Link href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</Link>
                <Typography paragraph>{likes} likes</Typography>
                <Button onClick={handleClick} variant="contained">Like</Button>
                <Typography paragraph>Added by {blog.user.name}</Typography>
            </CardContent>
            <Typography variant="h6" sx={{ margin: 2 }}>Comments</Typography>
            <AddComment />
            <List dense>
                {blog.comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={comment} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default Estructure;
