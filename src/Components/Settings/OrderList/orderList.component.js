import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import './orderList.css';
import Button from '@mui/material/Button';
import OrderCancel from '../../ConfirmDialogue/orderCancel.component';
import Order from './orderComponent';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function BasicStack() {
  const orders = useSelector(state => state.orderDetailsState.orders);
  const [orderCancelOpen, setOrderCancelOpen] = useState(false);
  const [cancelId, setCancelId] = useState(false);
  const navigate = useNavigate();
  return (<>
    <Box className="orderMainContent">
      <Box className='orderContent'>
        <Paper className='orderPageTitle'>
          <div>
            My Orders
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
            orders.length > 0 ?
            orders.map(order => (
              <Order order={order} isOrder={true} setOrderCancelOpen={setOrderCancelOpen} setCancelId={setCancelId}/>
            )) : <div className='noOrders'>No cancelled Orders</div>
          }
        </Stack>
      </Box>
      <Box className="orderHistoryBtn" sx={{display: 'flex', justifyContent: 'center', width: '80%'}}>
        {/* <Button color='success' variant='contained' onClick={()=>{
          navigate('orders/pastOrders')
        }}>View Past Orders</Button> */}
        <Button variant='contained' color='success' onClick={()=> {
          navigate('orders/cancelledOrders');
        }}>View Cancelled Orders</Button>
      </Box>
      <Outlet />
    </Box>
    <OrderCancel setOrderCancelOpen={setOrderCancelOpen} cancelId={cancelId} orderCancelOpen={orderCancelOpen} />
  </>
  );
}
