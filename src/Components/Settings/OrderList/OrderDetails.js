import { useEffect, useState } from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import './Styles/orderListStyles.css'
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import OrderMapComponent from "./Component/orderMapComponent";
import WentWrongOrderDetails from "../../WentWrong/wentWrong";

const OrderDetails = ({ method }) => {
    const orders = useSelector(state => state.orderDetailsState.orders)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchParams] = useSearchParams()
    const order_id = searchParams.get('order_id');
    const item_id = searchParams.get('item_id');
    const unit_id = searchParams.get('unit_id');
    console.log(orders[0])

    useEffect(() => {
        if (method === 'postCheckout') {
            console.log('working')
            setSelectedOrder(() => orders[0])
        } else {
            setSelectedOrder(orders.filter(item =>
                item.order_id === order_id)[0]
            );
            setSelectedProduct(orders.filter(item =>
                item.order_id === order_id)[0].order_details.products.filter(product =>
                    product.unit_id === unit_id)[0].unit
            )
        }
        // setSelectedOrder(orders[0])

    }, [method, orders, order_id, item_id, unit_id]);

    return (
        <div className="_order_001">
            {selectedOrder ?

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
                                        Boys Hostel Near Baramati Bank, Nityanand Society,
                                        Balaji Nagar Dhankawadi,  Pune - 411043, Maharashtra
                                    </div>
                                    <div className="_order_014 flexSpaceBetCen">
                                        <div>
                                            <span className="_order_020">Phone Number</span>
                                            <div className="_order_023">7030325245</div>
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
                                    <div>16 SuperCoins Cashback</div>
                                    <div className="_order_029">Use it to save on your next order</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        method !== 'postCheckout' &&
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
                                            <div>
                                                <div className="_order_036">{selectedProduct.title}</div>
                                                <div className="_order_037">{selectedProduct.description}</div>
                                                <div className="_order_038">{selectedProduct.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_order_039 w-1-2">
                                        <div className="disFlexJusConCen">
                                            <div className="_order_041 w-1-4">
                                                <div className="_order_042">Order Confirmed</div>
                                                <div className="_order_043 flexCenCen">
                                                    <div className="_order_044"></div>
                                                    <div className="_order_045"></div>
                                                    <div className="_order_046"></div>
                                                </div>
                                                <div className="_order_047">Tue, 20th Sep</div>
                                            </div>
                                            <div className="_order_041 w-1-4">
                                                <div className="_order_042">Shipped</div>
                                                <div className="_order_043 flexCenCen">
                                                    <div className="_order_046"></div>
                                                    <div className="_order_045"></div>
                                                    <div className="_order_046"></div>
                                                </div>
                                                <div className="_order_047">Tue, 20th Sep</div>
                                            </div>
                                            <div className="_order_041 w-1-4">
                                                <div className="_order_042">Out For Delivery</div>
                                                <div className="_order_043 flexCenCen">
                                                    <div className="_order_046"></div>
                                                    <div className="_order_045"></div>
                                                    <div className="_order_046"></div>
                                                </div>
                                                <div className="_order_047">Tue, 20th Sep</div>
                                            </div>
                                            <div className="_order_041 w-1-4">
                                                <div className="_order_042">Delivered</div>
                                                <div className="_order_043 flexCenCen">
                                                    <div className="_order_046"></div>
                                                    <div className="_order_045"></div>
                                                    <div className="_order_044"></div>
                                                </div>
                                                <div className="_order_047">Tue, 20th Sep</div>
                                            </div>
                                        </div>
                                        <div className="_order_069 w-3-4">
                                            <div className="_order_070 w-1-1">
                                                <div className="_order_071">
                                                    <div className="_order_072">Your item is out for delivery</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1-4" style={{
                                        paddingLeft: '30px',
                                        width: '33.33%'
                                    }}>
                                        <div>
                                            <div style={{
                                                paddingBottom: '10px',
                                                fontWeight: '500',
                                                marginLeft: '-10px',
                                                width: 'auto',
                                                color: '#2874f0',
                                                wordBreak: 'break-all',
                                                display: 'flex',
                                            }}>
                                                <span style={{ cursor: 'pointer' }}>
                                                    <span style={{
                                                        verticalAlign: 'middle',
                                                        width: '18px',
                                                        margin: '0 8px 0 12px',
                                                        cursor: 'pointer'

                                                    }}>?</span>
                                                    <span style={{
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
                    {
                        selectedOrder.order_details.products.length > 1
                        &&
                        <div className="_order_030">
                            {method !== 'postCheckout' &&
                                <div className="_order_074 _order_013">Other Items in this order</div>
                            }

                            {
                                selectedOrder.order_details.products.filter(units => units.unit_id !== unit_id).map((unit) =>

                                    <OrderMapComponent key={unit.unit_id} order={selectedOrder} unit={unit} type="other_list" />
                                )
                            }
                        </div>
                    }
                </>
                : <WentWrongOrderDetails />

            }
        </div>
    )
}

export default OrderDetails;