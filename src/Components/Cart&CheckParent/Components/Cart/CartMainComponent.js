import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../Styles/cartStyles.css";

import PriceDetails from "../PriceDetails/PriceDetails.component";
import SaveLaterComponent from "./Component/SaveLaterComponent";

import { loadCartData } from "../../Functions/cartFunctions";

import { checkoutInProgress } from "../../../Features/User/orderDetailsSlice";

import { Button, Paper } from "@mui/material";
import CartComponent from "./Component/CartComponent";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    const [saveLaterProducts, setSaveLaterProducts] = useState([]);

    const cart = useSelector((state) => state.cartState.cartItems);
    const savelater = useSelector((state) => state.cartState.saveLaterItems);

    const handleOrderPlace = () => {
        dispatch(checkoutInProgress());
        navigate("/checkout");
    };

    useEffect(() => {
        loadCartData(cart, savelater, setCartProducts, setSaveLaterProducts, setLoader);
    }, [cart, savelater]);

    return (
        <Paper className="cartMainPaper" sx={{ backgroundColor: "transparent" }} elevation={0}>
            {cart.length !== 0 ? (
                <CartComponent cartProducts={cartProducts} handleOrderPlace={handleOrderPlace} cart={cart} loader={loader} />
            ) : (
                <div className="disFlexJusConEven emptyCartDiv">
                    Sorry! No Items In the Cart
                    <div>
                        <Button
                            onClick={() => {
                                navigate("/home");
                            }}
                        >
                            Start Shopping
                        </Button>
                    </div>
                </div>
            )}
            {savelater.length > 0 && <SaveLaterComponent loader={loader} saveLaterProducts={saveLaterProducts} />}
            <div className="_cart_001">
                <PriceDetails />
            </div>
            {cart.length !== 0 && (
                <Paper square elevation={0} className="placeOrderPaper outerPlaceOrder">
                    <div>
                        <button onClick={handleOrderPlace}>Place order</button>
                    </div>
                </Paper>
            )}
        </Paper>
    );
};

export default memo(CartPage);
