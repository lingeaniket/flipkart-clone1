import axios from "axios";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import "../../Styles/checkoutStyles.css";
import MobileView from "./Component/View/MobileView";
import DeskTopView from "./Component/View/DesktopView";

import { addOrder, checkoutCompleted, checkoutInProgress } from "../../../Features/User/orderDetailsSlice";

import { Paper } from "@mui/material";

const CheckoutComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartState.cartItems);
    const userData = useSelector((state) => state.userState.userData);
    const singleOrder = useSelector((state) => state.orderDetailsState.singleOrder);
    const isUserLoggedIn = useSelector((state) => state.userState.userLoggedIn);
    const savedAddresses = useSelector((state) => state.userState.savedAddresses);

    const [upiMethod, setUpiMethod] = useState(-1);
    const [radioBank, setRadioBank] = useState(-1);
    const [selectedStep, setSelectedStep] = useState(1);
    const [selectedBank, setSelectedBank] = useState("");
    const [orderProducts, setOrderProducts] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState(-1);

    const [searchParams] = useSearchParams();
    const item_id = searchParams.get("item-id");

    const handleCheckout = (method, data) => {
        dispatch(addOrder({ address: savedAddresses[selectedAddress], products: orderProducts, payment_method: method, data }));
        dispatch(checkoutCompleted());
        setTimeout(() => {
            navigate("/orderresponse");
        }, 500);
    };

    const fetchData = async (id, quantity) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            return {
                product: response.data,
                quantity: quantity,
            };
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        dispatch(checkoutInProgress());
        if (isUserLoggedIn && selectedStep === 1 && userData.firstName) {
            setSelectedStep(2);
        }

        const fetchCartData = async () => {
            if (item_id) {
                const promise = singleOrder.map((item) => fetchData(item.id, item.quantity));
                const data = await Promise.all(promise);
                setOrderProducts(data.filter((item) => item !== null));
            } else {
                const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));
                const cartData = await Promise.all(cartPromises);
                setOrderProducts(cartData.filter((item) => item !== null));
            }
            if (selectedStep < 2) {
                setSelectedAddress(0);
            }
        };

        fetchCartData();
        // eslint-disable-next-line
    }, [isUserLoggedIn, cart, singleOrder]);

    return (
        <Paper className="cartMainPaper" sx={{ backgroundColor: "transparent" }} elevation={0}>
            <DeskTopView
                step={{ selectedStep, setSelectedStep }}
                products={{ orderProducts }}
                upi={{ upiMethod, setUpiMethod }}
                bank={{ radioBank, setRadioBank, selectedBank, setSelectedBank }}
                payment={{ selectedPayment, setSelectedPayment }}
                address={{ savedAddresses, selectedAddress, setSelectedAddress }}
                handleCheckout={handleCheckout}
            />
            <MobileView
                products={{ orderProducts }}
                upi={{ upiMethod, setUpiMethod }}
                step={{ setSelectedStep, selectedStep }}
                address={{ setSelectedAddress, selectedAddress }}
                payment={{ setSelectedPayment, selectedPayment }}
                bank={{ setSelectedBank, selectedBank, setRadioBank, radioBank }}
                handleCheckout={handleCheckout}
            />
        </Paper>
    );
};

export default memo(CheckoutComponent);
