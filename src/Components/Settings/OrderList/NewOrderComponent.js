import {  Button } from "@mui/material"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import OrderMapComponent from "./Component/orderMapComponent";
import { useSelector } from "react-redux";
import { SwipeableDrawer } from "@mui/material";

import FilterOrder from "./Component/FilterOrder";

const OrderComponent = () => {

    const orders = useSelector(state => state.orderDetailsState.orders);
    const [orderList, setOrderList] = useState([])

    const [orderStatus, setOrderStatus] = useState([false, false, false, false]);
    const [orderTime, setOrderTime] = useState([false, false, false, false, false]);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen((lastState) => !lastState)
    };

    useEffect(() => {
        setOrderList(orders);
    }, [orders])
    return (
        <div className="_order_094">
            <div className="_order_095">
                <div className="_order_096">
                    <FilterOrder
                        setOpen={setOpen}
                        type="desktop"
                        orderList={orderList}
                        setOrderList={setOrderList}
                        orderStatus={orderStatus}
                         setOrderStatus={setOrderStatus}
                         orderTime={orderTime}
                          setOrderTime={setOrderTime}
                    />
                </div>
                <div className="_order_103">
                    <div className="_order_104">
                        <div className="_order_105">
                            <input type="text" className="_order_106" placeholder="Search your orders here" />
                        </div>
                        <Button variant="contained" sx={{ borderRadius: '0 4px 4px 0', textTransform: 'lowercase' }}>
                            <div className="_order_107">
                                <SearchIcon fontSize="small" sx={{ marginRight: '6px' }} />
                                <span>Search Orders</span>
                            </div>
                        </Button>
                    </div>
                    <div className="_order_111">
                        <div className="_order_110" >
                            <div style={{
                                padding: '5px', fontWeight: 500, textTransform: 'uppercase',
                            }} onClick={() => {
                                setOpen(true);
                            }}>Filters</div>
                        </div>
                    </div>
                    {orderList.map((order) =>
                        <OrderMapComponent key={order.orderId} order={order} unit={order.order_details.products[0]} type="list_item" />
                    )}
                    <div className="_order_108">
                        <div className="_order_109">
                            <span>No more results to display</span>
                        </div>
                    </div>
                </div>
            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                sx={{
                    zIndex: 100
                }}
            >
                <FilterOrder setOpen={setOpen} type="mobile" orderList={orderList} setOrderList={setOrderList}
                orderStatus={orderStatus}
                setOrderStatus={setOrderStatus}
                orderTime={orderTime}
                setOrderTime={setOrderTime}

                />
            </SwipeableDrawer>
        </div >
    )
}

export default OrderComponent;