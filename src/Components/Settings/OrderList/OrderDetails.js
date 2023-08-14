import { useEffect, useState } from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Button from '@mui/material/Button';

import './Styles/orderListStyles.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderMapComponent from "./Component/orderMapComponent";
import WentWrongOrderDetails from "../../WentWrong/wentWrong";
import { formattedDate, getOrderTimeLineIndex } from "./Functions/orderListFunctions";
import OrderRewards from "./Component/OrdeRewards";
import OrderTimeline from "./Component/OrderTimeline";
import { clearCart } from "../../Features/User/userCartSlice";

const OrderDetails = ({ method }) => {
    const orders = useSelector(state => state.orderDetailsState.orders)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [status, setStatus] = useState(null);
    const [status_id, setStatus_id] = useState(0);
    const [searchParams] = useSearchParams()
    const order_id = searchParams.get('order_id');
    const item_id = searchParams.get('item_id');
    const unit_id = searchParams.get('unit_id');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (method === 'postCheckout') {
            dispatch(clearCart());
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
        // eslint-disable-next-line
    }, [method, orders, order_id, item_id, unit_id]);

    return (
        <div className="_order_001">
            {selectedOrder
                ?
                <>
                    {method === 'postCheckout'
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
                                            <span className="_order_010">{formattedDate(selectedOrder.order_timeline.delivered)}</span>
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
                                            <Button variant="contained" color="primary" onClick={() => {
                                                navigate('/orders')
                                            }}>Go to My Orders</Button>
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
                    <OrderRewards selectedOrder={selectedOrder} />
                    {method !== 'postCheckout'
                        &&
                        <OrderTimeline
                            selectedOrder={selectedOrder}
                            selectedProduct={selectedProduct}
                            status_id={status_id}
                            setStatus={setStatus}
                            status={status} />
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
                    {(selectedOrder.order_details.products.length === 1 && method === "postCheckout")
                        &&
                        <div className="_order_030">
                            {selectedOrder.order_details.products.map((unit) =>
                                <OrderMapComponent key={unit.unit_id} order={selectedOrder} unit={unit} type="other_list" />
                            )}
                        </div>
                    }
                </>
                :
                <WentWrongOrderDetails />
            }
        </div>
    )
}

export default OrderDetails;