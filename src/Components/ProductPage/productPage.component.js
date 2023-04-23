import {
    useSelector,
    // useDispatch 
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

// import axios from 'axios';
import { useEffect, useState } from 'react';
// import { load } from '../Features/User/productsSlice';
import './product.css';

const ProductPage = () => {
    const products = useSelector(state => state.productState.products);
    const { id } = useParams();
    const product = products.find((product) => product.id === Number(id));
    console.log(product)
    const [loader, setLoader] = useState(true);

    // const dispatch = useDispatch();

    // useEffect(()=> {
    //     axios.get('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/').then(res => dispatch(load(res.data)));
    // }, [dispatch])

    useEffect(() => {

        setTimeout(() =>{
          setLoader(false);
        }, 1000)
        // eslint-disable-next-line
      },[]);

    return (
        <div>{
            loader ? <div>Loading...</div> : null }
            { !loader ? 
            
            <div className='prodFlex'>
                <div className='prodImage'>
                    <div className='prodIn'>
                        <div className="prodIn1">
                            <div className="prodIn2">
                                <div className="prodIn3">
                                    <div className="prodIn4">
                                        <div className="prodIn5">
                                            <img src={product.image} alt={product.title} className='mainProdImage' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prodIn">
                        <div className="cartAdd1">
                            <ul className="cartAdd2">
                                <li className="cartAdd3">{
                                    // props.arrayOfCart.findIndex((item1) => item1.id === product[0].id) > -1 ?
                                    //     <RemoveCartButton handleAddToCart={props.handleAddToCart} id={product[0].id} /> :
                                    //     <AddCartButton handleAddToCart={props.handleAddToCart} id={product[0].id} />
                                }
                                </li>
                                <li className="cartAdd3">
                                    {/* <button className="cartAdd4"> */}
                                    Buy Now
                                    {/* </button> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='prodFlexInner'>
                    <div>{product.title}</div>
                    <div className='rateFlex'>
                        <div>
                            {product?.rating?.rate} <Rating name="half-rating-read" value={product.rating?.rate} precision={0.1} readOnly />
                            {/* {rate} */}
                        </div>
                        <div>
                            <span style={{ fontWeight: "500" }}>{product?.rating?.count}</span> Reviews
                        </div>
                    </div>
                    <div>{"$" + product.price}</div>
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
            </div> : null }
        </div>
    )
}

export default ProductPage;