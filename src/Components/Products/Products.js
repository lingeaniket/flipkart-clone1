import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Rating, Tooltip, Checkbox, CircularProgress } from "@mui/material";
import { pink } from "@mui/material/colors";
import BoltIcon from '@mui/icons-material/Bolt';

import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import SnackBar from "../SnackBar/snackBar.component";
import { useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../Features/User/userWishListSlice";
import ExtraProducts from "./ExtraProducts";
import { addSingleOrder } from "../Features/User/orderDetailsSlice";
import { addToCart } from "../Features/User/userCartSlice";

const Products = () => {
    // const { product_name, product_id } = useParams();
    const dispatch = useDispatch();

    const { product_id } = useParams();

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(true);
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState({});
    const [alertType, setAlertType] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [productImages, setProductImages] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const wishListItems = useSelector(state => state.wishListState.wishListItems);

    const navigate = useNavigate();

    const handleSnackBar = () => {
        setOpen(true);
    };

    const handleCheck = (id) => (event) => {
        if (event.target.checked) {
            setTimeout(() => {
                handleSnackBar();
                setAlertType("success")
                setMessage(`Added to your Wishlist`)
                dispatch(addToWishList(id))
            }, 500);
        } else {
            setTimeout(() => {
                handleSnackBar();
                setAlertType("success");
                setMessage(`Removed from your Wishlist`)
                dispatch(removeFromWishList(id))
            }, 500);
        }
    }

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

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetchData();
            setProduct(response.product);
            setProductImages([response.product.thumbnail, ...response.product.images])
            setRelatedProducts(() => response.relatedProducts);
            setLoader(false)
        };

        fetchProductData();
        // eslint-disable-next-line
    }, [product_id])

    return (
        <>
            {loader
                ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '350px'
                }}>
                    <CircularProgress />
                </div>
                :
                <div style={{
                    display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{ margin: '0 auto', width: '95%', padding: 0, position: 'relative' }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '16px',
                            flexFlow: 'row',
                            display: 'flex',
                        }}>
                            <div style={{
                                flexFlow: 'column',
                                position: 'sticky',
                                top: '64px',
                                bottom: 0,
                                alignSelf: 'flex-start',
                                display: 'flex',
                                width: '41.66%'
                            }}>
                                <div style={{
                                    display: 'block',
                                    width: '100%',
                                }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'stretch', position: 'relative'
                                        }}>
                                            <div style={{ height: '448px' }}>
                                                <div style={{
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    height: '100%'
                                                }}>
                                                    <div style={{ height: '448px', overflow: 'hidden' }}>
                                                        <ul style={{
                                                            transition: 'transform .4s ease-in-out,-webkit-transform .4s ease-in-out',
                                                            transform: 'translateY(0px)'
                                                        }}>
                                                            {productImages.map((image, index) =>
                                                                <li key={index} style={{
                                                                    height: '64px', width: '64px', borderColor: '#f0f0f0',
                                                                    display: 'flex', justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    border: '1px solid #f0f0f0',
                                                                    borderBottom: 'none', cursor: 'pointer', listStyle: 'none'
                                                                }}
                                                                    onMouseOver={() => {
                                                                        setSelectedImage(() => index);
                                                                        console.log(index)
                                                                    }}>
                                                                    <div style={{
                                                                        border: `${selectedImage === index ? '2px solid #2874f0' : 'none'}`, //for selected image
                                                                        padding: '5px',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        position: 'relative'
                                                                    }}>
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%'
                                                                            }}
                                                                        >
                                                                            <img src={image} alt=""
                                                                                style={{
                                                                                    maxHeight: '100%',
                                                                                    maxWidth: '100%',
                                                                                    position: 'absolute',
                                                                                    top: '50%',
                                                                                    left: '50%',
                                                                                    transform: 'translateX(-50%) translateY(-50%)',
                                                                                    padding: '5px'
                                                                                }} />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: 'flex', flex: 1, alignItems: 'center',
                                                position: 'relative',
                                                border: '1px solid #f0f0f0'
                                            }}>
                                                <div style={{
                                                    textAlign: 'center',
                                                }}>
                                                    <div style={{
                                                        height: 'inherit',
                                                        width: 'inherit',
                                                        position: 'relative',
                                                        margin: '0 auto'
                                                    }}>
                                                        <img src={productImages[selectedImage]} alt="" loading="eager" style={{
                                                            display: 'inline-block',
                                                            maxHeight: '416px',
                                                            maxWidth: '416px',
                                                            verticalAlign: 'top',
                                                            position: 'inherit',
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            top: 0,
                                                            margin: 'auto',
                                                            opacity: 1,
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            right: '15px',
                                            top: '15px',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            border: '1px solid #f0f0f0',
                                            boxShadow: '0 1px 4px 0 rgba(0,0,0,.1)',
                                            backgroundColor: 'white',
                                            // padding: '9px 12px 12px 9px'
                                        }}>
                                            <div style={{ position: 'relative', display: 'inline-flex' }}>
                                                <Checkbox id='name'
                                                    checked={wishListItems.some((item) => item === product.id) ? true : false}
                                                    onChange={handleCheck(product.id)}
                                                    icon={<FavoriteIcon fontSize='small' />}
                                                    checkedIcon={<FavoriteIcon fontSize='small' sx={{ color: pink[500] }} />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'block',
                                    width: '100%',
                                }}>
                                    <div style={{
                                        marginLeft: '64px',
                                        marginTop: '12px',
                                    }}>
                                        <ul style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexFlow: 'row wrap'
                                        }}>
                                            <li style={{
                                                width: '50%',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                listStyle: 'none'
                                            }}>
                                                <button style={{
                                                    padding: '18px 8px',
                                                    borderRadius: '2px',
                                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                                    width: '98%',
                                                    border: 'none',
                                                    float: 'left',
                                                    background: '#ff9f00',
                                                    color: 'white',
                                                    textTransform: 'uppercase',
                                                    fontSize: '16px',
                                                    display: 'inline-block',
                                                    fontWeight: '500',
                                                    transition: 'box-shadow .2s ease',
                                                    verticalAlign: 'super',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                }}
                                                    onClick={() => {
                                                        // document.getElementById('loader').classList.toggle('showLoader');
                                                        dispatch(addToCart(product.id))
                                                        setTimeout(() => {

                                                            navigate('/cart')
                                                            // handleSnackBar();
                                                            // setAlertType("success")
                                                            // setMessage(<span><i>"<b>{value.title}</b>"</i> is successfully Added to Cart</span>)
                                                            // document.getElementById('loader').classList.toggle('showLoader');
                                                        }, 500);
                                                    }}
                                                >
                                                    <AddShoppingCartIcon fontSize="medium" style={{
                                                        marginRight: '4px',
                                                        display: 'inline-block',
                                                    }} />
                                                    Add To cart
                                                </button>
                                            </li>
                                            <li style={{
                                                width: '50%',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                listStyle: 'none'
                                            }}>
                                                <button style={{
                                                    padding: '18px 8px',
                                                    borderRadius: '2px',
                                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                                    width: '98%',
                                                    border: 'none',
                                                    float: 'right',
                                                    background: '#fb641b',
                                                    color: 'white',
                                                    textTransform: 'uppercase',
                                                    fontSize: '16px',
                                                    display: 'inline-block',
                                                    fontWeight: '500',
                                                    transition: 'box-shadow .2s ease',
                                                    verticalAlign: 'super',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                }}
                                                    onClick={() => {
                                                        console.log('working');
                                                        dispatch(addSingleOrder(product.id))
                                                        navigate(`/checkout?item-id=${product.id}`)
                                                    }}
                                                >
                                                    <BoltIcon fontSize="medium" style={{
                                                        marginRight: '4px',
                                                        display: 'inline-block'
                                                    }} />
                                                    buy now
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                width: '66.66%',
                                display: 'flex',
                                padding: '0 0 0 16px',
                                flexFlow: 'column',
                            }}>
                                <div style={{
                                    display: 'block',
                                    width: '100%',
                                }}>
                                    <div style={{
                                        padding: '0',
                                        marginTop: '6px',
                                    }}>
                                        <div>
                                            <h1 style={{ color: '#212121', fontSize: '18px', fontWeight: '400', display: 'contents' }}>
                                                <span style={{
                                                    padding: 0,
                                                    lineHeight: 1.4,
                                                    fontSize: 'inherit',
                                                    fontWeight: 'inherit',
                                                    display: 'inline-block'
                                                }}>{product.title}</span>
                                            </h1>
                                        </div>
                                        <div>
                                            <div style={{ cursor: 'pointer', display: 'inline-block' }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    marginTop: '6px'
                                                }}>
                                                    <span style={{ position: 'relative' }}>
                                                        <div style={{
                                                            lineHeight: 'normal', display: 'inline-block',
                                                            padding: '2px 4px 2px 6px',
                                                            fontSize: '12px',
                                                            verticalAlign: 'middle'

                                                        }}>
                                                            <Tooltip title={`${product.rating}★`} arrow>
                                                                <span>
                                                                    <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                                </span>
                                                            </Tooltip>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <span style={{
                                                cursor: 'pointer', marginLeft: '12px', verticalAlign: 'middle',
                                                fontSize: '20px'
                                            }}>
                                                <img style={{
                                                    verticalAlign: 'middle',
                                                }} src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="" height='21' />
                                            </span>
                                        </div>
                                        <div style={{
                                            fontWeight: '500',
                                            textAlign: 'left',
                                            color: '#388e3c',
                                            margin: '12px 0 -12px'
                                        }}>
                                            <span>Special Price</span>
                                        </div>
                                        <div style={{ display: 'flex', paddingTop: '12px' }}>
                                            <div style={{
                                                fontSize: '28px',
                                                verticalAlign: 'sub',
                                                display: 'inline-block',
                                                fontWeight: '500',
                                                color: '#212121'
                                            }}>${product.price}</div>
                                            <div style={{
                                                fontSize: '16px',
                                                marginLeft: '12px',
                                                verticalAlign: 'middle',
                                                color: '#878787',
                                                display: 'inline-block',
                                                textDecoration: 'line-through',
                                            }}>${product.price}</div>
                                            <div style={{
                                                marginLeft: '12px',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                color: '#388e3c',
                                                verticalAlign: 'middle',
                                                letterSpacing: '-0.2px',
                                                display: 'inline-block'
                                            }}>
                                                <span>{product.discountPercentage}% Off</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    width: '100%',
                                    display: 'block',
                                }}>
                                    <div style={{
                                        marginTop: '8px'
                                    }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#212121'
                                        }}>Available Offers</div>
                                    </div>
                                    <div style={{
                                        lineHeight: 1.43,
                                        color: '#212121',
                                        fontSize: '14px',
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            display: 'flex',
                                        }}>
                                            <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="baseTag" width='18' height='18' style={{ marginRight: '10px' }} />
                                            <li style={{
                                                marginTop: '-2px',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                width: '100%',
                                                listStyle: 'none'
                                            }}>
                                                <span>Eligible for Flipkart Pay later</span>
                                            </li>
                                        </span>
                                        <span style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            display: 'flex',
                                        }}>
                                            <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="baseTag" width='18' height='18' style={{ marginRight: '10px' }} />
                                            <li style={{
                                                marginTop: '-2px',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                width: '100%',
                                                listStyle: 'none'
                                            }}>
                                                <span style={{
                                                    color: '#212121',
                                                    fontWeight: '500',
                                                    paddingRight: '4px'
                                                }}>Bank Offer</span>
                                                <span>Flat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999</span>
                                                <div style={{
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                }}>
                                                    <span style={{
                                                        color: '#2874f0',
                                                        fontWeight: 500,
                                                        display: 'inline-block',
                                                        marginLeft: '5px',
                                                        cursor: 'pointer'
                                                    }}>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                        <span style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            display: 'flex',
                                        }}>
                                            <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="baseTag" width='18' height='18' style={{ marginRight: '10px' }} />
                                            <li style={{
                                                marginTop: '-2px',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                width: '100%',
                                                listStyle: 'none'
                                            }}>
                                                <span style={{
                                                    color: '#212121',
                                                    fontWeight: '500',
                                                    paddingRight: '4px'
                                                }}>Bank Offer</span>
                                                <span>10% Instant Discount on HDFC Bank Credit Cards, up to ₹1,000 on orders of ₹5,000 and above</span>
                                                <div style={{
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                }}>
                                                    <span style={{
                                                        color: '#2874f0',
                                                        fontWeight: 500,
                                                        display: 'inline-block',
                                                        marginLeft: '5px',
                                                        cursor: 'pointer'
                                                    }}>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                        <span style={{
                                            marginTop: '16px',
                                            width: '100%',
                                            display: 'flex',
                                        }}>
                                            <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="baseTag" width='18' height='18' style={{ marginRight: '10px' }} />
                                            <li style={{
                                                marginTop: '-2px',
                                                display: 'inline-block',
                                                verticalAlign: 'top',
                                                width: '100%',
                                                listStyle: 'none'
                                            }}>
                                                <span style={{
                                                    color: '#212121',
                                                    fontWeight: '500',
                                                    paddingRight: '4px'
                                                }}>Bank Offer</span>
                                                <span>Flat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999</span>
                                                <div style={{
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                }}>
                                                    <span style={{
                                                        color: '#2874f0',
                                                        fontWeight: 500,
                                                        display: 'inline-block',
                                                        marginLeft: '5px',
                                                        cursor: 'pointer'
                                                    }}>T&C</span>
                                                </div>
                                            </li>
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    padding: '24px 0 0'
                                }}>
                                    <div style={{
                                        fontWeight: 500,
                                        color: '#878787',
                                        width: '110px',
                                        paddingRight: '10px',
                                        float: 'left'
                                    }}>Easy Payment Options</div>
                                    <div style={{
                                        marginLeft: '110px'
                                    }}>
                                        <ul>
                                            <li style={{
                                                color: '#212121',
                                                padding: '0 0 8px 16px',
                                                position: 'relative'
                                                //after
                                                //                                         content: "";
                                                // height: 6px;
                                                // width: 6px;
                                                // position: absolute;
                                                // top: 6px;
                                                // left: 0;
                                                // border-radius: 50%;
                                                // background: #c2c2c2;
                                            }}>No cost EMI starting from ₹889/month</li>
                                            <li style={{
                                                color: '#212121',
                                                padding: '0 0 8px 16px',
                                                position: 'relative'
                                            }}>Flipkart Pay Later</li>
                                            <li style={{
                                                color: '#212121',
                                                padding: '0 0 8px 16px',
                                                position: 'relative'
                                            }}>Cash on Delivery</li>
                                            <li style={{
                                                color: '#212121',
                                                padding: '0 0 8px 16px',
                                                position: 'relative'
                                            }}>Net banking & Credit/ Debit/ ATM card</li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{
                                    padding: '24px 0 0'
                                }}>
                                    <img src="https://rukminim2.flixcart.com/lockin/400/400/images/CCO__PP_2019-07-14.png?q=50" alt="" />
                                </div>
                                <div style={{
                                    padding: '24px 0 0'
                                }}>
                                    <div style={{
                                        fontWeight: 500,
                                        color: '#878787',
                                        width: '110px',
                                        paddingRight: '10px',
                                        float: 'left'
                                    }}>Description</div>
                                    <div style={{
                                        marginLeft: '110px',
                                        color: '#212121'
                                    }}>
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'block',
                            width: '100%',
                        }}>
                            <ExtraProducts type='related' products={relatedProducts} />
                        </div>
                        <div>Recently Viewed</div>
                    </div >
                </div>
            }
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
        </>
    )
}

export default Products