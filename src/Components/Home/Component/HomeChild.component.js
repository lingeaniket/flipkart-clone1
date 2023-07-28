import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Rating, Checkbox, Tooltip } from '@mui/material';
import SnackBar from '../../SnackBar/snackBar.component';
import { grey, pink } from '@mui/material/colors';
import { addToWishList, removeFromWishList } from '../../Features/User/userWishListSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import '../Styles/home.css';
import '../Styles/homeStyles.css';

const Homechild = ({ product }) => {
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className='w-1-1'>
            <div className='_home_023'>
                <div className='w-1-1'>
                    <div className='_home_024'>
                        <div className='_home_025'>
                            <div className='_home_026'>
                                <div className='_home_027' onClick={() => {
                                    navigate(`/products/${product.title}/p/${product.id}`);
                                }}>
                                    <div>
                                        <div className='_home_028'>
                                            <img className='_home_029' loading='eager' src={product.thumbnail} alt={product.title} />
                                        </div>
                                    </div>
                                </div>
                                <div className='_home_030'>
                                    <div className='_home_031'>
                                        <Checkbox id='name'
                                            checked={wishListItems.some((item) => item === product.id) ? true : false}
                                            onChange={handleCheck(product.id)}
                                            icon={<FavoriteIcon fontSize='small' sx={{ color: grey[300] }} />}
                                            checkedIcon={<FavoriteIcon fontSize='small' sx={{ color: pink[500] }} />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='_home_032' onClick={() => {
                                navigate(`/products/${product.title}/p/${product.id}`);
                            }}>
                                <div className='_home_033'>
                                    <div className='_home_034'>{product.title}</div>
                                    <div style={{
                                        marginTop: '6px'
                                    }}>
                                        <span style={{ position: 'relative' }}>
                                            <div style={{
                                                lineHeight: 'normal', display: 'inline-block',
                                                padding: '2px 4px 2px 6px',
                                                fontSize: '12px',
                                                verticalAlign: 'middle'
                                            }}>
                                                <Tooltip title={`${product.rating}★`}>
                                                    <span>
                                                        <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </span>
                                    </div>
                                    <div style={{
                                        marginTop: '13px'
                                    }}>
                                        <div style={{ marginTop: '5px', color: '#212121' }}>{product.description}</div>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: '25px', width: '41.66%', display: 'inline-block', verticalAlign: 'top' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        marginTop: '-1px',
                                        paddingRight: '10px',
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '25px', display: 'block', fontWeight: '500', color: '#212121' }}>
                                                ${product.price}
                                            </div>
                                            <div style={{ paddingTop: '10px', display: 'inline-block', marginLeft: '0', textDecoration: 'line-through', fontSize: '14px', color: '#878787' }}>
                                                ${product.price}
                                            </div>
                                            <div style={{ color: '#388e3c', fontSize: '13px', letterSpacing: '-0.2px', fontWeight: '500', display: 'inline-block', marginLeft: '8px' }}>
                                                <span>{product.discountPercentage}% Off</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'inline-block', verticalAlign: 'top', fontSize: 0, paddingBottom: '4px' }}>
                                        <img height='21' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt={product.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
        </div>
    )
}

export default Homechild;