import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rating, Tooltip, Checkbox, Button, IconButton, CircularProgress } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


import axios from "axios";
const WishList = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [wishListProducts, setWishListProducts] = useState([]);

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
    useEffect(() => {
        const fetchDataForAllKeywords = async () => {
            const promises = wishListItems.map((id) => fetchDataForKeyword(id));
            const fetchedData = await Promise.all(promises);
            setWishListProducts(fetchedData.filter((item) => item !== null));
            setTimeout(()=>{
                setLoaded(true)
            }, 2000)
        };

        fetchDataForAllKeywords();
        // eslint-disable-next-line
    }, [])
    return (
        <div style={{
            minHeight: '300px'
        }}>
            <div style={{
                background: 'rgb(255, 255, 255)',
                position: 'relative',
                borderRadius: '2px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)'
            }}>
                <div style={{
                    borderBottom: '1px solid rgb(224, 224, 224)',
                    padding: '20px 30px',
                    fontSize: '17px',
                    fontWeight: 500,
                }}>My Wishlist ({wishListItems.length})</div>
                {!loaded ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '154px'}}><CircularProgress /></div> :

                    wishListProducts.map((product) =>

                        <div style={{ borderBottom: '1px solid rgb(224, 224, 224)' }}>
                            <div style={{
                                lineHeight: '1',
                                padding: '24px 0px 30px 24px',
                                display: 'block',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: '120px',
                                    float: 'left'
                                }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'block',
                                    }}>
                                        <div style={{
                                            height: '100px', width: '100px', position: 'relative', margin: '0 auto'
                                        }}>
                                            <img src={product.thumbnail}
                                                alt=""
                                                style={{
                                                    position: "absolute",
                                                    inset: '0',
                                                    margin: 'auto',
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    paddingLeft: '25px',
                                    float: 'none',
                                    width: 'auto',
                                    display: 'flex',
                                }}>
                                    <div style={{ width: '75%', display: 'inline-block', verticalAlign: 'top' }}>
                                        <div>
                                            <div style={{
                                                paddingBottom: '5px',
                                                overflow: 'hidden',
                                                display: 'block'
                                                //hover
                                                //color: '#2874f0'
                                            }}>
                                                {product.title}
                                                {/* kjsjhsbbbbabbabab */}
                                            </div>
                                            <div style={{
                                                marginTop: '0',
                                                display: 'inline-block',
                                                paddingRight: '10px'
                                            }}>
                                                <span>
                                                    <Tooltip title={`${product.rating}★`} arrow>
                                                        <span>
                                                            <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                        </span>
                                                    </Tooltip>
                                                </span>
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                display: 'inline-block',
                                                verticalAlign: 'middle',
                                                fontSize: 0
                                            }}>
                                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                                    alt={product.title} height={'21'} />
                                            </div>
                                            <div style={{
                                                display: 'block',
                                                padding: '0 10px 0 0',
                                                margin: '3px 0'
                                            }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    fontSize: '16px',
                                                    fontWeight: '500',
                                                    color: '#212121'
                                                }}>${product.price}</div>
                                                <div style={{
                                                    display: 'inline-block',
                                                    marginLeft: '8px',
                                                    textDecoration: 'line-through',
                                                    fontSize: '14px',
                                                    color: '#878787'
                                                }}>${product.price}</div>
                                                <div style={{
                                                    color: '#388e3c',
                                                    fontSize: '13px',
                                                    letterSpacing: '-.2px',
                                                    fontWeight: 500,
                                                    display: 'inline-block',
                                                    marginLeft: '8px'
                                                }}>{product.discountPercentage}% Off</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '25%', padding: '0 25px', }}>
                                        <Tooltip title="delete item">
                                            <IconButton sx={{ float: "right" }}>
                                                <DeleteRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    )
}
export default WishList;