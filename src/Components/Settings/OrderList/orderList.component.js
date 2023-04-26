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
  width: '60%',
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
    <Box sx={{ width: '100%', backgroundColor: '#d2d2d2' }} display={'flex'} justifyContent={'center'}>
      <Box sx={{ width: '80%', backgroundColor: 'whitesmoke' }} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
        <div>Hi this are your orders</div>
        <Stack direction="column"
          justifyContent="center"
          alignItems="center"
          divider={<Divider orientation="horizontal" sx={{ color: 'black', alignSelf: 'center', opacity: '1', width: '60%', borderColor: 'rgb(0 0 0 / 23%)' }} flexItem />}
          padding={'2% 0'}
          spacing={2}>{
            orders.map(order => (
              <Item1 key={order.orderId} elevation={2}>
                <Box>
                  <div>Order Id: {order.orderId}</div>
                </Box>
                <Box>
                  <div>Order Date: {order.orderDate}</div>
                </Box>
                <Box>
                  <div>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography height={'25px'} width={'75%'} fontSize={'14px'}
                          textAlign={'left'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>Total Orders ({order.orderProducts.length})</Typography>
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
                                        <ButtonBase sx={{ width: 128, height: 128 }}>
                                          <Img alt="complex" src={item.value.image} />
                                        </ButtonBase>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={8} justifyContent={'flex-start'}>
                                      {/* <Box> */}
                                      <Box justifyContent={'flex-start'} sx={{ fontSize: '12px' }}>{item.value.title}</Box>
                                      <Box textAlign={'right'}>
                                        <div style={{ margin: '1% 0' }}>
                                          Quantity : <Chip label={item.quantity} size="small" />
                                        </div>
                                        <div style={{ margin: '1% 0' }}>
                                          Total Price : <Chip label={item.quantity * item.value.price} size="small" />
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
                <Box display={'flex'} justifyContent={'space-evenly'} margin={'1%'}>
                  <Button variant="contained" color="success" sx={{ pointerEvents: 'none' }} onClick={() => {
                    // navigate(`/checkout?id=${product.id}&quantity=1`)
                  }}> $ {order.orderTotal
                    }</Button>

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
      </Box></Box>
    <OrderCancel setOrderCancelOpen={setOrderCancelOpen} cancelId={cancelId} orderCancelOpen={orderCancelOpen} />
  </>
  );
}
