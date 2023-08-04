import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleCheck } from "./Functions/productsFunctions";

import { pink } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating, Tooltip, Checkbox } from "@mui/material";

const ExtraProducts = ({ type, products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishListItems = useSelector(state => state.wishListState.wishListItems);

    return (
        <div className="_prod_062">
            <div className="_prod_063">{type === 'related' ? 'Similar Products' : 'Recently Viewed'}</div>
            <div style={{ marginTop: '20px' }}>
                <div className="_prod_007" style={{ flexDirection: 'row' }}>
                    {products.map(product =>
                        <div style={{ width: '220px' }} key={product.id}>
                            <div style={{ position: 'relative', padding: '16px' }} >
                                <div className="_prod_068" style={{ position: 'relative' }} onClick={() => {
                                    navigate(`/products/${product.title}/p/${product.id}`)
                                }}>
                                    <div className="_prod_069" style={{ position: 'relative' }}>
                                        <img src={product.thumbnail}
                                            alt=""
                                            className="_prod_070 _prod_080" loading="eager" />
                                    </div>
                                </div>
                                <div onClick={() => {
                                    navigate(`/products/${product.title}/p/${product.id}`)
                                }}>
                                    <div className="_prod_071" style={{ overflow: 'hidden' }}>{product.title}</div>
                                    <div className="_prod_072">
                                        <span>
                                            <Tooltip title={`${product.rating}★`} arrow>
                                                <span>
                                                    <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                </span>
                                            </Tooltip>
                                        </span>
                                    </div>
                                    <div className="_prod_073 _prod_082">
                                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                            alt={product.title}
                                            height={'21'} />
                                    </div>
                                    <div className="_prod_074">
                                        <div className="_prod_075">${product.price}</div>
                                        <div className="_prod_076">${product.price}</div>
                                        <div className="_prod_077 _prod_083">{product.discountPercentage}% Off</div>
                                    </div>
                                </div>
                                <div className="_prod_078 _prod_033">
                                    <div className="_prod_021">
                                        <Checkbox id='name'
                                            checked={wishListItems.some((item) => item === product.id) ? true : false}
                                            onChange={(event) => { handleCheck(event, product.id, dispatch) }}
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
    )
}

export default ExtraProducts;