import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { addOrder, handleCurrentOrderId, saveAddress, savePayment } from '../Features/User/orderDetailsSlice';
import { useSearchParams } from 'react-router-dom';
import { clearCart } from '../Features/User/userCartSlice';

export default function Review(props) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [deliveryFree, setDeliveryFree] = React.useState(false);
  const products = [];
  const [itemId] = useSearchParams();
  const productsArray = useSelector(state => state.productState.products)
  const cartItems = useSelector(state => state.cartState.cartItems)
  const id = itemId.get('id');
  const quantity = itemId.get('quantity');
  let isSingleProduct = false;
  if (id !== null) {
    const obj = {};
    obj['value'] = productsArray.find(product => product.id === Number(id))
    obj['quantity'] = Number(quantity);
    isSingleProduct = true;
    products.push(obj);
  } else {
    cartItems.map((item) =>
      products.push(item)
    )
    // products.push(cartItems);
  }
  const userDetails = useSelector(state => state.orderDetailsState.currentOrderDetails);
  const lastId = useSelector(state => state.orderDetailsState.lastId);
  const address = userDetails[0];
  const payment = userDetails[1];
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    const price = products.reduce((accum, value) => {
      return accum + Number(value.value.price) * Number(value.quantity);
    }, 0)
    setTotalPrice(totalPrice => {
      return price < 55 ? price + 0.5 : price
    });

    price < 55 ? setDeliveryFree(false) : setDeliveryFree(true);

    // eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <form id='formId2' onSubmit={(event) => {
        event.preventDefault();
        if (address.saveAddress !== undefined) {
          dispatch(saveAddress());
        }
        if (payment.savepayment !== undefined) {
          dispatch(savePayment())
        }
        const date = new Date();
        const random = Math.floor(Math.random() * (1000 - 100)) + 100;
        const random2 = Math.floor(Math.random() * (500 - 50)) + 50;
        const id1 = `${date.getFullYear()}-${date.getMonth()}${random}${date.getHours()}${date.getMinutes()}-${random2}${lastId}`
        dispatch(handleCurrentOrderId(id1));
        props.setOrderId(id1);
        dispatch(addOrder({ products: products, totalPrice: totalPrice, freeDelivery: deliveryFree }));
        document.getElementById('loader').classList.toggle('showLoader');
        if (!isSingleProduct) {
          dispatch(clearCart());
        }
        setTimeout(() => {
          document.getElementById('loader').classList.toggle('showLoader');
          props.handleRedirect();
          props.handleNext();
        }, 2000)
      }} ></form>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.value.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.value.title} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.firstName} {address.lastName}</Typography>
          <Typography gutterBottom>{address.address1}, <br />
            {address.address2 !== undefined && (address.address2, <br />)}
            {address.city}, {address.state}, {address.country}, <br />
            {address.zip}<br />
            {address.phoneNumber}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key={payment.cardNumber.slice(-4)}>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Holder: Mr/Mrs. {payment.cardName}</Typography>
                <Typography gutterBottom>Card Number: xxxx-xxxx-{payment.cardNumber.slice(-4)}</Typography>
                <Typography gutterBottom>Card Expiry: {payment.expDate.slice(0, 2)}/{payment.expDate.slice(-2)}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}