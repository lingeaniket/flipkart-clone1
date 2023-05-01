import * as React from 'react';
import {
    useSelector
} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Rating } from '@mui/material';
import { Oval } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import './product.css';
import SnackBar from '../SnackBar/snackBar.component';
import { addToCart, removeFromCart } from '../Features/User/userCartSlice';
import { useDispatch } from 'react-redux';
import { checkoutInProgress } from '../Features/User/orderDetailsSlice';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ').length > 1 ? name.split(' ')[1][0] : ''}`,
    };
}


const ProductPage = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('');

    const handleSnackBar = () => {
        setOpen(true);
    };
    const dispatch = useDispatch();
    const products = useSelector(state => state.productState.products);
    const cartItems = useSelector(state => state.cartState.cartItems);
    const saveLaterItems = useSelector(state => state.cartState.saveLaterItems);
    const { id } = useParams();
    const product = products.find((product) => product.id === Number(id));
    const [loader, setLoader] = useState(true);
    const [comments, setComments] = useState([]);
    console.log(comments)
    console.log(products)

    useEffect(() => {
        axios.get(`https://64461648ee791e1e29f65b4a.mockapi.io/comments/${id}`).then(response => {
            setComments(response.data.comments);

            setTimeout(() => {
                setLoader(false);
            }, 1000)
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div>{
            loader ? <div className='disFlexJusConCen disFlexAlignItCen'><Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={1}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
            /></div> : null}
            {!loader ?

                <div className='prodFlex disFlexJusConEven'>
                    <div className='mainProdImage'>
                        <div className='prodImage'>
                            <img src={product.image} style={{ maxWidth: '100%' }} alt="" />
                        </div>
                        <div className='disFlexJusConEven'>
                            {(cartItems.findIndex(item => item.value.id === product.id) > -1 || saveLaterItems.findIndex(item => item.value.id === product.id) > -1) ?
                                <Button variant="contained" onClick={() => {
                                    document.getElementById('loader').classList.toggle('showLoader');
                                    setTimeout(() => {
                                        dispatch(removeFromCart(product));
                                        handleSnackBar();
                                        setAlertType("success")
                                        setMessage(`${product.title} is Successfully removed from Cart`)
                                        document.getElementById('loader').classList.toggle('showLoader');
                                    }, 500);
                                }}>Remove from cart</Button> :
                                <Button variant="contained" onClick={() => {

                                    document.getElementById('loader').classList.toggle('showLoader');
                                    setTimeout(() => {
                                        dispatch(addToCart(product))
                                        handleSnackBar();
                                        setAlertType("success")
                                        setMessage(`${product.title} is Successfully Added to Cart`)
                                        document.getElementById('loader').classList.toggle('showLoader');
                                    }, 500);
                                }}>Add to Cart</Button>
                            }
                            <Button variant="contained" color="success" onClick={() => {
                                navigate(`/checkout?id=${product.id}&quantity=1`)
                                dispatch(checkoutInProgress());
                            }}>
                                BUY NOW
                            </Button>
                        </div>
                    </div>

                    <div className='prodFlexInner'>
                        <div className='prodFlexTitle'>{product.title}</div>
                        <div className='rateFlex'>
                            <div style={{ display: 'flex' }}>
                                {product?.rating?.rate} (
                                <span style={{ fontWeight: "500" }}>{product?.rating?.count} Reviews </span>)
                                <Rating name="half-rating-read" value={product.rating?.rate} precision={0.1} readOnly />
                            </div>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>{"$" + product.price}</div>
                        <div className='disFlexColumn'>
                            <div className='seller'>
                                <div className="description">
                                    <div className="sellerInTag">
                                        <span>Description</span>
                                    </div>
                                    <div className='descriptionMain'>
                                        <div className='descript'>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            <div className='commentsTitle'>Comments</div>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{
                                comments.map((item) =>
                                    <div key={item.customerId}>
                                        <ListItem alignItems="flex-start" className='productComments'>
                                            <ListItemAvatar>
                                                <Avatar {...stringAvatar(item.name)} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                // primary="Brunch this weekend?"
                                                secondary={
                                                    <React.Fragment>
                                                        <span style={{ display: 'block' }}><Rating name="half-rating-read" value={item.rating} precision={0.1} readOnly /></span>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        {`-- ${item.review}`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />

                                    </div>
                                )
                            }



                            </List>
                        </div>
                    </div>
                    <div className='hideLoader' id='loader'>
                        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'transparent' }}>
                            <div className="modal-dialog modal-fullscreen modalBG" >
                                <div className="modal-content disFlexJusConCen disFlexAlignItCen" style={{ backgroundColor: 'transparent' }}>
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
                </div> : null}
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
        </div>
    )
}

export default ProductPage;