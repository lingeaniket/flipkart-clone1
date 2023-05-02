import React from 'react'
import { useSelector } from 'react-redux'
import Order from './orderComponent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import './orderList.css';

const CancelledOrder = () => {
    const cancelledOrder = useSelector(state => state.orderDetailsState.cancelledOrders);
    console.log(cancelledOrder)

    return (
        <>
            <Box className='orderContent' sx={{marginTop: '1vw'}}>
                <Paper className='orderPageTitle'>
                    <div>
                        Cancelled Orders
                    </div>
                </Paper>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    display='flex'
                    className='ordersStack'
                    divider={<Divider className='divider' orientation="horizontal" sx={{}} flexItem />}
                    padding={'2% 0'}
                    spacing={2}>{
                        cancelledOrder.length > 0 ?
                        cancelledOrder.map(order => (
                            <Order order={order.orderDetails} cancelledOrderReason={order.cancelledOrderReason} isOrder={false} />
                        )) : <div className='noOrders'>No cancelled Orders</div>
                    }
                </Stack>
            </Box>
        </>
    )
}

export default CancelledOrder