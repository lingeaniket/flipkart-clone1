import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../Styles/cartElementStyles.css'
import { handleInputQuantity, handleQuantity, moveProductToCart, removeProduct, saveProductForLater } from "../Functions/cartFunctions";

const CartElement = ({ type, method, item }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [timeId, setTimeId] = useState();

    useEffect(() => {

    }, [item])

    return (
        <div className="cartElementMain">
            <div style={{ width: '100%' }}>
                <div className="cartProductImage">
                    <img
                        loading="lazy"
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        onClick={() => {
                            navigate(`/products/${item.product.title}/p/${item.product.id}`);
                        }}
                    />
                </div>
                <div className="cartProductDetails">
                    <div onClick={() => {
                        navigate(`/products/${item.product.title}/p/${item.product.id}`);
                    }}>{item.product.title}</div>
                    <div>
                        <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt="flipkart-assured"
                        />
                    </div>
                    <span>${((item.product.price * item.quantity) * 100 / (100 - item.product.discountPercentage)).toFixed(1)}</span>
                    <span>${(item.product.price * item.quantity).toFixed(1)}</span>
                    <span>{item.product.discountPercentage}% Off</span>
                </div>
                <div className="cartDeliveryDetails">
                    {(type === 'cart' || type === 'checkout')
                        &&
                        (
                            <div>
                                Delivery by Tomorrow, Sun
                                <span>|</span>
                                {((item.product.price * item.quantity).toFixed(1) > 50)
                                    &&
                                    (
                                        <span style={{ color: '#388e3c' }}>FREE</span>
                                    )
                                }
                                <span style={{
                                    color: '#717478',
                                    textDecoration: `${((item.product.price * item.quantity).toFixed(1) > 50) ? 'line-through' : 'none'}`,
                                }}>${(item.quantity * 0.75).toFixed(1)}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <div className="handlingCartDiv">
                    <div className="disFlexAlignItCen" style={{ color: 'black', pointerEvents: `${type === "saveLater" && 'none'}` }}>
                        <button onClick={() => { handleQuantity('decrease', method, item, dispatch, timeId) }}>-</button>
                        <div className="quantityInput">
                            <input type="text" value={item.quantity} onInput={(event) => {
                                handleInputQuantity(event, method, item, timeId, dispatch, setTimeId)
                            }} />
                        </div>
                        <button onClick={() => { handleQuantity('increase', method, item, dispatch, timeId) }}>+</button>
                    </div>
                </div>
                <div className="handleCartButton">
                    {(type !== 'checkout')
                        &&
                        (
                            <div onClick={() => {
                                if (type === 'cart') {
                                    saveProductForLater(item, dispatch)
                                } else {
                                    moveProductToCart(item, dispatch)
                                }
                            }}>
                                {type === 'cart' ? 'save for later' : 'move to cart'}
                            </div>
                        )
                    }
                    <div onClick={() => { removeProduct(method, item, dispatch) }}>remove</div>
                </div>
            </div>
        </div>
    )
}

export default CartElement;