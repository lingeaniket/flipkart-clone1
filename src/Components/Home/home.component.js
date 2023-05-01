import * as React from 'react';
import { Tooltip } from '@mui/material';
import { tooltipClasses } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Paper, Rating, Checkbox } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SnackBar from '../SnackBar/snackBar.component';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addToCart, removeFromCart } from '../Features/User/userCartSlice';
import { addToWishList, removeFromWishList } from '../Features/User/userWishListSlice';
import './home.css';
import ContentLoader from '../Loader/contentLoader.component';
import FilterDiv from './filterDiv.component';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const handleSnackBar = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);
  let searchedItems = useSelector(state => state.productState.searchedItems)
  let wishListItems = useSelector(state => state.wishListState.wishListItems)

  const [loader, setLoader] = useState(true);

  const handleCheck = (value) => (event) => {
    document.getElementById('loader').classList.toggle('showLoader');
    if (event.target.checked) {
      setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        handleSnackBar();
        setAlertType("success")
        setMessage(`Added to Wish List`)
        dispatch(addToWishList(value))
      }, 500);
    } else {
      setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        handleSnackBar();
        setAlertType("success")
        setMessage(`Removed from Wish List`)
        dispatch(removeFromWishList(value.id))
      }, 500);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000)
    // eslint-disable-next-line
  }, [searchedItems, wishListItems]);

  return (
    <>
      {loader ? <ContentLoader /> : null}

      {!loader ?
        <div style={{backgroundColor: 'transparent'}}>
          <div className='disFlexJusConEven' style={{
            width: '100%', position: 'relative', backgroundColor: 'transparent'
          }}>
            <FilterDiv state={state} toggleDrawer={toggleDrawer} />
            <div className='productMainContainer'>
              <div className='displayMobile'>
                <Button onClick={toggleDrawer(true)}>Sort and Filter</Button>
                </div>
              <div className='disFlexJusConEven' style={{width: '100%', flexWrap: 'wrap'}}>{searchedItems.length > 0 ?
                searchedItems.map((value) => {
                  return <Paper key={value.id} elevation={0} style={{ position: 'relative' }} className='productContainer' >
                    <Checkbox id='name' style={{ position: 'absolute', top: '0' }}
                      checked={wishListItems.some((item) => item.id === value.id) ? true : false}
                      onChange={handleCheck(value)}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                    />
                    <div className='productImageContainer disFlexJusConCen' onClick={() => { navigate(`/product/${value.id}`) }} >
                      <div className='productImage disFlexJusConCen'>
                        <NoMaxWidthTooltip title={value.title}>
                          <img src={value.image} alt={value.id} />
                        </NoMaxWidthTooltip>
                      </div>
                    </div>
                    <div className='productInfo'>
                      <div className='productInfo1'>
                        {/* <NoMaxWidthTooltip title={value.title}> */}
                        <div className='homeProductTitle'>
                          {value.title}
                        </div>
                        {/* </NoMaxWidthTooltip> */}
                        <div className='homeProductTitle' style={{ height: '50%', color: 'green' }}>
                          ${value.price}
                        </div>
                      </div>
                      <div className='homeProductDescription'>{value.description}</div>
                      <div className='disFlexJusConCen productInfo2 disFlexAlignItCen'>
                        <div style={{ height: '40%' }}>
                          <Rating name="half-rating-read" value={value.rating.rate} precision={0.1} size='small' readOnly />
                        </div>
                        <div style={{ height: '60%' }}>
                          {cart.findIndex(item => item.value.id === value.id) > -1 || savelater.findIndex(item => item.value.id === value.id) > -1 ?
                            <ColorButton variant="contained" size='small' className='addToCartBtn' onClick={() => {
                              document.getElementById('loader').classList.toggle('showLoader');
                              setTimeout(() => {
                                dispatch(removeFromCart(value));
                                handleSnackBar();
                                setAlertType("success")
                                setMessage(<span><i>"<b>{value.title}</b>"</i> is successfully Removed from Cart</span>)
                                document.getElementById('loader').classList.toggle('showLoader');
                              }, 500);
                            }}>remove from cart</ColorButton> :
                            <ColorButton size='small' variant="contained" onClick={() => {
                              document.getElementById('loader').classList.toggle('showLoader');
                              setTimeout(() => {
                                dispatch(addToCart(value))
                                handleSnackBar();
                                setAlertType("success")
                                setMessage(<span><i>"<b>{value.title}</b>"</i> is successfully Added to Cart</span>)
                                document.getElementById('loader').classList.toggle('showLoader');
                              }, 500);
                            }}>Add to cart</ColorButton>}
                        </div>
                      </div>
                    </div>
                  </Paper>
                }) : <div>No Such Products</div>
              }
              </div>
            </div>
          </div>
        </div> : null}
      <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
    </>
  )
}

export default Home;