import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import { Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { addToCart } from "../../Features/User/userCartSlice";
import { addSingleOrder } from "../../Features/User/orderDetailsSlice";
import { handleCheck } from "../Functions/productsFunctions";


export const DesktopThumbnail = ({ productImages, product }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const wishListItems = useSelector(state => state.wishListState.wishListItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="_prod_004 w-5-12 _prod_061">
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
                                onChange={(event) => { handleCheck(event, product.id) }}
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
                                    dispatch(addToCart(product.id));
                                    setTimeout(() => {
                                        navigate('/cart')
                                    }, 500);
                                }}
                            >
                                <AddShoppingCartIcon fontSize="medium" style={{ marginRight: '4px', display: 'inline-block' }} />
                                Add To cart
                            </button>
                        </li>
                        <li className="w-1-2 _prod_081" style={{ listStyle: 'none' }}>
                            <button className="_prod_026 _prod_033" style={{ backgroundColor: '#fb641b' }}
                                onClick={() => {
                                    console.log('working');
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
        </div>
    )
}