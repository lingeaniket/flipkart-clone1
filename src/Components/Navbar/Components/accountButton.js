import { useDispatch } from "react-redux";
import { MenuItem, Divider } from '@mui/material'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Paper,
    Button, Popper,
} from '@mui/material';
import { logoutUser } from '../../Features/User/userSlice';

const AccountButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elementRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleMouseLeave = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            handleMenuClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mouseout', handleMouseLeave);
        return () => {
            document.removeEventListener('mouseout', handleMouseLeave);
        };
        // eslint-disable-next-line
    }, [])
    return (
        <Button
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            aria-describedby={id}
            onMouseOver={(e) => { handleClick(e) }}
            ref={elementRef}
            color="inherit"
        >
            <AccountCircle />
            <span style={{ fontSize: '14px', padding: '0 5px', textTransform: 'capitalize' }}>
                {localStorage.getItem('username')}
            </span>
            <Popper
                placement="bottom"
                id={id}
                sx={{ zIndex: 10000, width: '200px' }}
                disablePortal={true}
                open={open}
                anchorEl={anchorEl}
            >
                <Paper sx={{ width: '200px' }} square>
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        navigate('/orders');
                    }}>
                        <ShoppingBagIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} /> Orders
                    </MenuItem>
                    <Divider style={{ margin: 0 }} />
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        navigate('/wishlist')
                    }}>
                        <FavoriteIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} /> Wish list
                    </MenuItem>
                    <Divider style={{ margin: 0 }} />
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        navigate('/account')
                    }}>
                        <AccountCircle sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} /> Your Account
                    </MenuItem>
                    <Divider style={{ margin: 0 }} />
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        dispatch(logoutUser());
                        navigate(`/`);
                    }}>
                        <LogoutIcon sx={{ margin: '0 10px 0 0', color: 'blueviolet' }} /> Logout
                    </MenuItem>
                    <Divider style={{ margin: 0 }} />
                </Paper>
            </Popper>
        </Button>
    )
}

export default AccountButton;