import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ElevationScroll } from "./Functions/navbarFunctions";
import "./Styles/navbar.css";

import { AppBar, Box, Typography, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchComponent from "./Components/Search/SeachComponent";
import Register from "../Login/signUp";
import AccountButton from "./Components/AccountButton/accountButton";
import AlertDialog from "../Cart&CheckParent/Components/CheckOut/Component/cancelCheckoutDialog";
import { openLogin } from "../Features/User/userSlice";

function Navbar(props) {
    const loginOpen = useSelector((state) => state.userState.loginOpen);
    const isCheckOut = useSelector((state) => state.orderDetailsState.checkout);
    const isUserLoggedIn = useSelector((state) => state.userState.userLoggedIn);

    const cart = useSelector((state) => state.cartState.cartItems);

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    // const [openLogin, setOpenLogin] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    React.useEffect(() => {
        setLoggedIn(() => isUserLoggedIn);
        // setOpenLogin(loginOpen)
        // eslint-disable-next-line
    }, [isUserLoggedIn, isCheckOut, loginOpen]);

    return (
        <Box sx={{ flexGrow: 1, position: "sticky", zIndex: "1000", top: "0" }}>
            <ElevationScroll {...props}>
                <AppBar position="sticky" sx={{ backgroundColor: "#2874f0", width: "100%", display: "flex", justifyContent: "center" }}>
                    <div
                        className="_nav_003"
                        style={
                            {
                                // justifyContent: `${isCheckOut && 'flex-start'}`
                            }
                        }
                    >
                        <div style={{ display: "flex" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 700,
                                }}
                                onClick={() => {
                                    if (isCheckOut) {
                                        handleClickOpen();
                                    } else {
                                        navigate("/");
                                    }
                                }}
                            >
                                <i>Flipkart</i>
                            </Typography>
                            {!isCheckOut && (
                                <span className="_nav_001">
                                    <SearchComponent id={0} />
                                </span>
                            )}
                        </div>
                        {isCheckOut ? null : (
                            <>
                                <div className="_nav_004 _nav_005">
                                    {!loggedIn ? (
                                        <Button
                                            variant="inherit"
                                            size="small"
                                            sx={{ background: "white", color: "#2874f0", borderRadius: 0, padding: "8px 50px" }}
                                            onClick={() => {
                                                dispatch(openLogin());
                                            }}
                                        >
                                            Login
                                        </Button>
                                    ) : null}
                                    <div className="_nav_004">
                                        {loggedIn ? <AccountButton /> : null}
                                        <Button
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                navigate("/cart");
                                            }}
                                        >
                                            <Badge
                                                badgeContent={cart.length}
                                                color="success"
                                                anchorOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                }}
                                                max={10}
                                            >
                                                <ShoppingCartIcon sx={{ margin: "0 10px 0 0" }} />
                                            </Badge>
                                            Cart
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {!isCheckOut && (
                        <span className="_nav_002">
                            <SearchComponent id={1} />
                        </span>
                    )}
                </AppBar>
            </ElevationScroll>
            <Register />
            <AlertDialog handleClose={handleClose} open={open} />
        </Box>
    );
}

export default React.memo(Navbar);
