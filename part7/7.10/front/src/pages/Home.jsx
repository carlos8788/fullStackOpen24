import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteBlog, fetchBlogs } from '../redux/blogSlice';
import Blog from '../components/Blog';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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
    dispatch(deleteBlog(id));
  };

  return (
    <StyledContainer>
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>
      {user.name !== null &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              userID={user.id}
              deleteBlog={deleteBlogs}
            />
          ))}
    </StyledContainer>
  );
};

export default Home;