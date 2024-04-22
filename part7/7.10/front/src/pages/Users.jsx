import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/usersSlice';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Link 
} from '@mui/material';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.entities);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Users
            </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Blogs Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                <Link component={RouterLink} to={`/user/${user.id}`} underline="hover">
                                    {user.name}
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                {user.blogs?.length || 0}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Users;
