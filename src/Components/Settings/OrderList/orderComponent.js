import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
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
import ContentLoader from '../../Loader/contentLoader.component'

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
const OrderComponent = (props) => {
    const [order, setorder] = React.useState({})
    const [loader, setLoader] = React.useState(true)

    React.useLayoutEffect(()=>{
        setTimeout(() => {
            setLoader(false);
            setorder(order=> props.order);
            console.log(order)
        }, 1000)
        // eslint-disable-next-line 
    },[])
  return (
    <>{loader ? <ContentLoader /> : null}
    {!loader ? 
    
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
              textAlign={'left'}>Total Orders ({props.order.orderProducts.length})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column"
              justifyContent="center"
              alignItems="stretch"
              divider={<Divider orientation="horizontal" sx={{ color: 'black', alignSelf: 'center', opacity: '1', width: '90%', borderColor: 'rgb(0 0 0 / 23%)' }} flexItem />}
              padding={'2% 0'}
              spacing={2}>{
                props.order.orderProducts.map((item) =>
                  <Item2 key={`${item.value.id}${props.order.orderId.slice(-6)}`} elevation={2}>
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
          <Typography gutterBottom className='orderShippingInfo'>{props.order.orderShipping.firstName} {props.order.orderShipping.lastName}</Typography>
          <Typography gutterBottom className='orderShippingInfo'>{props.order.orderShipping.address1}, <br />
            {props.order.orderShipping.address2 !== undefined && (props.order.orderShipping.address2, <br />)}
            {props.order.orderShipping.city}, {props.order.orderShipping.state}, {props.order.orderShipping.country}, <br />
            {props.order.orderShipping.zip}<br />
            {props.order.orderShipping.phoneNumber}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} width={'35%'}>
        <div className='shippingTitle'>Price Summarry</div>
        <div style={{ width: '100%' }}>
          <div className='priceDetails'>
            <div>Total Order Price: </div>
            <div style={{ fontWeight: 'bold' }}> $ {props.order.orderDeliveryFree ? props.order.orderTotal : props.order.orderTotal - 0.5}</div>
          </div>
          <div className='priceDetails'>
            <div>Discount:</div>
            <div style={{ fontWeight: 'bold' }}>0</div>
          </div>
          <div className='priceDetails'>
            <div>Delivery Charges:</div>
            <div style={{ fontWeight: 'bold' }}>{props.order.orderDeliveryFree ? 'Free' : '$ 0.5'}</div>
          </div>
          <div className='totalPriceDetails'>
            <div>Total Amount:</div>
            <div style={{ fontWeight: 'bold' }}>{props.order.orderTotal}</div>
          </div>
        </div>
      </Box>
    </Box>

    <Box className='handleOrders'>
      <Button variant="outlined" color="success" sx={{ pointerEvents: 'none' }} onClick={() => {
      }}>Total Order Price:
        <span style={{ fontWeight: 'bold' }}> $ {props.order.orderTotal}</span>
      </Button>

      {props.isOrder ? 

      <Button variant="contained" color="error" onClick={() => {
        props.setOrderCancelOpen(true);
        props.setCancelId(props.order.orderId);
      }}>
        Cancel Order
      </Button> : null}
    </Box>
      {!props.isOrder ? 
    <Box>
        <Box className="cancelReasonTitle">Reason For Cancellation</Box>
        <Box className='cancelReasonDescript'>{props.cancelledOrderReason}</Box>
    </Box>: null}

  </Item1> : null}
    </>
  )
}

export default OrderComponent