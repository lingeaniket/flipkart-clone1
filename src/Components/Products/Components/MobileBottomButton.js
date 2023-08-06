import { useDispatch, useSelector } from "react-redux";
import { addSingleOrder } from "../../Features/User/orderDetailsSlice"
import { addToCart } from "../../Features/User/userCartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const MobileButton = ({product}) => {
    const cart = useSelector(state => state.cartState.cartItems);
    const [isInCart, setIIsInCart] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(cart.some(item => item.id === product.id)) {
            setIIsInCart(true)
        } else {
            setIIsInCart(false)
        }

    }, [cart, product])
    return (
        <div
            className="_prod_091"
            style={{
                position: 'sticky',
                bottom: '0',
                background: 'white',
                width: '100%',
                boxShadow: '0 -2px 10px 0 rgba(0, 0, 0, .2)'
            }}>
            <div style={{
                width: '100%',
                display: 'flex',
                height: '50px',
            }}>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if(!isInCart) {
                        dispatch(addToCart(product.id));
                    }
                    setTimeout(() => {
                        navigate('/cart')
                    }, 500);
                }}
                >
                    <div style={{
                        textAlign: 'center',
                    }}>{
                        isInCart 
                        ? 
                        "Go to cart"
                        :
                        "Add to cart" 
                    }</div>
                </div>
                <div style={{
                    width: '50%',
                    backgroundColor: '#ff9f00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    dispatch(addSingleOrder(product.id))
                    navigate(`/checkout?item-id=${product.id}`)
                }}>
                    <div style={{
                        textAlign: 'center',
                    }}>Buy now</div>
                </div>
            </div>
        </div>
    )
}

export default MobileButton