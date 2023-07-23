import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishList } from '../../Features/User/userWishListSlice';
import { addToCart } from '../../Features/User/userCartSlice';
import { Button, Paper } from '@mui/material';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SnackBar from '../../SnackBar/snackBar.component';
import { checkoutInProgress, changeFromCart } from '../../Features/User/orderDetailsSlice';
import axios from 'axios';
import './wishList.css'

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
    const [wishListProducts, setWishListProducts] = React.useState([]);

    const handleSnackBar = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishListItems = useSelector((state) => state.wishListState.wishListItems);
    // eslint-disable-next-line
    const cartItems = useSelector((state) => state.cartState.cartItems);
    const saveLaterItems = useSelector((state) => state.cartState.saveLaterItems);

    const fetchDataForKeyword = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);

            return response.data
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };
    useEffect(()=>{
        const fetchDataForAllKeywords = async () => {
            const promises = wishListItems.map((id) => fetchDataForKeyword(id));
            const fetchedData = await Promise.all(promises);
            setWishListProducts(fetchedData.filter((item) => item !== null));
            // setLoaded(true)
        };

        fetchDataForAllKeywords();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='cartItems disFlexAlignItCen' style={{ flexDirection: 'column', backgroundColor: '#c5c3c3' }}>
            <div className='wishListMainContainer' style={{ backgroundColor: 'white' }}>{
                wishListProducts.length ? <>
                    <div className='disFlexJusConCen wishListTitle'>
                        <div>WishList ({wishListProducts.length})</div>
                    </div>
                    <div>{
                        wishListProducts.map((product) =>
                            <Paper key={product.id} elevation={1} className='cartProductContainer' >
                                <div className='cartProductMain wishListMain'>
                                    <div style={{ display: 'flex'}}>
                                        <div className='cartProductImageContainer '>
                                            <div className='cartProductImage disFlexJusConCen disFlexAlignItCen'>
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.id}
                                                    onClick={() => {
                                                        navigate(`/products/${product.title}/p/${product.id}`);
                                                    }} />
                                            </div>
                                        </div>
                                        <div style={{ width: '70%' }}>
                                            <div style={{ height: '45%' }}>
                                                {product.title} <br />
                                                <div style={{ color: 'green', marginTop: '2vw' }}>

                                        <b>$

                                          {(product.price).toFixed(2)}
                                        </b>

                                      </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex'}}>
                                        <div style={{ width: '100%' }} className='handleCartButtons'>
                                            <Button color="secondary" onClick={() => {
                                                if (cartItems.some((item) =>
                                                    item === product.id
                                                ) || saveLaterItems.some((item) => item === product.id)) {
                                                    handleSnackBar();
                                                    setAlertType("error")

                                                    setMessage(`${product.title} is already in the cart`)
                                                } else {
                                                    handleSnackBar();
                                                    setAlertType("success")
                                                    setMessage(`${product.title} is added to the cart`)

                                                    dispatch(removeFromWishList(product.id))
                                                    dispatch(addToCart(product.id));
                                                }
                                            }}>add to cart</Button>
                                            <Button variant="contained" color="success" onClick={() => {
                                                document.getElementById('loader').classList.toggle('showLoader');
                                                setTimeout(() => {
                                                    document.getElementById('loader').classList.toggle('showLoader');
                                                    dispatch(changeFromCart(true));
                                                    dispatch(checkoutInProgress());
                                                    navigate(`/checkout?id=${product.id}&quantity=1`)
                                                }, 500)
                                            }}>
                                                BUY NOW
                                            </Button>
                                            <ColorButton variant="contained" onClick={() => {
                                                handleSnackBar();
                                                setAlertType("success")
                                                setMessage(`${product.title} is added to the cart`)
                                                dispatch(removeFromWishList(product.id))
                                            }}>remove</ColorButton>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )}
                    </div></> : <div className='disFlexJusConEven' style={
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