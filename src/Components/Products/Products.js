import axios from "axios";
import { useEffect, useState } from "react";

import { Rating, Tooltip, CircularProgress } from "@mui/material";


import './Styles/productStyles.css'

import { useParams } from "react-router-dom"

import ExtraProducts from "./ExtraProducts";

import { offers } from "./Functions/productsFunctions";
import { DesktopThumbnail } from "./Components/DesktopThumbnail";
import { useDispatch, useSelector } from "react-redux";
import { updateRecentlyViewed } from "../Features/User/userCartSlice";
import { MobileThumbnail } from "./Components/MobileThumbnail";

const Products = () => {
    const { product_id } = useParams();
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

    const recent = useSelector(state => state.cartState.recentlyViewed)

    const fetchData = async () => {
        try {
            const productResponse = await axios.get(`https://dummyjson.com/products/${product_id}`);
            const relatedProductsResponse = await axios.get(`https://dummyjson.com/products/category/${productResponse.data.category}`)
            return {
                product: productResponse.data,
                relatedProducts: relatedProductsResponse.data.products.filter((product) => product.id !== Number(product_id))
            };
        } catch (error) {
            console.error(`Error fetching data for:`, error);
            return null;
        }
    };

    const fetchRelatedData = async (itemId) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${itemId}`);

            return response.data
        } catch (error) {
            console.error(`Error fetching data for ${itemId}:`, error);
            return null;
        }
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     // Update the window width when the window is resized
    //     
    // }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetchData();
            setProduct(response.product);
            dispatch(updateRecentlyViewed(response.product.id));
            setProductImages([response.product.thumbnail, ...response.product.images])
            setRelatedProducts(() => response.relatedProducts);

            const promises = recent.map((id) => fetchRelatedData(id));
            const fetchedData = await Promise.all(promises);
            setRecentlyViewedProducts(fetchedData.filter((item) => item !== null && item.id !== Number(product_id)));
            setLoader(false)
        };

        fetchProductData();

        const handleResize = () => {
                    setWindowWidth(window.innerWidth);
                };
        
                // Add event listener for window resize
                window.addEventListener('resize', handleResize);
        
                // Clean up the event listener when the component unmounts
                return () => {
                    window.removeEventListener('resize', handleResize);
                };
        // eslint-disable-next-line
    }, [product_id])

    return (
        <>
            {loader
                ?
                (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '350px'
                    }}>
                        <CircularProgress />
                    </div>
                )
                :
                (
                    <div className="disFlexJusConCen">
                        <div className="_prod_002 w-19-20" style={{ position: 'relative' }}>
                            <div className="_prod_003" style={{ width: '100%' }}>
                                {windowWidth > 900
                                        ?
                                        <DesktopThumbnail productImages={productImages} product={product} />
                                        :
                                        <MobileThumbnail productImages={productImages} product={product} />
                                }
                                <div className={`${windowWidth > 900 ? 'w-2-3' : 'w-1-1'} _prod_061 _prod_084`}>
                                    <div className="w-1-1">
                                        <div style={{
                                            padding: 0, marginTop: '6px'
                                        }}>
                                            <div>
                                                <h1 className="_prod_031">
                                                    <span className="_prod_032">{product.title}</span>
                                                </h1>
                                            </div>
                                            <div>
                                                <div className="_prod_033">
                                                    <div className="_prod_082" style={{ marginTop: '6px' }}>
                                                        <span style={{ position: 'relative' }}>
                                                            <div className="_prod_036 _prod_082">
                                                                <Tooltip title={`${product.rating}★`} arrow>
                                                                    <span>
                                                                        <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="_prod_037">
                                                    <img style={{ verticalAlign: 'middle' }}
                                                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" height='21' />
                                                </span>
                                            </div>
                                            <div className="_prod_039 _prod_083">
                                                <span>Special Price</span>
                                            </div>
                                            <div className="_prod_040">
                                                <div className="_prod_041">${product.price}</div>
                                                <div className="_prod_042 _prod_044 _prod_082">${product.price}</div>
                                                <div className="_prod_044 _prod_082 _prod_083" style={{ letterSpacing: '-0.2px' }}>
                                                    <span>{product.discountPercentage}% Off</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_prod_w-1-1 _prod_border">
                                        <div style={{ marginTop: '8px' }}>
                                            <div className="_prod_046">Available Offers</div>
                                        </div>
                                        <div className="_prod_047" style={{ position: 'relative' }}>
                                            {offers.map((offer, index) =>
                                                <span className="_prod_048 w-1-1" key={index}>
                                                    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                                                        alt="baseTag"
                                                        width='18'
                                                        height='18'
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <li className="_prod_050 w-1-1 _prod_081">{offer}</li>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="_prod_border _prod_085">
                                        <div className="_prod_055">Easy Payment Options</div>
                                        <div style={{ marginLeft: '110px' }}>
                                            <ul>
                                                <li className="_prod_057" style={{ position: 'relative' }}>No cost EMI starting from $10/month</li>
                                                <li className="_prod_057" style={{ position: 'relative' }}>Flipkart Pay Later</li>
                                                <li className="_prod_057" style={{ position: 'relative' }}>Cash on Delivery</li>
                                                <li className="_prod_057" style={{ position: 'relative' }}>Net banking & Credit/ Debit/ ATM card</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div  className="_prod_border _prod_085">
                                        <div className="_prod_055">Description</div>
                                        <div style={{ marginLeft: '110px', color: '#212121' }}>{product.description}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1-1">
                                <ExtraProducts type='related' products={relatedProducts} />
                            </div>
                            {(recentlyViewedProducts.length > 0)
                                &&
                                (
                                    <div className="w-1-1">
                                        <ExtraProducts type='recent' products={recentlyViewedProducts} />
                                    </div>
                                )
                            }
                        </div >
                    </div>
                )
            }
        </>
    )
}

export default Products

                                    // {/* <div
                                    //     style={{
                                    //         padding: '24px 0 0'
                                    //     }}>
                                    //     <img src="https://rukminim2.flixcart.com/lockin/400/400/images/CCO__PP_2019-07-14.png?q=50"
                                    //         alt="" />
                                    // </div> */}