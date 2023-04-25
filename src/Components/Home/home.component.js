//Main React Import
import * as React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';

// Main Redux and Router Import
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//Material UI Import
import { Paper, Rating, Checkbox } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addToCart, removeFromCart } from '../Features/User/userCartSlice';
import { addToWishList, removeFromWishList } from '../Features/User/userWishListSlice';

//Component CSS
import './home.css';
import ContentLoader from '../Loader/contentLoader.component';
import FilterDiv from './filterDiv.component';

//Button Creator
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Home = () => {
  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);
  let searchedItems = useSelector(state => state.productState.searchedItems)
  let wishListItems = useSelector(state => state.wishListState.wishListItems)
  // const [products, setProducts] = useState(searchedItems);
  // console.log(products);

  useLayoutEffect(() => {
    !localStorage.getItem('isloggedIn') && navigate('/login');
    // eslint-disable-next-line
  }, []);

  //Loading
  const [loader, setLoader] = useState(true);

  const handleCheck = (value) => (event) => {
    console.log(event.target.checked)
    if(event.target.checked){
      dispatch(addToWishList(value))
    } else {
      dispatch(removeFromWishList(value.id))
    }
  }

  useEffect(() => {
    // setProducts(searchedItems);
    setTimeout(() => {
      setLoader(false);
    }, 1000)
    // eslint-disable-next-line
  }, [searchedItems, wishListItems]);

  return (
    <>
      {/* Loading */}
      {loader ? <ContentLoader /> : null}

      {/* if not loading */}
      {!loader ?
        <div style={{}}>
          <div className='disFlexJusConEven' style={{
            width: '100%', position: 'relative', backgroundColor: '#80808054'
          }}>

            {/* filter component */}
            <FilterDiv />

            {/* Product Component */}
            <div className='productMainContainer disFlexJusConEven'>{searchedItems.length > 0 ?
              searchedItems.map((value) => {
                return <Paper key={value.id} elevation={1} className='productContainer' >
                  <Checkbox id='name'
                    // {...label}
                    checked={wishListItems.some((item)=> item.id === value.id) ? true : false}

                    onChange={handleCheck(value)}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  />
                  <div className='productImageContainer disFlexJusConCen' onClick={() => { navigate(`/product/${value.id}`) }} >
                    <div className='productImage disFlexJusConCen'>
                      <img src={value.image} alt={value.id} />
                    </div>
                  </div>
                  <div style={{ height: '40%' }}>
                    <div style={{ height: '50%' }}>
                      {value.title} <br />
                      ${value.price}
                    </div>
                    <div className='disFlexJusConCen disFlexAlignItCen' style={{ height: '50%', flexDirection: 'column' }}>
                      <Rating name="half-rating-read" value={value.rating.rate} precision={0.1} readOnly /> <br />
                      {cart.findIndex(item => item.value.id === value.id) > -1 || savelater.findIndex(item => item.value.id === value.id) > -1 ?
                        <ColorButton variant="contained" onClick={() => {
                          document.getElementById('loader').classList.toggle('showLoader');
                          setTimeout(() => {
                            dispatch(removeFromCart(value));
                            document.getElementById('loader').classList.toggle('showLoader');
                          }, 500);
                        }}>remove from cart</ColorButton> :
                        <ColorButton variant="contained" onClick={() => {

                          document.getElementById('loader').classList.toggle('showLoader');
                          setTimeout(() => {
                            dispatch(addToCart(value))
                            document.getElementById('loader').classList.toggle('showLoader');
                          }, 500);
                        }}>Add to cart</ColorButton>}
                    </div>
                  </div>
                </Paper>
              }) : <div>No Such Products</div>
            }
            </div>
          </div>
        </div> : null}
    </>
  )
}

export default Home;