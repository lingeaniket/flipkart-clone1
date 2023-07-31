import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import OrderMapComponent from "./Component/orderMapComponent";
import { useSelector } from "react-redux";
const OrderComponent = () => {

    const orders = useSelector(state => state.orderDetailsState.orders);
    const [orderList, setOrderList] = useState([])


    const [handleOrderStatuschecked, setHandleOrderStatusChecked] = useState([false, false, false, false]);
    // const [handleOrderTimechecked, setHandleOrderTimeChecked] = useState([false, false, false, false, false]);

    const handleOrderStatusChange = (event, idx) => {
        handleOrderStatuschecked[idx] = event.target.checked;
        setHandleOrderStatusChecked((checked) => [...checked]);
        // console.log(checked);
    };
    // const handleOrderTimeChange = (event, idx) => {
    //     handleOrderTimechecked[idx] = event.target.checked;
    //     setHandleOrderTimeChecked((checked) => [...checked]);
    //     // console.log(checked);
    // };

    useEffect(() => {

        setOrderList(orders);

    }, [orders])
    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '18px', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                {/* left component?? */}
                <div style={{ width: '20%', }}>
                    <div
                        style={{
                            height: 'max-height',
                            paddingBottom: '8px',
                            lineHeight: '24px',
                            backgroundColor: 'white',
                            borderRadius: '2px',
                            boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)'
                        }}>
                        <div style={{ padding: '8px 16px', fontWeight: '500', fontSize: '20px' }}>
                            Filters
                        </div>
                        <div style={{
                            padding: '0 16px',
                            borderTop: '1px solid #f8f8f8'
                        }}>
                            <div style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                padding: '8px 0'
                            }}>
                                order status
                            </div>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 0) }}
                                    />} label="On the way" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 1) }}
                                    />} label="Delivered" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 2) }}
                                    />} label="Cancelled" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="Returned" />
                            </FormGroup>
                        </div>
                        <div style={{
                            padding: '0 16px',
                            borderTop: '1px solid #f8f8f8'
                        }}>
                            <div style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                padding: '8px 0'
                            }}>
                                order time
                            </div>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 0) }}
                                    />} label="Last 30 days" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 1) }}
                                    />} label="2022" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 2) }}
                                    />} label="2021" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="2020" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="Older" />
                            </FormGroup>
                        </div>

                    </div>
                </div>
                {/* right component/// */}
                <div style={{ width: ' 100%', paddingLeft: '16px' }}>
                    <div style={{
                        display: 'flex',
                        marginRight: '10%',
                        marginBottom: '16px',
                        borderRadius: '4px 0 0 4px'
                    }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input type="text" style={{
                                height: '40px',
                                width: '100%',
                                border: '1px solid #dbdbdb',
                                padding: '8px',
                                borderRadius: '4px 0 0 4px',
                                fontSize: '14px'

                            }} placeholder="Search your orders here" />
                        </div>
                        <Button variant="contained" sx={{ borderRadius: '0 4px 4px 0', textTransform: 'lowercase' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none',
                            }}

                            >
                                <SearchIcon fontSize="small" sx={{ marginRight: '6px' }} />
                                <span>Search Orders</span>
                            </div>
                        </Button>
                    </div>
                    {/* orders map */}
                    {orderList.map((order) =>

                        // order_details : {
                        //     address, 
                        //     payment_method, 
                        //     price_details,
                        //      products : array [{
                        //         order_id, 
                        //         item_id, 
                        //         unit_id, 
                        //         unit : {id, title, description}
                        //     }]
                        // },
                        //  order_date, 
                        //  order_id,
                        //   order_status
                        <OrderMapComponent key={order.orderId} order={order} unit={order.orderDetails.products[0]} type="list_item" />
                    )}
                    {/* last div */}
                    <div style={{
                        margin: '10px 0',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: '#2874f0',
                            fontWeight: 500,
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#fff',
                            border: '1px solid #d7d7d7',
                            fontSize: '14px',
                            borderRadius: '2px',
                            textTransform: 'capitalize',
                            boxShadow: 'none',
                        }}>
                            <span>No more results to display</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderComponent;