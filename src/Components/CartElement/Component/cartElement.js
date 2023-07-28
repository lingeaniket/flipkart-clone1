import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Styles/cartElementStyles.css'
import SnackBar from '../../SnackBar/snackBar.component';
import { handleInputQuantity, handleQuantity, moveProductToCart, removeProductFromCart, saveProductForLater } from "../Functions/cartFunctions";

const CartElement = ({ type, item }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [timeId, setTimeId] = useState();

    const handleSnackBar = () => {
        setOpen(true);
    };

    return (
        <div className="cartElementMain">
            <div>
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
                    <div>
                        <span>{item.product.title}</span>
                    </div>
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
                    {type === 'cart'
                        &&
                        <div>
                            Delivery by Tomorrow, Sun
                            <span>|</span>
                            {(item.product.price * item.quantity).toFixed(1) > 50
                                &&
                                <span style={{ color: '#388e3c' }}>FREE</span>
                            }
                            <span style={{
                                color: '#717478',
                                textDecoration: `${((item.product.price * item.quantity).toFixed(1) > 50) ? 'line-through' : 'none'}`,
                            }}>${(item.quantity * 0.75).toFixed(1)}</span>
                        </div>
                    }
                </div>
            </div>
            <div>
                <div className="handlingCartDiv">
                    <div className="disFlexAlignItCen" style={{ color: 'black' }}>
                        <button disabled={type !== 'cart'} onClick={() => {
                            handleQuantity('decrease', item, dispatch, timeId, setMessage, handleSnackBar, setAlertType)
                        }}>-</button>
                        <div className="quantityInput">
                            <input disabled={type !== 'cart'} type="text" value={item.quantity} onInput={(event) => {
                                handleInputQuantity(event, item, setMessage, handleSnackBar, setAlertType, timeId, dispatch, setTimeId)
                            }} />
                        </div>
                        <button disabled={type !== 'cart'} onClick={() => {
                            handleQuantity('increase', item, dispatch, timeId, setMessage, handleSnackBar, setAlertType)
                        }}>+</button>
                    </div>
                </div>
                <div className="handleCartButton">
                    <div onClick={() => {
                        if (type === 'cart') {
                            saveProductForLater(item, handleSnackBar, setMessage, setAlertType, dispatch)
                        } else {
                            moveProductToCart(item, handleSnackBar, setMessage, setAlertType, dispatch)
                        }
                    }}>{type === 'cart' ? 'save for later' : 'move to cart'}</div>
                    <div onClick={() => {
                        removeProductFromCart(item, handleSnackBar, setAlertType, setMessage, dispatch)
                    }}>remove</div>
                </div>
            </div>
            <SnackBar open={open} setOpen={setOpen} message={message} alertType={alertType} />
        </div>
    )
}

export default CartElement;