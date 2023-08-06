// import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import CheckLogin from './CheckLoginComponent';
import AddressComponent1 from './AddressComponent1';
import OrderSummaryComponent from './OrderSummaryComponent';
import PaymentComponent from './PaymentComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrder, checkoutCompleted } from '../../Features/User/orderDetailsSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const steps = ['Login', 'Address', 'Order Summary', 'Payment'];

export default function MobileViewCheck({ id, setSelectedStep, selectedStep }) {
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

    const handleBack = () => {
        setSelectedStep((prevActiveStep) => prevActiveStep - 1)
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
            if (selectedStep < 2) {
                setSelectedAddress(0)
            }
        };

        fetchCartData();
        // eslint-disable-next-line
    }, [isUserLoggedIn, cart, singleOrder])

    return (
        <Paper className='_check_068'>
            <Paper square sx={{ zIndex: 1000, marginBottom: '10px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px 0',
                    width: '100%',
                    zIndex: 999
                }}>
                    <Stepper style={{ width: '90%' }} activeStep={selectedStep - 1}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
            </Paper>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%' }}>
                    {selectedStep > 2
                        &&
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', padding: '12px' }}>
                            <div>
                                <div className='_check_008'>Deliver to</div>
                                <div className="_check_007">
                                    <span className="_check_008">{savedAddresses[selectedAddress].name}</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].address},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].locality},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].area},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].state} -</span>
                                    <span className="_check_024 _check_009">{savedAddresses[selectedAddress].pincode}</span>
                                </div>
                            </div>
                            <div style={{ alignSelf: 'flex-end' }}>
                                <button className="addressChangeButton" onClick={() => {
                                    setSelectedStep(2)
                                }}>Change</button>
                            </div>
                        </div>
                    }
                    {(selectedStep === 1)
                        &&
                        (
                            <CheckLogin setSelectedStep={setSelectedStep} />
                        )
                    }
                    {(selectedStep === 2)
                        &&
                        (
                            <AddressComponent1
                                id={id}
                                savedAddresses={savedAddresses}
                                setSelectedAddress={setSelectedAddress}
                                selectedAddress={selectedAddress}
                                setSelectedStep={setSelectedStep}
                            />
                        )
                    }
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
                    {(selectedStep === 4)
                        &&
                        (
                            <PaymentComponent selectedPayment={selectedPayment} handleCheckout={handleCheckout} />
                        )}


                </div>
            </Box>
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '0 10px 10px', position: 'sticky', bottom: 0, background: 'white', boxShadow:'0 -2px 10px 0 rgba(0, 0, 0, .1)', zIndex: 999 }}>
                    <Button
                        color="inherit"
                        disabled={selectedStep - 1 === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon fontSize='small'/> <span style={{
                            fontWeight: 500,
                            paddingLeft: '10px'
                        }}>Back</span>
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                </Box>
            </>
        </Paper>
    );
}