import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Button, TextField } from '@mui/material';
import { Oval } from 'react-loader-spinner'

// import { useContext } from 'react';
// import productContext from '../../Context/ProductContext/productContext';
import { useNavigate } from 'react-router-dom';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

// import rootContext from '../../Context/RootContext/rootContext';

import { removeFromCart, incrementQuantity, decrementQuantity, updateByValue, addToSaveLater, moveToCart } from '../Features/User/userCartSlice';

import './cart.css'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Cart = () => {
  // const {setRootPage} = useContext(rootContext);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);

  const [totalPrice, setTotalPrice] = useState(0);
  useLayoutEffect(() => {
    // setRootPage(false);
    setTotalPrice(totalPrice =>
      cart.reduce((accum, value) => {
        return accum + Number(value.value.price) * Number(value.quantity);
      }, 0)
    );
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    // eslint-disable-next-line
  }, [])
  return (
    <>{loader ?

      <div class="modal fade show" tabindex="-1" style={{ display: 'block', backgroundColor: 'transparent' }}>
        <div class="modal-dialog modal-fullscreen modalBG" >
          <div class="modal-content" style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={1}
              strokeWidthSecondary={1}
              color="blue"
              secondaryColor="white"
            />

          </div>
        </div>
      </div> : null}
      {!loader ?
        <div style={{ }}>
          <div className='cartBG'>
            <div className='cartMainContainer'>
              <div className='cartMainLeft'>
                <div className='cartItems'>

                  {cart.length !== 0 ? <div>
                    {/* <div>Cart Items</div> */}
                    <div className='cartInnerMain'>
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
                                <Button variant="outlined" onClick={() => {
                                  // console.log(cartItem.value.id)
                                  document.getElementById('loader').classList.toggle('showLoader');
                                  setTimeout(() => {
                                    document.getElementById('loader').classList.toggle('showLoader');

                                    dispatch(decrementQuantity(cartItem.value.id));
                                  }, 500)
                                  // console.log(cartItem.value.id)
                                }}>-</Button>
                                <TextField id="outlined-basic" variant="outlined" size='small' type='number' value={cartItem.quantity} onInput={(event) => {
                                  dispatch(updateByValue({ id: cartItem.value.id, setValue: event.target.value }));
                                  // event.target.value = cartItem.quantity;
                                }} />
                                <Button variant="outlined" onClick={() => {
                                  dispatch(incrementQuantity(cartItem.value.id));
                                  // console.log(cartItem.quantity)
                                }}>+</Button>
                                <Button color="secondary" onClick={() => {
                                  dispatch(addToSaveLater(cartItem));

                                }}>Save for later</Button>
                                <ColorButton variant="contained" onClick={() => dispatch(removeFromCart(cartItem.value))}>remove</ColorButton>
                              </div>
                            </div>
                          </Paper>
                        )}</div>
                    <div className='placeOrder'>
                      <Button variant="contained" color="primary" onClick={() => {
                        navigate('/checkout');
                      }}>Place Order</Button>
                    </div>
                  </div> : <div style={{ aspectRatio: '3/1', display: 'flex', justifyContent: ' center', alignItems: 'center' }}>Sorry! No Items In the Cart</div>
                  }
                </div>
                <div className='cartItems'>
                  {
                    savelater.map((laterItem) =>
                      <Paper key={laterItem.value.id} elevation={1} className='cartProductContainer' style={{
                        display: 'flex',
                        aspectRatio: '2/0.6',
                        margin: '2%',
                        justifyContent: 'space-evenly',
                      }} >
                        <div className='cartProductImageContainer'>
                          <div className='cartProductImage'>

                            <img src={laterItem.value.image} alt={laterItem.value.id} onClick={() => {
                              navigate(`/product/${laterItem.value.id}`);
                            }} />
                          </div>
                        </div>
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', justifyItems: 'center', flexDirection: 'column' }}>
                          <div style={{ height: '45%' }}>
                            {laterItem.value.title} <br />
                            ${laterItem.value.price}
                          </div>
                          <div style={{ height: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Button variant="outlined" disabled>-</Button>
                            <TextField id="outlined-basic" variant="outlined" size='small' type='number' value={laterItem.quantity} disabled />
                            <Button variant="outlined" disabled>+</Button>
                            <Button color="secondary" onClick={() => {
                              dispatch(moveToCart(laterItem));
                            }}>move to cart</Button>
                            <ColorButton variant="contained" onClick={() => {
                              // console.log(laterItem.value);
                              dispatch(removeFromCart(laterItem.value))
                            }}>remove</ColorButton>
                          </div>
                        </div>
                      </Paper>
                    )
                  }
                </div>
              </div>
              <div className='sticky' style={{ width: '24%', backgroundColor: 'transparent', maxHeight: '100%', position: 'sticky', top: '78px', alignSelf: 'flex-start' }}>
                <div style={{ backgroundColor: 'white' }}>
                  <div className='cartF1'>
                    <div className='cartF1-1'>PRICE DETAILS</div>
                  </div>
                  <div className='cartF2'>
                    <div className='cartF2-1'>
                      <div className='cartF2Flex'>
                        <div>Price ({cart.length})items</div>
                        <div className='cartF2Flex1'>$ {
                          totalPrice
                          // cart.reduce((accum, value)=> {
                          //   return accum + Number(value.value.price)*Number(value.quantity);
                          // }, 0)
                        }</div>
                      </div>
                      <div className='cartF2Flex'>
                        <div>Discount</div>
                        <div className='cartF2Flex1 cartF2text'>{0}</div>
                      </div>
                      <div className='cartF2Flex'>
                        <div>Delivery Charges</div>
                        <div className='cartF2Flex1 cartF2text'>{totalPrice < 50 ? (totalPrice === 0 ? '0' : '$ 0.5') : 'Free'}</div>
                      </div>

                    </div>
                    <div className='cartF2-2'>
                      <div className='cartF2Flex'>
                        <div className='cartF2text2'>Total Amount</div>
                        <div className='cartF2Flex1 cartF2text2'>$ {
                          totalPrice < 55 ? (totalPrice === 0 ? 0 : Math.round((totalPrice + 0.5) * 100) / 100) : Math.round((totalPrice) * 100) / 100
                          // cart.reduce((accum, value)=> {
                          //   return accum + Number(value.value.price)*Number(value.quantity);
                          // }, 0) < 50 ? Math.round((cart.reduce((accum, value)=> {
                          //   return accum + Number(value.value.price)*Number(value.quantity);
                          // }, 0) + 0.5)*100) /100 : 
                          // totalPrice < 50 ? Math.round((totalPrice + 0.5) * 100) / 100 : Math.round((totalPrice) * 100) / 100
                        }</div>
                      </div>
                    </div>

                  </div>
                </div>
                <div>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
              </div>
            </div>
            <div className='hideLoader' id='loader'>
              <div class="modal fade show" tabindex="-1" style={{ display: 'block', backgroundColor: 'transparent' }}>
                <div class="modal-dialog modal-fullscreen modalBG" >
                  <div class="modal-content" style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Oval
                      ariaLabel="loading-indicator"
                      height={100}
                      width={100}
                      strokeWidth={1}
                      strokeWidthSecondary={1}
                      color="blue"
                      secondaryColor="white"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div></div> : null}
    </>
  )
}

export default Cart;