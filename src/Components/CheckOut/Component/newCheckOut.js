import { Paper } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import CartElement from "../../CartElement/Component/cartElement";

import '../Styles/checkoutStyles.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { addOrder, checkoutCompleted } from "../../Features/User/orderDetailsSlice";
import AddressComponent from "./addressComponent";
import NewAddressComponent from "./newAddressComponent";

import CheckLogin from "./CheckLoginComponent";
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
                // dispatch(addSingleOrder(item_id))
                const promise = singleOrder.map((item) => fetchData(item.id, item.quantity))
                const data = await Promise.all(promise);
                setOrderProducts(data.filter((item) => item !== null));
            } else {
                const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));
                const cartData = await Promise.all(cartPromises);
                setOrderProducts(cartData.filter((item) => item !== null));
            }
        };

        fetchCartData();
        // eslint-disable-next-line
    }, [isUserLoggedIn, cart, singleOrder])

    return (
        <Paper className="cartMainPaper" sx={{ backgroundColor: 'transparent' }} elevation={0}>
            <Paper elevation={1} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div className="_check_010">
                        <h3 className="_check_011" style={{
                            color: `${selectedStep === 1 ? 'white' : '#878787'}`,
                            backgroundColor: `${selectedStep === 1 ? '#2874f0' : 'white'}`,
                            height: 'fit-content'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    alignSelf: 'flex-start', display: 'flex'
                                }}>
                                    <div className="_check_012" style={{
                                        backgroundColor: `${selectedStep === 1 ? 'white' : '#f0f0f0'}`,
                                        height: 'fit-content'
                                    }}>1</div>
                                    <div>
                                        {selectedStep === 1 ? "Login or signup" : "Login"}
                                        {selectedStep > 1
                                            &&
                                            <>
                                                <DoneIcon fontSize="small" sx={{
                                                    verticalAlign: 'top',
                                                    height: '20px',
                                                    marginLeft: '8px'
                                                }} />
                                                <div className="_check_007">
                                                    <span className="_check_008">Aniket Linge</span>
                                                    <span className="_check_009">+91 7030325245</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                {
                                    selectedStep > 1 &&

                                    <div style={{
                                        alignSelf: 'flex-end'
                                    }}>
                                        <button className="addressChangeButton" onClick={() => {
                                            setSelectedStep(1)
                                        }}>Change</button>
                                    </div>
                                }
                            </div>
                        </h3>
                        {selectedStep === 1
                            &&
                            <CheckLogin setSelectedStep={setSelectedStep} />
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div className="_check_010">
                        <h3 className="_check_011" style={{
                            color: `${selectedStep === 2 ? 'white' : '#878787'}`,
                            backgroundColor: `${selectedStep === 2 ? '#2874f0' : 'white'}`,
                            height: 'fit-content'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    alignSelf: 'flex-start', display: 'flex'
                                }}>
                                    <div className="_check_012" style={{
                                        backgroundColor: `${selectedStep === 2 ? 'white' : '#f0f0f0'}`,
                                        height: 'fit-content'
                                    }}>2</div>
                                    <div>
                                        delivery address
                                        {selectedStep > 2
                                            &&
                                            <>
                                                <DoneIcon fontSize="small" sx={{
                                                    verticalAlign: 'top',
                                                    height: '20px',
                                                    marginLeft: '8px'
                                                }} />
                                                <div className="_check_007">
                                                    <span className="_check_008">{savedAddresses[selectedAddress].name}</span>
                                                    <span className="_check_009">{savedAddresses[selectedAddress].address},</span>
                                                    <span className="_check_009">{savedAddresses[selectedAddress].locality},</span>
                                                    <span className="_check_009">{savedAddresses[selectedAddress].area},</span>
                                                    <span className="_check_009">{savedAddresses[selectedAddress].state} -</span>
                                                    <span className="_check_024 _check_009">{savedAddresses[selectedAddress].pincode}</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                {
                                    selectedStep > 2 &&

                                    <div style={{
                                        alignSelf: 'flex-end'
                                    }}>
                                        <button className="addressChangeButton" onClick={() => {
                                            setSelectedStep(2)
                                        }}>Change</button>
                                    </div>
                                }
                            </div>
                        </h3>

                        {selectedStep === 2
                            &&
                            <div className="_check_013">
                                <div className="_check_014" style={{
                                    marginBottom: `${!savedAddresses.length ? '0px' : '10px'}`,
                                }}>
                                    {savedAddresses.length
                                        ?
                                        (savedAddresses.map((address, index) =>
                                            <AddressComponent
                                                address={address}
                                                index={index}
                                                setSelectedAddress={setSelectedAddress}
                                                selected={selectedAddress === index}
                                                setSelectedStep={setSelectedStep}
                                            />
                                        ))
                                        :
                                        (
                                            <label className="_check_015" htmlFor="1258" style={{
                                                // if selected
                                                backgroundColor: '#f5faff'
                                            }}>
                                                <div>
                                                    <input type="radio" id="1258" name="address" />
                                                </div>
                                                <div className="_check_016">
                                                    <NewAddressComponent index={savedAddresses.length} type="first_address" setSelectedStep={setSelectedStep} />
                                                </div>
                                            </label>
                                        )
                                    }
                                </div>

                                {savedAddresses.length > 0
                                    &&
                                    ((selectedAddress === savedAddresses.length)
                                        ?
                                        (<label className="_check_015" htmlFor="1258" style={{
                                            // if selected
                                            backgroundColor: '#f5faff'
                                        }}>
                                            <div>
                                                <input type="radio" id="1258" name="address" checked={selectedAddress === savedAddresses.length} />
                                            </div>
                                            <div className="_check_016">
                                                <NewAddressComponent index={savedAddresses.length} type="new_address" setSelectedAddress={setSelectedAddress} setSelectedStep={setSelectedStep} />
                                            </div>
                                        </label>)
                                        :

                                        (<div className="_check_043" onClick={() => {
                                            setSelectedAddress(savedAddresses.length)

                                        }}>
                                            <AddIcon sx={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }} /> Add a new address
                                        </div>)
                                    )
                                }
                            </div>
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div className="_check_010">
                        <h3 className="_check_011" style={{
                            color: `${selectedStep === 3 ? 'white' : '#878787'}`,
                            backgroundColor: `${selectedStep === 3 ? '#2874f0' : 'white'}`,
                            height: 'fit-content'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    alignSelf: 'flex-start', display: 'flex'
                                }}>
                                    <div className="_check_012" style={{
                                        backgroundColor: `${selectedStep === 2 ? 'white' : '#f0f0f0'}`,
                                        height: 'fit-content'
                                    }}>3</div>
                                    <div>
                                        order summary
                                        {selectedStep > 3
                                            &&
                                            <>
                                                <DoneIcon fontSize="small" sx={{
                                                    verticalAlign: 'top',
                                                    height: '20px',
                                                    marginLeft: '8px'
                                                }} />
                                                <div className="_check_007">
                                                    <span className="_check_008">{orderProducts.length} products</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                {
                                    selectedStep > 3
                                    &&
                                    <div style={{
                                        alignSelf: 'flex-end'
                                    }}>
                                        <button className="addressChangeButton" onClick={() => {
                                            setSelectedStep(3)
                                        }}>Change</button>
                                    </div>
                                }
                            </div>
                        </h3>

                        {selectedStep === 3
                            &&
                            <div className="_check_013">
                                <div className="_check_044">
                                    <div className="_check_045">
                                        {orderProducts.map((product) =>
                                            <div className="_check_046">
                                                <CartElement type="checkout" method={`${item_id ? 'single' : 'cart'}`} item={product} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="_check_047">
                                        <span className="_check_048">
                                            Order confirmation email will be sent to
                                            <span className="_check_049">linge.aniket.10@gmail.com</span>
                                        </span>
                                        <span>
                                            <button className="_check_050" onClick={() => {
                                                setSelectedStep(4)
                                            }}>Continue</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div className="_check_010">
                        <h3 className="_check_011" style={{
                            color: `${selectedStep === 4 ? 'white' : '#878787'}`,
                            backgroundColor: `${selectedStep === 4 ? '#2874f0' : 'white'}`,
                        }}>
                            <span className="_check_012" style={{
                                backgroundColor: `${selectedStep === 4 ? 'white' : '#f0f0f0'}`,
                            }}>4</span>
                            <span>Payment</span>
                        </h3>
                        {selectedStep === 4 &&
                            <div className="_check_013">
                                <div className="_check_044">
                                    <label className="_check_015" htmlFor="1258" style={{
                                        // if selected
                                        backgroundColor: '#f5faff'
                                    }}>
                                        <div>
                                            <input type="radio" id="1258" name="address" checked={selectedPayment === 0} />
                                        </div>
                                        <div className="_check_016">
                                            {/* if not edited */}
                                            <div className="_check_017">
                                                <div className="_check_051">
                                                    <p className="_check_019">
                                                        <span className="_check_020">Cash on Delivery</span>
                                                    </p>
                                                    <div className="_check_052">
                                                        <div className="_check_053">
                                                            <div className="_check_054">
                                                                Due to handling costs, a nominal fee of ₹10
                                                                will be charged for orders placed using this
                                                                option. Avoid this fee by paying online now.
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button className="_check_025" onClick={handleCheckout}>Confirm Order</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                </Paper>
            </Paper>
        </Paper>
    )
}

export default Checkout;