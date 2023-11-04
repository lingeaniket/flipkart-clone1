import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PowerSettingsNew } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

import { logoutUser } from "../../../Features/User/userSlice";

import { MenuItem, Divider } from "@mui/material";
import { Paper, Button, Popper } from "@mui/material";

const AccountButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elementRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const userData = useSelector((state) => state.userState.userData);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMouseLeave = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            handleMenuClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mouseout", handleMouseLeave);
        return () => {
            document.removeEventListener("mouseout", handleMouseLeave);
        };
        // eslint-disable-next-line
    }, []);
    return (
        <Button
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            aria-describedby={id}
            onMouseOver={(e) => {
                handleClick(e);
            }}
            ref={elementRef}
            color="inherit"
        >
            <AccountCircle />
            <span style={{ fontSize: "14px", padding: "0 5px", textTransform: "capitalize" }}>{userData ? userData.firstName : ""}</span>
            <Popper placement="bottom" id={id} sx={{ zIndex: 10000, width: "240px" }} disablePortal={true} open={open} anchorEl={anchorEl}>
                <Paper sx={{ width: "240px", marginTop: "13px", position: "relative" }} square>
                    <div className="_nav_006"></div>
                    <div className="_nav_007">
                        <div className="_nav_008">
                            <MenuItem
                                sx={{ padding: 0, height: "50px" }}
                                onClick={() => {
                                    handleMenuClose();
                                    navigate("/orders");
                                }}
                            >
                                <div className="_nav_009">
                                    <ShoppingBagIcon sx={{ color: "#2874f0", height: "16px", width: "16px" }} />
                                    <div className="_nav_010">My Orders</div>
                                </div>
                            </MenuItem>
                            <Divider style={{ margin: 0 }} />
                            <MenuItem
                                sx={{ padding: 0, height: "50px" }}
                                onClick={() => {
                                    handleMenuClose();
                                    navigate("/wishlist");
                                }}
                            >
                                <div className="_nav_009">
                                    <FavoriteIcon sx={{ color: "#2874f0", height: "16px", width: "16px" }} />
                                    <div className="_nav_010">Wish list</div>
                                    <div className="_nav_011">1</div>
                                </div>
                            </MenuItem>
                            <Divider style={{ margin: 0 }} />
                            <MenuItem
                                sx={{ padding: 0, height: "50px" }}
                                onClick={() => {
                                    handleMenuClose();
                                    navigate("/account");
                                }}
                            >
                                <div className="_nav_009">
                                    <AccountCircle sx={{ color: "#2874f0", height: "16px", width: "16px" }} />
                                    <div className="_nav_010">Your Account</div>
                                </div>
                            </MenuItem>
                            <Divider style={{ margin: 0 }} />
                            <MenuItem
                                sx={{ padding: 0, height: "50px" }}
                                onClick={() => {
                                    handleMenuClose();
                                    dispatch(logoutUser());
                                    navigate(`/`);
                                }}
                            >
                                <div className="_nav_009">
                                    <PowerSettingsNew sx={{ color: "#2874f0", height: "16px", width: "16px" }} />
                                    <div className="_nav_010">Logout</div>
                                </div>
                            </MenuItem>
                            <Divider style={{ margin: 0 }} />
                        </div>
                    </div>
                </Paper>
            </Popper>
        </Button>
    );
};

export default AccountButton;
