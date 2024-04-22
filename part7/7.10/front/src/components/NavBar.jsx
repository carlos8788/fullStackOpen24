import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
// const NavBar = () => {


//     const style = {

//     }

//     return (
//         <>
//             <nav className="nav">
//                 <Link to='/'>Home</Link>
//                 {user.name
//                     ? <Link to='/users'>Users</Link>
//                     : ''
//                 }
//             </nav>

//         </>
//     )
// }
// export default NavBar

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function appBarLabel(links) {

    const location = useLocation()

    return (
        <Toolbar sx={{ display: "flex", gap: 5 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>
            {
                links.map((link, i) => (
                    <Link to={link.to} style={{ textDecoration: "none", }} key={i}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="li"
                            sx={{
                                color: location.pathname === link.to ? 'gray' : 'white',
                                '&:hover': {
                                    color: 'grey',
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {link.title}
                        </Typography>
                    </Link>
                ))
            }
        </Toolbar>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function NavBar() {
    const user = useSelector(state => state.user)
    const links = [
        {
            title: 'Home',
            to: '/'
        }
    ]
    if(user.name) links.push({title: 'User',to: '/users'})
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="info">
                    {appBarLabel(links)}
                </AppBar>
            </ThemeProvider>
        </Stack>
    );
}