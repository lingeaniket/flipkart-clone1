import { Rating, Tooltip, Checkbox } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../Features/User/userWishListSlice";
import SnackBar from "../SnackBar/snackBar.component";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";

const ExtraProducts = ({ type, products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [message, setMessage] = useState('');
    const wishListItems = useSelector(state => state.wishListState.wishListItems);

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
                setAlertType("success")
                setMessage(`Removed from your Wishlist`)
                dispatch(removeFromWishList(id))
            }, 500);
        }
    }
    return (
        <>
            <div style={{
                marginTop: '20px',
                paddingTop: '24px',
                backgroundColor: '#fff',
                borderRadius: '2px',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)'
            }}>
                <div style={{
                    fontWeight: 500,
                    paddingLeft: '20px',
                    fontSize: '22px'
                }}>{type === 'related' ? 'Similar Products' : 'Recently Viewed'}</div>
                <div style={{
                    marginTop: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch'
                    }}>
                        {products.map(product =>
                            <div style={{ width: '220px' }}
                                onClick={() => {
                                    navigate(`/products/${product.title}/p/${product.id}`)
                                }}>
                                <div style={{
                                    padding: '16px',
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'block',
                                        marginBottom: '5px',
                                        paddingBottom: '16px'
                                    }}>
                                        <div style={{
                                            height: '180px',
                                            width: '180px',
                                            position: 'relative',
                                            margin: '0 auto'
                                        }}>
                                            <img src={product.thumbnail} alt="" style={{
                                                position: 'absolute',
                                                inset: '0px',
                                                margin: 'auto',
                                                opacity: 1,
                                                maxWidth: '100%',
                                                maxHeight: '100%'
                                            }} loading="eager" />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{
                                            paddingBottom: '5px',
                                            overflow: 'hidden',
                                            display: 'block'
                                            //hover
                                            //color: '#2874f0'
                                        }}>
                                            {product.title}
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
                                    <div style={{
                                        position: 'absolute',
                                        display: 'inline-block',
                                        top: '12px',

                                        right: '12px',
                                        cursor: 'pointer'
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            display: 'inline-flex',
                                        }}>
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
                        )}
                    </div>
                </div>
            </div>
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
        </>
    )
}

export default ExtraProducts;