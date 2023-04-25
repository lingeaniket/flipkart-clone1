import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishList } from '../../Features/User/userWishListSlice';
import { addToCart } from '../../Features/User/userCartSlice';
import { Button, Paper } from '@mui/material';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SnackBar from '../../SnackBar/snackBar.component';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

const WishList = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');

    const handleSnackBar = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishListItems = useSelector((state) => state.wishListState.wishListItems);
    // eslint-disable-next-line
    const cartItems = useSelector((state) => state.cartState.cartItems);
    const saveLaterItems = useSelector((state) => state.cartState.saveLaterItems);
    return (
        <div className='cartItems disFlexAlignItCen' style={{ flexDirection: 'column', backgroundColor: '#c5c3c3' }}>
            <div style={{ width: '75%', backgroundColor: 'wheat' }}>{
                wishListItems.length ? <>
                <div className='disFlexJusConCen' style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>
                    <div>WishList ({wishListItems.length})</div>
                </div>
                <div>{
                    wishListItems.map((wishListItem) =>
                        <Paper key={wishListItem.id} elevation={1}
                            className='cartProductContainer disFlexJusConEven'
                            style={{ aspectRatio: '1/0.25', margin: '2% 1%', }}
                        >
                            <div className='cartProductImageContainer' style={{display: 'flex'}}>
                                <div className='cartProductImage disFlexJusConCen disFlexAlignItCen'>
                                    <img
                                        src={wishListItem.image}
                                        alt={wishListItem.id}
                                        onClick={() => {
                                            navigate(`/product/${wishListItem.id}`);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='cartInfoContainer disFlexJusConEven'>
                                <div style={{ height: '45%' }}>
                                    {wishListItem.title}
                                    <div style={{ fontWeight: 'bold' }}>
                                        ${wishListItem.price}
                                    </div>
                                </div>
                                <div className='disFlexJusConCen disFlexAlignItCen'
                                    style={{
                                        height: '45%',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Button color="secondary" onClick={() => {
                                        if (cartItems.some((item) =>
                                            item.value.id === wishListItem.id
                                        ) || saveLaterItems.some((item)=> item.value.id === wishListItem.id) ) {
                                            handleSnackBar();
                                            setAlertType("error")

                                            setMessage(`${wishListItem.title} is already in the cart`)
                                        } else {
                                            handleSnackBar();
                                            setAlertType("success")
                                            setMessage(`${wishListItem.title} is added to the cart`)

                                            dispatch(removeFromWishList(wishListItem.id))
                                            dispatch(addToCart(wishListItem));
                                        }
                                    }}>add to cart</Button>

                                    <ColorButton variant="contained" onClick={() => {
                                        handleSnackBar();
                                        setAlertType("success")
                                        setMessage(`${wishListItem.title} is added to the cart`)
                                        dispatch(removeFromWishList(wishListItem.id))
                                    }}>remove</ColorButton>
                                </div>
                            </div>
                        </Paper>
                    )}
                </div></> :   <div className='disFlexJusConEven' style={
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
                    </div>}
            </div>
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />

        </div>
    )
}

export default WishList;