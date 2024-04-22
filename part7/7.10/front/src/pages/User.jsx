import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchOneUser } from "../redux/usersSlice";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const StyledContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;
  const user = useSelector((state) => state.users.currentUser.entity);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch]);

  return (
    <StyledContainer>
      <Typography variant="h3" gutterBottom>
        {user?.name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Added Blogs
      </Typography>
      <List>
        {user?.blogs.map((blog) => (
          <ListItem key={blog.id} button component={Link} to={`/blog/${blog.id}`}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={() => navigate("/users")}>
        Back
      </Button>
    </StyledContainer>
  );
};

export default User;