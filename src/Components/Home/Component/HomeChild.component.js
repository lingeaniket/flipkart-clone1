import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import '../Styles/home.css';
import '../Styles/homeStyles.css';
import { handleCheck } from '../../Products/Functions/productsFunctions';

import { grey, pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating, Checkbox, Tooltip, Skeleton } from '@mui/material';

const Homechild = ({ product, loader }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishListItems = useSelector(state => state.wishListState.wishListItems);

    return (
        <div className='w-1-1'>{
            loader
                ?
                <Skeleton variant='rectangle' animation="wave" width={'100%'} height={200} sx={{
                    background: 'white',
                    // margin: '5px 0',
                    border: '1px solid #f0f0f0'
                }}></Skeleton>
                :

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
                                                onChange={(event) => { handleCheck(event, product.id, dispatch) }}
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
                                        <div className='_home_035'>
                                            <span className='_home_036'>
                                                <div className='_home_037'>
                                                    <Tooltip title={`${product.rating}★`}>
                                                        <span>
                                                            <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </span>
                                        </div>
                                        <div className='_home_038'>
                                            <div className='_home_039'>{product.description}</div>
                                        </div>
                                    </div>
                                    <div className='_home_040'>
                                        <div className='_home_041'>
                                            <div>
                                                <div className='_home_042'>${product.price}</div>
                                                <div className='_home_043'>${product.price}</div>
                                                <div className='_home_044'>{product.discountPercentage}% Off</div>
                                            </div>
                                        </div>
                                        <div className='_home_045'>
                                            <img height='21' src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt={product.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </div>
    )
}

export default Homechild;