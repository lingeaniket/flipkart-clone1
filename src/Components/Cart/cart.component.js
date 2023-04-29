import React, { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import SnackBar from '../SnackBar/snackBar.component';
import { checkoutInProgress } from '../Features/User/orderDetailsSlice';
import { Chip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const [timeId, setTimeId] = React.useState()

  const handleSnackBar = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);

  const [totalPrice, setTotalPrice] = useState(0);
  useLayoutEffect(() => {
    setTotalPrice(totalPrice =>
      (Math.round((
        cart.reduce((accum, value) => {
          return accum + Number(value.value.price) * Number(value.quantity);
        }, 0)
      ) * 1000) / 1000).toFixed(2)
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
                <div className='cartItems'
                // style={{ maxHeight: '350px' }}
                >
                  {cart.length !== 0 ?
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div className='cartInnerMain' style={{ height: '100%' }}>
                        {
                          cart.map((cartItem) =>
                            <Paper key={cartItem.value.id} elevation={1} className='cartProductContainer' >
                              <div className='cartProductMain'>
                                <div style={{ display: 'flex', width: '100%' }}>
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
                                  <div style={{ width: '70%' }}>
                                    <div style={{ height: '45%' }}>
                                      {cartItem.value.title} <br />
                                      {/* <div style={{ fontWeight: 'bold' }}>
                                        ${cartItem.value.price}
                                      </div> */}
                                      <div style={{color:'green', marginTop: '2vw'}}>
                                        
                                        <b>$
                                  
                                        {(cartItem.quantity * cartItem.value.price).toFixed(2)}
                                        </b>
                                        
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', width: '100%' }}>
                                  <div style={{ display: 'flex', width: '30%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Chip className='quantityChip' label="-" variant="outlined" style={{ width: '26%' }} onClick={() => {
                                      document.getElementById('loader').classList.toggle('showLoader');
                                      clearInterval(timeId);
                                      setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        dispatch(decrementQuantity(cartItem.value.id));
                                        handleSnackBar();
                                        setAlertType("info")
                                        setMessage(`Quantity of ${cartItem.value.title} is changed to ${Math.max(Number(cartItem.quantity) - 1, 1)}`)
                                      }, 500)
                                    }} />
                                    <div style={{ border: '0.5px solid grey', width: '26%', display: 'flex', justifyContent: 'center', aspectRatio: '1/1' }}>
                                      <input type='number' value={cartItem.quantity} style={{ outline: 'none', border: 'none', width: '100%', aspectRatio: '1/1', textAlign: 'center' }} onInput={(event) => {
                                        if (event.target.value > 0) {
                                          clearInterval(timeId);
                                          dispatch(updateByValue({ id: cartItem.value.id, setValue: event.target.value }));
                                          document.getElementById('loader').classList.toggle('showLoader');
                                          setTimeout(() => {
                                            handleSnackBar();
                                            setAlertType("info")
                                            setMessage(`Quantity of ${cartItem.value.title} is changed to ${Math.max(event.target.value, 1)}`)
                                            document.getElementById('loader').classList.toggle('showLoader');
                                          }, 500)
                                        }
                                        else {
                                          // if (event.target.value === '') {
                                          const tId = setTimeout(() => {
                                            event.target.value = 1;
                                            dispatch(updateByValue({ id: cartItem.value.id, setValue: 1 }));
                                          }, 3000)
                                          setTimeId(tId);
                                          dispatch(updateByValue({ id: cartItem.value.id, setValue: '' }));
                                          document.getElementById('loader').classList.toggle('showLoader');
                                          setTimeout(() => {
                                            handleSnackBar();
                                            setAlertType("info")
                                            setMessage(`Quantity of ${cartItem.value.title} is changed to ${Math.max(event.target.value, 1)}`)
                                            document.getElementById('loader').classList.toggle('showLoader');
                                          }, 500)
                                        }
                                      }} />
                                    </div>
                                    <Chip className='quantityChip' label="+" style={{ width: '26%' }} variant="outlined" onClick={() => {
                                      document.getElementById('loader').classList.toggle('showLoader');
                                      clearInterval(timeId);
                                      setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        dispatch(incrementQuantity(cartItem.value.id));
                                        handleSnackBar();
                                        setAlertType("info")
                                        setMessage(`Quantity of ${cartItem.value.title} is changed to ${Math.max(Number(cartItem.quantity) + 1, 1)}`)
                                      }, 500)
                                    }} />
                                  </div>
                                  <div style={{ width: '70%' }} className='handleCartButtons'>
                                    <Button
                                      color="secondary"
                                      onClick={() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        setTimeout(() => {
                                          document.getElementById('loader').classList.toggle('showLoader');
                                          handleSnackBar();
                                          setAlertType("success")
                                          setMessage(`${cartItem.value.title} is successfully Saved for later`)
                                          dispatch(addToSaveLater(cartItem));
                                        }, 500)
                                      }}>Save for later</Button>
                                    <ColorButton
                                      variant="contained"
                                      onClick={() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        setTimeout(() => {
                                          document.getElementById('loader').classList.toggle('showLoader');
                                          dispatch(removeFromCart(cartItem.value))
                                          handleSnackBar();
                                          setAlertType("success")
                                          setMessage(`${cartItem.value.title} is successfully removed from cart`)
                                        }, 500)
                                      }
                                      }>remove</ColorButton>
                                  </div>
                                </div>
                              </div>
                              <div className='cartProductDelivery'>
                                Delivery in 5 - 7 working days
                              </div>
                            </Paper>
                          )}
                        <div>
                          {cart.length > 0 || savelater.length > 0 ?
                            <div className='stickyMobile' id='orderDetailPlace'>
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
                                        totalPrice < 55 ? (totalPrice === 0 ? '0' : '$ 0.5') : 'Free'
                                      }</div>
                                    </div>
                                  </div>
                                  <div className='cartF2-2'>
                                    <div className='cartF2Flex'>
                                      <div className='cartF2text2'>Total Amount</div>
                                      <div className='cartF2Flex1 cartF2text2'>$ {
                                        totalPrice < 55 ?
                                          (totalPrice === 0 ? 0 : (Number(totalPrice) + 0.5).toFixed(2)) :
                                          totalPrice
                                      }</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ padding: '3vw' }}>Safe and Secure Payments. Easy returns.100% Authentic products.</div>
                            </div> : null}
                        </div>
                        <div style={{ position: 'sticky', bottom: '0', backgroundColor: 'white', width: '100%' }} className='placeOrder disFlexAlignItCen'>
                          <div>Total Amount
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>$ {
                              totalPrice < 55 ?
                                (totalPrice === 0 ? 0 : (Number(totalPrice) + 0.5).toFixed(2)) :
                                totalPrice
                            } <a href='#orderDetailPlace'>
                                <InfoOutlinedIcon />
                              </a>
                              {/* <InfoOutlinedIcon /> */}
                            </div>
                          </div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate('/checkout');
                              dispatch(checkoutInProgress());
                            }}>Place Order</Button></div>

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
                    savelater.length > 0 && <div className='saveForLaterTitle' style={{ padding: '1% 1%', borderBottom: '1px solid black' }}>Saved For Later ({savelater.length})</div>
                  }
                  {savelater.length !== 0 &&
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div className='cartInnerMain' style={{ height: '100%' }}>
                        {
                          savelater.map((laterItem) =>
                            <Paper key={laterItem.value.id} elevation={1} className='cartProductContainer' >
                              <div className='cartProductMain'>
                                <div style={{ display: 'flex', width: '100%' }}>
                                  <div className='cartProductImageContainer '>
                                    <div className='cartProductImage disFlexJusConCen disFlexAlignItCen'>
                                      <img
                                        src={laterItem.value.image}
                                        alt={laterItem.value.id}
                                        onClick={() => {
                                          navigate(`/product/${laterItem.value.id}`);
                                        }} />
                                    </div>
                                  </div>
                                  <div style={{ width: '70%' }}>
                                    <div style={{ height: '45%' }}>
                                      {laterItem.value.title} <br />
                                      {/* <div style={{ fontWeight: 'bold' }}>
                                        ${cartItem.value.price}
                                      </div> */}
                                      <div style={{color:'green', marginTop: '2vw'}}>
                                        
                                        <b>$
                                  
                                        {(laterItem.quantity * laterItem.value.price).toFixed(2)}
                                        </b>
                                        
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', width: '100%' }}>
                                  <div style={{ display: 'flex', width: '30%', justifyContent: 'space-evenly' }}>
                                    <Chip className='quantityChip' label="-" variant="outlined" style={{ width: '26%'}} disabled />
                                    <div style={{ border: '0.5px solid grey', width: '26%', display: 'flex', justifyContent: 'center', opacity : '0.5' }}>
                                      <input type='number' value={laterItem.quantity} style={{ outline: 'none', border: 'none', width: '100%', aspectRatio: '1/1', textAlign: 'center', verticalAlign: 'middle' }} disabled />
                                    </div>
                                    <Chip className='quantityChip' label="+" style={{ width: '26%' }} variant="outlined" disabled />
                                  </div>
                                  <div style={{ width: '70%' }} className='handleCartButtons'>
                                    <Button color="secondary" onClick={() => {
                                      document.getElementById('loader').classList.toggle('showLoader');
                                      setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        handleSnackBar();
                                        setAlertType("success")
                                        setMessage(`${laterItem.value.title} is Successfully moved to Cart`)
                                        dispatch(moveToCart(laterItem));
                                      }, 500)
                                    }}>move to cart</Button>
                                    <ColorButton variant="contained" onClick={() => {
                                      document.getElementById('loader').classList.toggle('showLoader');
                                      setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        handleSnackBar();
                                        setAlertType("success")
                                        setMessage(`${laterItem.value.title} is Successfully removed from Cart`)

                                        dispatch(removeFromCart(laterItem.value))
                                      }, 500)
                                    }}>remove</ColorButton>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          )}
                      </div>
                    </div>
                  }
                </div>
              </div>


              {cart.length > 0 || savelater.length > 0 ?
                <div className='sticky'>
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
                            totalPrice < 55 ? (totalPrice === 0 ? '0' : '$ 0.5') : 'Free'
                          }</div>
                        </div>
                      </div>
                      <div className='cartF2-2'>
                        <div className='cartF2Flex'>
                          <div className='cartF2text2'>Total Amount</div>
                          <div className='cartF2Flex1 cartF2text2'>$ {
                            totalPrice < 55 ?
                              (totalPrice === 0 ? 0 : (Number(totalPrice) + 0.5).toFixed(2)) :
                              totalPrice
                          }</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>Safe and Secure Payments. Easy returns. 100% Authentic products.</div>
                </div> : null}
            </div>
          </div>

        </div> : null}
      <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
    </>
  )
}

export default Cart;