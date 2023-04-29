import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './orderList.css';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import OrderCancel from '../../ConfirmDialogue/orderCancel.component';
import { useState } from 'react';

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '100%',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function BasicStack() {
  const orders = useSelector(state => state.orderDetailsState.orders);
  const [orderCancelOpen, setOrderCancelOpen] = useState(false);
  const [cancelId, setCancelId] = useState(false);
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
            orders.map(order => (
              <Item1 className='orderDivFull' key={order.orderId} elevation={2}>
                <Box display={"flex"} justifyContent={'space-between'} margin={'0.8vw 0'}>
                  <div className='orderId'>Order Id: <span style={{ color: 'blueviolet', fontWeight: 'bold', cursor: 'pointer' }}>

                    {order.orderId}
                  </span>
                  </div>
                  <div className='orderId'>Order Date: {order.orderDate}</div>
                </Box>
                <Box>
                  <div className='totalOrderTitle1'>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className='totalOrderTitle'
                          textAlign={'left'}>Total Orders ({order.orderProducts.length})</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack direction="column"
                          justifyContent="center"
                          alignItems="stretch"
                          divider={<Divider orientation="horizontal" sx={{ color: 'black', alignSelf: 'center', opacity: '1', width: '90%', borderColor: 'rgb(0 0 0 / 23%)' }} flexItem />}
                          padding={'2% 0'}
                          spacing={2}>{
                            order.orderProducts.map((item) =>
                              <Item2 key={`${item.value.id}${order.orderId.slice(-6)}`} elevation={2}>
                                <Box sx={{ width: '100%' }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                      <Box>
                                        <ButtonBase className='imgBase'>
                                          <Img alt="complex" src={item.value.image} />
                                        </ButtonBase>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={8} justifyContent={'flex-start'}>
                                      {/* <Box> */}
                                      <Box justifyContent={'flex-start'} className='orderProductTitle'>{item.value.title}</Box>
                                      <Box textAlign={'right'}>
                                        <div className='orderProductDetail'>
                                          Quantity : <Chip className='orderProductChip' label={item.quantity} size="small" />
                                        </div>
                                        <div className='orderProductDetail'>
                                          Price : <Chip className='orderProductChip' label={item.value.price} size="small" />
                                        </div>
                                        <div className='orderProductDetail'>
                                          Total Price : <Chip className='orderProductChip' label={`(${item.quantity} x ${item.value.price})  ${item.quantity * item.value.price}`} size="small" style={{ color: 'green' }} />
                                        </div>
                                      </Box>
                                      {/* </Box> */}
                                    </Grid>

                                  </Grid>
                                </Box>
                              </Item2>
                            )
                          }</Stack>
                      </AccordionDetails>
                    </Accordion>

                  </div>
                </Box>

                <Box className='orderShippingMain'>
                  <Box className='orderShippingAddress'>

                    <div className='shippingTitle'>Shipping To</div>
                    <Box textAlign={'left'}>
                      <Typography gutterBottom className='orderShippingInfo'>{order.orderShipping.firstName} {order.orderShipping.lastName}</Typography>
                      <Typography gutterBottom className='orderShippingInfo'>{order.orderShipping.address1}, <br />
                        {order.orderShipping.address2 !== undefined && (order.orderShipping.address2, <br />)}
                        {order.orderShipping.city}, {order.orderShipping.state}, {order.orderShipping.country}, <br />
                        {order.orderShipping.zip}<br />
                        {order.orderShipping.phoneNumber}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} width={'35%'}>
                    <div className='shippingTitle'>Price Summarry</div>
                    <div style={{ width: '100%' }}>
                      <div className='priceDetails'>
                        <div>Total Order Price: </div>
                        <div style={{ fontWeight: 'bold' }}> $ {order.orderDeliveryFree ? order.orderTotal : order.orderTotal - 0.5}</div>
                      </div>
                      <div className='priceDetails'>
                        <div>Discount:</div>
                        <div style={{ fontWeight: 'bold' }}>0</div>
                      </div>
                      <div className='priceDetails'>
                        <div>Delivery Charges:</div>
                        <div style={{ fontWeight: 'bold' }}>{order.orderDeliveryFree ? 'Free' : '$ 0.5'}</div>
                      </div>
                      <div className='totalPriceDetails'>
                        <div>Total Amount:</div>
                        <div style={{ fontWeight: 'bold' }}>{order.orderTotal}</div>
                      </div>
                    </div>
                  </Box>
                </Box>

                <Box className='handleOrders'>
                  <Button variant="outlined" color="success" sx={{ pointerEvents: 'none' }} onClick={() => {
                    // navigate(`/checkout?id=${product.id}&quantity=1`)
                  }}>Total Order Price:
                    <span style={{ fontWeight: 'bold' }}> $ {order.orderTotal}</span>
                  </Button>

                  <Button variant="contained" color="error" onClick={() => {
                    setOrderCancelOpen(true);
                    setCancelId(order.orderId);
                  }}>
                    Cancel Order
                  </Button>
                </Box>
              </Item1>
            ))
          }
        </Stack>
      </Box>
    </Box>
    <OrderCancel setOrderCancelOpen={setOrderCancelOpen} cancelId={cancelId} orderCancelOpen={orderCancelOpen} />
  </>
  );
}
