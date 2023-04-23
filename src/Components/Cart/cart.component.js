import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Button, TextField } from '@mui/material';
// import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateByValue,
  addToSaveLater,
  moveToCart
} from '../Features/User/userCartSlice';

import './cart.css'
import ContentLoader from '../Loader/contentLoader.component';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);

  const [totalPrice, setTotalPrice] = useState(0);
  useLayoutEffect(() => {
    setTotalPrice(totalPrice =>
      cart.reduce((accum, value) => {
        return accum + Number(value.value.price) * Number(value.quantity);
      }, 0)
    );
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    // eslint-disable-next-line
  }, [cart])

  return (
    <>{loader ? <ContentLoader /> : null}
      {!loader ?
        <div>
          <div className='cartBG disFlexJusConEven'>
            <div className='cartMainContainer disFlexJusConEven'>
              <div className='cartMainLeft disFlexJusConEven'>
                <div className='cartItems'>
                  {cart.length !== 0 ?
                    <div>
                      <div className='cartInnerMain'>
                        {
                          cart.map((cartItem) =>
                            <Paper key={cartItem.value.id} elevation={1} className='cartProductContainer disFlexJusConEven' >
                              <div className='cartProductImageContainer '>
                                <div className='cartProductImage disFlexJusConCen disFlexAlignItCen'>
                                  <img
                                    src={cartItem.value.image}
                                    alt={cartItem.value.id}
                                    onClick={() => {
                                      navigate(`/product/${cartItem.value.id}`);
                                    }} />
                                </div>
                              </div>
                              <div className='cartInfoContainer disFlexJusConEven'>
                                <div style={{ height: '45%' }}>
                                  {cartItem.value.title} <br />
                                  ${cartItem.value.price}
                                </div>
                                <div className='disFlexJusConCen' style={
                                  {
                                    height: '45%',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                  }
                                }>
                                  <Button variant="outlined"
                                    onClick={() => {
                                      document.getElementById('loader').classList.toggle('showLoader');
                                      setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        dispatch(decrementQuantity(cartItem.value.id));
                                      }, 500)
                                    }}>-</Button>
                                  <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    type='number'
                                    value={cartItem.quantity}
                                    onInput={(event) => {
                                      dispatch(updateByValue({ id: cartItem.value.id, setValue: event.target.value }));
                                    }} />
                                  <Button
                                    variant="outlined"
                                    onClick={() => {
                                      dispatch(incrementQuantity(cartItem.value.id));
                                    }}>+</Button>
                                  <Button
                                    color="secondary"
                                    onClick={() => {
                                      dispatch(addToSaveLater(cartItem));
                                    }}>Save for later</Button>
                                  <ColorButton
                                    variant="contained"
                                    onClick={() =>
                                      dispatch(removeFromCart(cartItem.value))
                                    }>remove</ColorButton>
                                </div>
                              </div>
                            </Paper>
                          )}</div>
                      <div className='placeOrder disFlexAlignItCen'>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            navigate('/checkout');
                          }}>Place Order</Button>
                      </div>
                    </div> :
                    <div className='disFlexJusConEven' style={
                      {
                        aspectRatio: '3/1',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }
                    }>
                      Sorry! No Items In the Cart
                      <div>
                        <Button onClick={() => {
                          navigate('/home')
                        }}>Start Shopping</Button>
                      </div>
                    </div>
                  }
                </div>
                <div className='cartItems'>
                  {
                    savelater.length > 0 && <div>Saved For Later ({savelater.length})</div>
                  }
                  {
                    savelater.map((laterItem) =>
                      <Paper key={laterItem.value.id} elevation={1} className='cartProductContainer disFlexJusConEven' style={{

                        aspectRatio: '2/0.6',
                        margin: '2%',
                      }} >
                        <div className='cartProductImageContainer'>
                          <div className='cartProductImage'>

                            <img src={laterItem.value.image} alt={laterItem.value.id} onClick={() => {
                              navigate(`/product/${laterItem.value.id}`);
                            }} />
                          </div>
                        </div>
                        <div className='disFlexJusConEven' style={
                          {
                            width: '50%',
                            justifyItems: 'center',
                            flexDirection: 'column'
                          }
                        }>
                          <div style={
                            {
                              height: '45%'
                            }
                          }>{
                              laterItem.value.title
                            } <br />
                            ${
                              laterItem.value.price
                            }
                          </div>
                          <div className='disFlexJusConCen' style={
                            {
                              height: '45%',
                              alignItems: 'center',
                              flexDirection: 'row'
                            }
                          }>
                            <Button variant="outlined" disabled>-</Button>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              size='small'
                              type='number'
                              value={laterItem.quantity}
                              disabled />
                            <Button variant="outlined" disabled>+</Button>
                            <Button color="secondary" onClick={() => {
                              dispatch(moveToCart(laterItem));
                            }}>move to cart</Button>
                            <ColorButton variant="contained" onClick={() => {
                              dispatch(removeFromCart(laterItem.value))
                            }}>remove</ColorButton>
                          </div>
                        </div>
                      </Paper>
                    )
                  }
                </div>
              </div>
              {cart.length > 0 || savelater.length > 0 ?
                <div className='sticky'
                  style={
                    {
                      width: '24%',
                      backgroundColor: 'transparent',
                      maxHeight: '100%',
                      position: 'sticky',
                      top: '78px',
                      alignSelf: 'flex-start'
                    }
                  }>
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
                          }</div>
                        </div>
                        <div className='cartF2Flex'>
                          <div>Discount</div>
                          <div className='cartF2Flex1 cartF2text'>{0}</div>
                        </div>
                        <div className='cartF2Flex'>
                          <div>Delivery Charges</div>
                          <div className='cartF2Flex1 cartF2text'>{
                            totalPrice < 50 ? (totalPrice === 0 ? '0' : '$ 0.5') : 'Free'
                          }</div>
                        </div>

                      </div>
                      <div className='cartF2-2'>
                        <div className='cartF2Flex'>
                          <div className='cartF2text2'>Total Amount</div>
                          <div className='cartF2Flex1 cartF2text2'>$ {
                            totalPrice < 55 ?
                              (totalPrice === 0 ? 0 : Math.round((totalPrice + 0.5) * 100) / 100) :
                              Math.round((totalPrice) * 100) / 100
                          }</div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
                </div> : null}
            </div>
          </div>
        </div> : null}
    </>
  )
}

export default Cart;