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

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000)
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
                    <div style={{ width: '19%' }}>
                        <div style={{ padding: '4%' }}>
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
                            <Button variant="contained" color="success" onClick={()=>{
                                navigate(`/checkout?id=${product.id}&quantity=1`)
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
                                <div>
                                    <span style={{ fontWeight: "500" }}>{product?.rating?.count}</span> Reviews )
                                </div>
                                <Rating name="half-rating-read" value={product.rating?.rate} precision={0.1} readOnly />
                            </div>
                        </div>
                        <div style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>{"$" + product.price}</div>
                        <div>
                            <div className='availableOfferDiv'>
                                <div className='offerDiv'>Available offers</div>
                            </div>
                            <div className='offersMainDiv'>
                                <div>
                                    <div>
                                        <span className='offerDiv'>
                                            <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="offers" width={18} height={18} className="offerImage" />
                                            <li className='offerList'>
                                                <span className='offerListFirst'>Bank Offer</span>
                                                <span>10% off on Samsung axis Bank credit card</span>
                                                <div className='offerListDiv'>
                                                    <span className='tAndc'>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                        <span className='offerDiv'>
                                            <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="offers" width={18} height={18} className="offerImage" />
                                            <li className='offerList'>
                                                <span className='offerListFirst'>Bank Offer</span>
                                                <span>10% off on ICICI Bank Credit Card EMI Transactions, up to ₹1250, on orders of ₹5,000 and above</span>
                                                <div className='offerListDiv'>
                                                    <span className='tAndc'>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                        <span className='offerDiv'>
                                            <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="offers" width={18} height={18} className="offerImage" />
                                            <li className='offerList'>
                                                <span className='offerListFirst'>Bank Offer</span>
                                                <span>Flat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account</span>
                                                <div className='offerListDiv'>
                                                    <span className='tAndc'>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                        <span className='offerDiv'>
                                            <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="offers" width={18} height={18} className="offerImage" />
                                            <li className='offerList'>
                                                <span>Buy this Product and Get Extra ₹500 Off on Bikes & Scooters</span>
                                                <div className='offerListDiv'>
                                                    <span className='tAndc'>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sellerDiv'>
                            <div className='seller'>
                                <div className='sellerTag'>
                                    <div className='sellerInTag'>
                                        <span>Seller</span>
                                    </div>
                                    <div>
                                        <div className='sellerNameDiv'>
                                            <span>Xtreme Bazaar</span>
                                            <div className='sellerRating'>4.5
                                            </div>
                                        </div>
                                        <div>
                                            <ul className='sellerUl' >
                                                <li className='sellerPolicy'>
                                                    <div style={{ marginLeft: "17px" }}>7 Days Replacement Policy</div>
                                                </li>
                                                <li className='sellerPolicy'>
                                                    <div style={{ marginLeft: "17px" }}>GST invoice available</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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