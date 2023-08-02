import { useEffect, useState } from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';



import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";

import './Styles/orderListStyles.css'
// import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import OrderMapComponent from "./Component/orderMapComponent";
import WentWrongOrderDetails from "../../WentWrong/wentWrong";
import {formattedFullDate, getOrderTimeLineIndex } from "./Functions/orderListFunctions";
import { Timeline } from "./Component/timeline";

const OrderDetails = ({ method }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const orders = useSelector(state => state.orderDetailsState.orders)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [status, setStatus] = useState(null);
    const [status_id, setStatus_id] = useState(0);
    const [searchParams] = useSearchParams()
    const order_id = searchParams.get('order_id');
    const item_id = searchParams.get('item_id');
    const unit_id = searchParams.get('unit_id');


    const handleCancel = () => {
        //open dialogue
        handleClickOpen()
    }

    useEffect(() => {
        if (method === 'postCheckout') {
            setSelectedOrder(() => orders[0])

            setStatus_id(getOrderTimeLineIndex(orders[0].order_status))

        } else {
            setSelectedOrder(() => orders.filter(item =>
                item.order_id === order_id)[0]
            );

            setStatus_id(orders.filter(item =>
                item.order_id === order_id)[0].order_status_index
            )

            setStatus(orders.filter(item =>
                item.order_id === order_id)[0].order_status)

            setSelectedProduct(orders.filter(item =>
                item.order_id === order_id)[0].order_details.products.filter(product =>
                    product.unit_id === unit_id)[0].unit
            )
        }

    }, [method, orders, order_id, item_id, unit_id]);

    return (
        <div className="_order_001">
            {selectedOrder
                ?
                <>
                    {
                        method === 'postCheckout'
                        &&
                        <div className="_order_002 w-1-1 _order_030" style={{
                            justifyContent: 'space-between'
                        }}>
                            <div className="_order_003 w-2-3">
                                <div className="disFlexAlignItCen">
                                    <div>
                                        <div className="_order_006">
                                            <img className="_order_007"
                                                src="https://img.freepik.com/free-vector/couple-winning-prize-man-woman-holding-gift-box-flat-vector-illustration-lottery-present-birthday-party_74855-8307.jpg?t=st=1690709872~exp=1690710472~hmac=34bc133f2af958ac4a8c6b759ea931fd1d1cbeadc3e5ff82e99b6e72917f078f"
                                                alt="" />
                                        </div>
                                    </div>
                                    <div className="_order_008">
                                        <div className="_order_009">Order placed for ${selectedOrder.order_details.price_details.price}!</div>
                                        <div>
                                            <span>Your {selectedOrder.order_details.products.length} items will be delivered by </span>
                                            <span className="_order_010">Tue, Aug 1st '23.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_order_003 w-1-3">
                                <div className="disFlexJusConBet">
                                    <div className="_order_012">
                                        <div>
                                            <div className="_order_013">Why call? Just click!</div>
                                            <div>Easily track your Flipkart orders!</div>
                                        </div>
                                        <div className="_order_014" >
                                            <Button variant="contained" color="primary">Go to My Orders</Button>
                                        </div>
                                    </div>
                                    <div className="flexCenCen" >
                                        <CardGiftcardIcon sx={{
                                            fontSize: '70px'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="_order_002 w-1-1 _order_030">
                        <div className='_order_003 w-1-2'>
                            <div className='_order_016'>
                                <div className="_order_017 _order_013">Delivery Address</div>
                                <div className="_order_018">
                                    <div className="flexSpaceBetCen">
                                        <div className="_order_020">{selectedOrder.order_details.address.name}</div>
                                    </div>
                                    <div className="_order_014 w-3-4">
                                        <span className="_check_009">{selectedOrder.order_details.address.address},</span>
                                        <span className="_check_009">{selectedOrder.order_details.address.locality},</span>
                                        <span className="_check_009">{selectedOrder.order_details.address.area} -</span>
                                        <span className="_check_009">{selectedOrder.order_details.address.pincode},</span>
                                        <span className="_check_009">{selectedOrder.order_details.address.state} </span>
                                    </div>
                                    <div className="_order_014 flexSpaceBetCen">
                                        <div>
                                            <span className="_order_020">Phone Number</span>
                                            <div className="_order_023">{selectedOrder.order_details.address.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="_order_024 _order_003 w-1-2 _order_016">
                            <span className="_order_013">Your Rewards</span>
                            <div className="_order_026">
                                <img
                                    src="https://rukminim1.flixcart.com/www/80/80/promos/15/07/2022/b24f2613-b89e-4e0a-8140-1316ad11f394.png?q=100"
                                    alt=""
                                    className="_order_027"
                                />
                                <div className="_order_028">
                                    <div>{(selectedOrder.order_details.price_details.price * 2).toFixed(0)} SuperCoins Cashback</div>
                                    <div className="_order_029">Use it to save on your next order</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {method !== 'postCheckout'
                        &&
                        <div className="_order_030">
                            <div className="_order_031 _order_003">
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <div className="_order_032 w-1-4">
                                        <div className="flexCenCen w-1-3">
                                            <div className="_order_006">
                                                <img className="_order_035"
                                                    src={selectedProduct.thumbnail}
                                                    alt="product"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-2-3">
                                            <div style={{
                                                marginLeft: '10px',
                                            }}>
                                                <div className="_order_036">{selectedProduct.title}</div>
                                                <div className="_order_037">{selectedProduct.description}</div>
                                                <div className="cartProductDetails" style={{
                                                    padding: '0', minHeight: 0
                                                }}>
                                                    {/* <span></span> */}
                                                    <span>${((selectedProduct.price) * 100 / (100 - selectedProduct.discountPercentage)).toFixed(1)}</span>
                                                    <span>${(selectedProduct.price).toFixed(1)}</span>
                                                    <span>{selectedProduct.discountPercentage}% Off</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_order_039 w-1-2">
                                        <Timeline order={selectedOrder} id={status_id} setStatus={setStatus} />
                                        <div className="_order_069 w-3-4">
                                            <div className="_order_070 w-1-1">
                                                <div className="_order_071">
                                                    <div className="_order_072" style={{
                                                        textTransform: 'capitalize'
                                                    }}>Your item is {status === 'nearest_hub' && 'reached'} {status.replace('_', ' ')} on {status === 'confirmed' ? formattedFullDate(selectedOrder.order_date) : formattedFullDate(selectedOrder.order_timeline[status])}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1-4"
                                        style={{
                                            paddingLeft: '30px',
                                            width: '33.33%'
                                        }}>
                                        <div>
                                            {(selectedOrder.order_status !== 'delivered' && selectedOrder.order_status !== 'cancelled' && selectedOrder.order_status !== 'cancelled')
                                                &&
                                                <div
                                                    style={{
                                                        paddingBottom: '10px',
                                                        fontWeight: '500',
                                                        marginLeft: '-10px',
                                                        width: 'auto',
                                                        color: '#2874f0',
                                                        wordBreak: 'break-all',
                                                        display: 'flex',
                                                    }}>
                                                    <span
                                                        style={{ cursor: 'pointer' }}>
                                                        <span
                                                            style={{
                                                                width: '18px',
                                                                margin: '0 8px 0 12px',
                                                                cursor: 'pointer'

                                                            }}>X</span>
                                                        <span onClick={handleCancel}
                                                            style={{
                                                                verticalAlign: 'top',
                                                                cursor: 'pointer'
                                                            }}>cancel Order</span>
                                                    </span>
                                                </div>
                                            }
                                            {(selectedOrder.order_status === 'delivered' && (selectedOrder.order_timeline.return_policy > new Date().getTime()))
                                                &&
                                                <div
                                                    style={{
                                                        paddingBottom: '10px',
                                                        fontWeight: '500',
                                                        marginLeft: '-10px',
                                                        width: 'auto',
                                                        color: '#2874f0',
                                                        wordBreak: 'break-all',
                                                        display: 'flex',
                                                    }}>
                                                    <span
                                                        style={{ cursor: 'pointer' }}>
                                                        <span
                                                            style={{
                                                                width: '18px',
                                                                margin: '0 8px 0 12px',
                                                                cursor: 'pointer'

                                                            }}>--*</span>
                                                        <span onClick={handleCancel}
                                                            style={{
                                                                verticalAlign: 'top',
                                                                cursor: 'pointer'
                                                            }}>Return</span>
                                                    </span>
                                                </div>
                                            }
                                            <div
                                                style={{
                                                    paddingBottom: '10px',
                                                    fontWeight: '500',
                                                    marginLeft: '-10px',
                                                    width: 'auto',
                                                    color: '#2874f0',
                                                    wordBreak: 'break-all',
                                                    display: 'flex',
                                                }}>
                                                <span
                                                    style={{ cursor: 'pointer' }}>
                                                    <span
                                                        style={{
                                                            width: '18px',
                                                            margin: '0 8px 0 12px',
                                                            cursor: 'pointer'

                                                        }}>?</span>
                                                    <span
                                                        style={{
                                                            verticalAlign: 'top',
                                                            cursor: 'pointer'
                                                        }}>Need help?</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {selectedOrder.order_details.products.length > 1
                        &&
                        <div className="_order_030">
                            {method !== 'postCheckout' &&
                                <div className="_order_074 _order_013">Other Items in this order</div>
                            }
                            {selectedOrder.order_details.products.filter(units => units.unit_id !== unit_id).map((unit) =>
                                <OrderMapComponent key={unit.unit_id} order={selectedOrder} unit={unit} type="other_list" />
                            )}
                        </div>
                    }
                </>
                : <WentWrongOrderDetails />
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to cancel the order?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        if you want to cancel order, give reason below

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Reason"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default OrderDetails;