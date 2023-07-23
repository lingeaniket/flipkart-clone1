import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeFilter } from '../Features/User/productsSlice';
import { ElevationScroll } from './navbarFunctions';
import './navbar.css'

import {
    MenuItem, Paper, AppBar, Box, Toolbar,
    Typography, Button, IconButton, Badge, Popper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../Features/User/userSlice';
import SearchComponent from './SeachComponent';

export default function Navbar(props) {
    const isUserLoggedIn = useSelector(state => state.userState.userLoggedIn);
    const cart = useSelector(state => state.cartState.cartItems);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Box sx={{ flexGrow: 1, position: 'sticky', zIndex: '1000', top: '0' }}>
            <ElevationScroll {...props}>
                <AppBar position="sticky" sx={{ backgroundColor: '#2874f0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }}
                            onMouseOver={handleMenuClose}
                            onClick={() => {
                                navigate('/');
                                dispatch(removeFilter());
                            }}
                        >
                            Flipkart
                        </Typography>
                        <SearchComponent handleMenuClose={handleMenuClose} />
                        {
                            !isUserLoggedIn
                                ?
                                <Button color="inherit" onClick={()=>{
                                    navigate('/login')
                                }}>Login</Button>
                                :
                                <div style={{ display: 'flex' }}>
                                    <Button color='inherit' size='medium'
                                        onMouseOver={handleMenuClose}
                                        onClick={() => {
                                            navigate('/cart');
                                            dispatch(removeFilter());
                                        }}
                                    >
                                        <Badge badgeContent={cart.length} color='success'
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }} max={10}>
                                            <ShoppingCartIcon sx={{ margin: '0 10px 0 0' }} />
                                        </Badge>
                                        Cart
                                    </Button>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        aria-describedby={id}
                                        onClick={(e) => { handleClick(e) }}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                        <span style={{ fontSize: '14px', padding: '0 5px', textTransform: 'capitalize' }}>
                                            {localStorage.getItem('username')}
                                        </span>
                                    </IconButton>
                                </div>
                        }
                        <Popper
                            placement="bottom"
                            id={id}
                            sx={{ zIndex: 10000 }}
                            disablePortal={true}
                            open={open}
                            anchorEl={anchorEl}
                            onMouseLeave={handleMenuClose}
                        >
                            <Paper>
                                <MenuItem onClick={() => {
                                    handleMenuClose();
                                    dispatch(removeFilter());
                                    navigate('/orders')
                                }}>
                                    <ShoppingBagIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} />Orders
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    handleMenuClose();
                                    dispatch(removeFilter());
                                    navigate('/wishlist')
                                }}>
                                    <FavoriteIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} />Wish list
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    handleMenuClose();
                                    localStorage.setItem('isUserLoggedIn', false);
                                    localStorage.removeItem('username');
                                    dispatch(removeFilter());
                                    dispatch(logoutUser());
                                    navigate(`/login`);
                                }}>
                                    <LogoutIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} />Logout
                                </MenuItem>
                            </Paper>
                        </Popper>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Box>
    );
}