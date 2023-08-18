import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleCheck } from "../Functions/productsFunctions";

import { pink } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating, Tooltip, Checkbox, Skeleton } from "@mui/material";

const ExtraProducts = ({ type, products, loaded }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishListItems = useSelector(state => state.wishListState.wishListItems);

    return (
        <div className="_prod_062">
            <div className="_prod_063">{type === 'related' ? 'Similar Products' : (type === 'recommanded' ? "Recommanded" : 'Recently Viewed')}</div>
            <div style={{ overflow: 'scroll' }}>
                <div className="_prod_007 _prod_086">
                    {products.map(product => {
                        if (loaded) {
                            return <Skeleton variant="rectangle" animation="wave" sx={{
                                width: '200px',
                                height: '200px',
                                backgroundColor: '#f0f0f069',
                                // margin: '16px 0 0 16px',
                            }}></Skeleton>

                        } else {
                            return <div className="_prod_087" key={product.id}>
                                <div className="w-1-1 _prod_088" style={{ position: 'relative' }} >
                                    <div className="_prod_068" style={{ position: 'relative', aspectRatio: '1/1' }} onClick={() => {
                                        navigate(`/products/${product.title}/p/${product.id}`)
                                    }}>
                                        <div className="_prod_069 w-1-1" style={{ position: 'relative', height: '100%' }}>
                                            <img src={product.thumbnail} alt=""
                                                className="_prod_070 _prod_080" loading="eager"
                                            />
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/products/${product.title}/p/${product.id}`)
                                    }}>
                                        <div className="_prod_071" style={{ overflow: 'hidden' }}>{product.title}</div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            <div className="_prod_072">
                                                <span className="_prod_089">
                                                    <Tooltip title={`${product.rating}★`} arrow>
                                                        <span>
                                                            <Rating name="half-rating-read" value={product.rating} precision={0.1} size='small' readOnly />
                                                        </span>
                                                    </Tooltip>
                                                </span>
                                                <span className="_prod_090">
                                                    {product.rating}★

                                                </span>
                                            </div>
                                            <div className=" _prod_082" style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                                    alt={product.title}
                                                    style={{
                                                        // width: '100%',
                                                        maxWidth: '100%',
                                                        height: '18px'
                                                    }}
                                                // height={'18'}
                                                />
                                            </div>
                                        </div>
                                        <div className="_prod_074">
                                            <div className="_prod_075">${product.price}</div>
                                            <div className="_prod_076">${product.price}</div>
                                            <div className="_prod_077 _prod_083">{product.discountPercentage}% off</div>
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
                        }
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExtraProducts;