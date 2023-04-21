import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Rating, Button , TextField } from '@mui/material';
import { useContext } from 'react';
import productContext from '../../Context/ProductContext/productContext';
import { useNavigate } from 'react-router-dom';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

import { removeFromCart } from '../Features/User/userCartSlice';

import './cart.css'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productArr] = useContext(productContext);
  const cart = useSelector(state => state.cartState.cartItems);
  return (
    <div className='cartBG'>
      <div className='cartMainContainer'>
        <div className='cartMainLeft'>
          <div className='cartItems'>

          {
            cart.map((cartItem) =>
              <Paper key={cartItem.value.id} elevation={1} className='cartProductContainer' style={{
                display: 'flex',
                aspectRatio: '2/0.6',
                margin: '2%',
                justifyContent: 'space-evenly',
              }} >
                <div className='cartProductImageContainer'>
                  <div className='cartProductImage'>

                    <img src={cartItem.value.image} alt={cartItem.value.id} onClick={() => {
                      navigate(`/product/${cartItem.value.id}`);
                    }} />
                  </div>
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', justifyItems: 'center', flexDirection: 'column' }}>
                  <div style={{ height: '45%' }}>
                    {cartItem.value.title} <br />
                    ${cartItem.value.price}
                  </div>
                  <div style={{ height: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Button variant="outlined">-</Button>
                  <TextField id="outlined-basic" variant="outlined"  size='small'/>
                  <Button variant="outlined">+</Button>
                  <Button color="secondary">Save for later</Button>
                    <ColorButton variant="contained" onClick={() => dispatch(removeFromCart(cartItem.value))}>remove</ColorButton>
                  </div>
                </div>
              </Paper>
            )
          }
          </div>
          <div className='saveforlater'></div>
          </div>
        <div className='sticky' style={{ width: '24%', backgroundColor: 'transparent', maxHeight: '100%', position: 'sticky', top: '78px', alignSelf: 'flex-start' }}>
          <div style={{ backgroundColor: 'white' }}>Payment</div>
          <div>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
        </div>
      </div>

    </div>
  )
}

export default Cart;