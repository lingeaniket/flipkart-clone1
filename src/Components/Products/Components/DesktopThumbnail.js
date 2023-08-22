import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import { Checkbox, CircularProgress } from "@mui/material";
import { pink } from "@mui/material/colors";
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { addToCart } from "../../Features/User/userCartSlice";
import { addSingleOrder } from "../../Features/User/orderDetailsSlice";
import { handleCheck } from "../Functions/productsFunctions";
import { Skeleton } from "@mui/material";
import { setMessage, setOpen } from "../../Features/SnackBar/snackbarSlice";
import { openLogin } from "../../Features/User/userSlice";
import { startLoginWishlist } from "../../Features/User/userWishListSlice";

const DesktopThumbnail = ({ productImages, product, loaded }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const wishListItems = useSelector(state => state.wishListState.wishListItems);
    const isUserLoggedIn = useSelector(state => state.userState.userLoggedIn);
    const cart = useSelector(state => state.cartState.cartItems);
    const [isInCart, setIIsInCart] = useState(false);
    const [cartMsg, setCartMsg] = useState("Add to cart");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.some(item => item.id === product.id)) {
            setIIsInCart(true)
        } else {
            setIIsInCart(false)
        }
    }, [cart, product])

    return (
        <div className="_prod_004 w-3-8 _prod_061">
            {
                loaded ?
                    <Skeleton variant="rectangle" animation="wave" sx={{
                        width: '100%',
                        height: '350px',
                        backgroundColor: '#f0f0f069',
                        margin: '16px 0 0 16px'
                    }}></Skeleton>
                    :
                    <>
                        <div className="w-1-1">
                            <div style={{ position: 'relative' }}>
                                <div className="_prod_007" style={{ position: 'relative' }}>
                                    <div style={{ height: '448px' }}>
                                        <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                                            <div style={{ height: '448px', overflow: 'hidden' }}>
                                                <ul className="_prod_011">
                                                    {productImages.map((image, index) =>
                                                        <li key={index} className="_prod_012 flexCenCen"
                                                            onMouseOver={() => {
                                                                setSelectedImage(() => index);
                                                            }}>
                                                            <div className="w-1-1"
                                                                style={{
                                                                    position: 'relative', height: '100%', padding: '5px',
                                                                    border: `${selectedImage === index ? '2px solid #2874f0' : 'none'}`,
                                                                }}>
                                                                <div className="w-1-1" style={{ height: '100%' }}>
                                                                    <img src={image} alt="" className="_prod_015 _prod_080" style={{ padding: '5px' }} />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_prod_016 flexCenCen" style={{ position: 'relative' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className="_prod_018" style={{ position: 'relative' }}>
                                                <img src={productImages[selectedImage]} alt="" loading="eager" className="_prod_019 _prod_081" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="_prod_020">
                                    <div className="_prod_021">
                                        <Checkbox id='name'
                                            checked={wishListItems.some((item) => item === product.id) ? true : false}
                                            onChange={(event) => {
                                                if (isUserLoggedIn) {
                                                    handleCheck(event, product.id, dispatch);
                                                } else {
                                                    dispatch(setMessage('Provide login for wishlisting a product'));
                                                    dispatch(setOpen(true));
                                                    dispatch(openLogin());
                                                    dispatch(startLoginWishlist(product.id));
                                                }
                                            }}
                                            icon={<FavoriteIcon fontSize='small' />}
                                            checkedIcon={<FavoriteIcon fontSize='small' sx={{ color: pink[500] }} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1-1">
                            <div className="_prod_023">
                                <ul className="_prod_024 w-1-1">
                                    <li className=" w-1-2 _prod_081" style={{ listStyle: 'none' }}>
                                        <button className="_prod_026 _prod_033" style={{ backgroundColor: '#ff9f00' }}
                                            onClick={() => {
                                                if (!isInCart) {

                                                    setCartMsg("Going to cart");
                                                }
                                                setTimeout(() => {
                                                    dispatch(addToCart(product.id));
                                                    navigate('/cart')
                                                }, 1000);
                                            }}
                                        >
                                            {(cartMsg === "Add to cart")
                                                ?
                                                <AddShoppingCartIcon fontSize="medium" style={{ marginRight: '4px', display: 'inline-block' }} />
                                                :
                                                <CircularProgress size={20} style={{ marginRight: '10px', color: 'white' }} />
                                            }
                                            {isInCart ? "Go to cart" : cartMsg}
                                        </button>
                                    </li>
                                    <li className="w-1-2 _prod_081" style={{ listStyle: 'none' }}>
                                        <button className="_prod_026 _prod_033" style={{ backgroundColor: '#fb641b' }}
                                            onClick={() => {
                                                dispatch(addSingleOrder(product.id))
                                                navigate(`/checkout?item-id=${product.id}`)
                                            }}
                                        >
                                            <BoltIcon fontSize="medium" style={{ marginRight: '4px', display: 'inline-block' }} />
                                            buy now
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default DesktopThumbnail;