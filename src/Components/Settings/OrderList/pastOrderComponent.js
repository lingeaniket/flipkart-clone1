import React from 'react'
import { useSelector } from 'react-redux'
import Order from './orderComponent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import './orderList.css';

const PastOrder = () => {
    const orders = useSelector(state => state.orderDetailsState.orders);
    return (
        <Box className='orderContent'>
            <Paper className='orderPageTitle'>
                <div>
                    Past Orders
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
                    orders.shift().map(order => (
                        <Order order={order.orderDetails} cancelledOrderReason='' isOrder={false} />
                    ))
                }
            </Stack>
        </Box>
    )
}

export default PastOrder;