import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishList } from '../../Features/User/userWishListSlice';
import { addToCart } from '../../Features/User/userCartSlice';
import { Button, Paper } from '@mui/material';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

const WishList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishListItems = useSelector((state) => state.wishListState.wishListItems);
    // eslint-disable-next-line
    const cartItems = useSelector((state) => state.cartState.cartItems);
    return (
        <div className='cartItems' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c5c3c3'}}>
            <div style={{width: '75%', backgroundColor: 'wheat'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                    , fontSize: '1.5vw',
                    fontWeight: 'bold'
                }}>

                    {
                        wishListItems.length > 0 && <div>WishList ({wishListItems.length})</div>
                    }
                </div>
                <div>

                    {
                        wishListItems.map((wishListItem) =>
                            <Paper key={wishListItem.id} elevation={1} className='cartProductContainer disFlexJusConEven' style={{

                                aspectRatio: '2/0.6',
                                margin: '2%',
                            }} >
                                <div className='cartProductImageContainer'>
                                    <div className='cartProductImage'>

                                        <img src={wishListItem.image} alt={wishListItem.id} onClick={() => {
                                            navigate(`/product/${wishListItem.id}`);
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
                                            wishListItem.title
                                        } <br />
                                        ${
                                            wishListItem.price
                                        }
                                    </div>
                                    <div className='disFlexJusConCen' style={
                                        {
                                            height: '45%',
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }
                                    }>
                                        <Button color="secondary" onClick={() => {
                                            dispatch(addToCart(wishListItem));
                                        }}>add to cart</Button>
                                        <ColorButton variant="contained" onClick={() => {
                                            dispatch(removeFromWishList(wishListItem.id))
                                        }}>remove</ColorButton>
                                    </div>
                                </div>
                            </Paper>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default WishList;