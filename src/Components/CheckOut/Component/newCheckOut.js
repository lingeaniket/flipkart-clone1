import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import '../Styles/checkoutStyles.css'
import CheckLogin from "./CheckLoginComponent";
import PaymentComponent from "./PaymentComponent";
import AddressComponent1 from "./AddressComponent1";
import OrderSummaryComponent from "./OrderSummaryComponent";
import { Address, Login, Order, Payment } from "./Titles/Titles";

import { addOrder, checkoutCompleted } from "../../Features/User/orderDetailsSlice";

import { Paper } from "@mui/material";
import MobileViewCheck from "./MobileViewCheckout";
const Checkout = () => {
    const [selectedStep, setSelectedStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(0);
    // eslint-disable-next-line
    const [selectedPayment, setSelectedPayment] = useState(0);
    const [searchParams] = useSearchParams();
    const item_id = searchParams.get('item-id');
    const [orderProducts, setOrderProducts] = useState([]);
    const isUserLoggedIn = useSelector(state => state.userState.userLoggedIn);
    const savedAddresses = useSelector(state => state.userState.savedAddresses);
    const singleOrder = useSelector(state => state.orderDetailsState.singleOrder);
    const cart = useSelector(state => state.cartState.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        dispatch(addOrder({ address: savedAddresses[selectedAddress], products: orderProducts, payment_method: 'cod' }))
        setTimeout(() => {
            dispatch(checkoutCompleted());
            navigate('/orderresponse')
        }, 500)
    }

    const fetchData = async (id, quantity) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            return {
                product: response.data,
                quantity: quantity
            }
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        if (isUserLoggedIn && selectedStep === 1) {
            setSelectedStep(2)
        }

        const fetchCartData = async () => {
            if (item_id) {
                const promise = singleOrder.map((item) => fetchData(item.id, item.quantity))
                const data = await Promise.all(promise);
                setOrderProducts(data.filter((item) => item !== null));
            } else {
                const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));
                const cartData = await Promise.all(cartPromises);
                setOrderProducts(cartData.filter((item) => item !== null));
            }
            if(selectedStep < 2){

                setSelectedAddress(0);
            }
        };

        fetchCartData();
        // eslint-disable-next-line
    }, [isUserLoggedIn, cart, singleOrder])

    return (
        <Paper className="cartMainPaper" sx={{ backgroundColor: 'transparent' }} elevation={0}>
            <Paper elevation={1} className="_check_067" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                <Paper square elevation={0} sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }}>
                    <div className="_check_010">
                        <Login selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
                        {(selectedStep === 1)
                            &&
                            (
                                <CheckLogin setSelectedStep={setSelectedStep} />
                            )
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div className="_check_010">
                        <Address
                            selectedStep={selectedStep}
                            setSelectedStep={setSelectedStep}
                            selectedAddress={selectedAddress}
                        />
                        {selectedStep === 2
                            &&
                            (
                                <AddressComponent1
                                    id="desktop"
                                    savedAddresses={savedAddresses}
                                    setSelectedAddress={setSelectedAddress}
                                    selectedAddress={selectedAddress}
                                    setSelectedStep={setSelectedStep}
                                />
                            )
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }}>
                    <div className="_check_010">
                        <Order selectedStep={selectedStep}
                            orderProducts={orderProducts}
                            setSelectedStep={setSelectedStep}
                        />
                        {(selectedStep === 3)
                            &&
                            (
                                <OrderSummaryComponent
                                    orderProducts={orderProducts}
                                    item_id={item_id}
                                    setSelectedStep={setSelectedStep}
                                />
                            )
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }}>
                    <div className="_check_010">
                        <Payment selectedStep={selectedStep} />
                        {(selectedStep === 4)
                            &&
                            (
                                <PaymentComponent selectedPayment={selectedPayment} handleCheckout={handleCheckout} />
                            )
                        }
                    </div>
                </Paper>
            </Paper>
            <MobileViewCheck id="mobile"

                selectedStep={selectedStep}
                handleCheckout={handleCheckout}
                selectedPayment={selectedPayment}
                setSelectedStep={setSelectedStep}
                item_id={item_id}
                orderProducts={orderProducts}
                selectedAddress={selectedAddress}
                savedAddresses={savedAddresses}
                setSelectedAddress={setSelectedAddress}
                />
        </Paper>
    )
}

export default Checkout;