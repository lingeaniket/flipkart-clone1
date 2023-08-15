import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formattedDate, formattedFullDate } from "../Functions/orderListFunctions";

const OrderMapComponent = ({ order, unit, type }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(order.order_status);

    useEffect(() => {
        setStatus(order.order_status);
        // eslint-disable-next-line
    }, [])
    return (
        <div className="_order_075 w-1-1" onClick={() => {
            navigate(`/orderDetails?order_id=${order.order_id}&item_id=${unit.item_id}&unit_id=${unit.unit_id}`);
        }}>
            <div className="_order_002 w-1-1">
                <div className="w-2-5">
                    <div className="_order_002 w-1-1">
                        <div className="flexCenCen w-1-3">
                            <div className="_order_078">
                                <img className="_order_079"
                                    src={unit.unit.thumbnail}
                                    alt="" />
                            </div>
                        </div>
                        <div className="w-2-3">
                            <div style={{ padding: '0 10px' }}>
                                <span className="_order_080 w-1-1">{unit.unit.title}</span>
                                <div className="_order_037">{unit.unit.description}</div>
                                {(type === 'list_item' && order.order_details.products.length - 1 > 0)
                                    &&
                                    <span style={{
                                        fontWeight: '500', marginTop: '10px',
                                    }}>+ {order.order_details.products.length - 1} More Item{(order.order_details.products.length - 1 === 1) ? '' : 's'}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1-5">{type === 'list_item' &&
                    <div className="_order_082">
                        Total Order $ {order.order_details.price_details.price}
                    </div>
                }</div>
                <div className="_order_083 w-2-5">
                    <div>
                        <div className={`_order_084 _order_016 ${order.order_status !== 'cancelled' ? '_order_46': '_order_cancelled'}`}></div>
                        <span className="_order_085">{order.order_status !== 'delivered' ? (order.order_status !== 'cancelled' ? "On the way" : 'Cancelled') : "Delivered" }</span>
                        <div className="_order_086" style={{
                            textTransform: 'capitalize'
                        }}>Your item is {status === 'nearest_hub' && 'reached'} {status.replace('_', ' ')} on {status === 'confirmed' ? formattedFullDate(order.order_date) : formattedFullDate(order.order_timeline[status])}</div>
                    </div>
                </div>
            </div>
            {order.order_status === "cancelled"
                &&
                <div className="_order_087">
                    <div className="_order_088">
                        <span className="_order_089">Refund Completed</span>
                        <span className="_order_090 _order_037">(Refund Id : {order.order_cancel_id})</span>
                    </div>
                    <div className="_order_091">
                        <ul>
                            <li className="_order_092">
                                <span>{order.order_details.price_details.price} has been refunded  on {formattedDate(order.order_timeline.cancelled)} </span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderMapComponent;