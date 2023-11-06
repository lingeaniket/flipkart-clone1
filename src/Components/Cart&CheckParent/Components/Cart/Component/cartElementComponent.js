import { useDispatch } from "react-redux";
import { useEffect, useState, memo } from "react";

import "../../../Styles/cartElementStyles.css";
import { formattedDate } from "../../../../OrderDetails/Functions/orderListFunctions";
import { website } from "../../../../websiteData";
import {
    handleInputQuantity,
    handleQuantity,
    moveProductToCart,
    removeProduct,
    saveProductForLater,
} from "../../../Functions/cartElementFunctions";

const CartElement = ({ type, method, item }) => {
    const dispatch = useDispatch();

    const [timeId, setTimeId] = useState();

    const handleProductClick = () => {
        window.open(`${website}/products/${item.product.title}/p/${item.product.id}`, "_blank");
    };

    const handleRemoveProduct = () => {
        removeProduct(method, item, dispatch);
    };

    const handleQuant = (event) => {
        handleQuantity(event.target.name, method, item, dispatch, timeId);
    };

    const handleMoving = () => {
        if (type === "cart") {
            saveProductForLater(item, dispatch);
        } else {
            moveProductToCart(item, dispatch);
        }
    };

    const handleInpQuant = (event) => {
        handleInputQuantity(event, method, item, timeId, dispatch, setTimeId);
    };

    useEffect(() => {}, [item]);

    return (
        <div className="cartElementMain">
            <div style={{ width: "100%" }}>
                <div className="cartProductImage">
                    <img loading="lazy" src={item.product.thumbnail} alt={item.product.title} onClick={handleProductClick} />
                </div>
                <div className="cartProductDetails">
                    <div onClick={handleProductClick}>{item.product.title}</div>
                    <div>
                        <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt="flipkart-assured"
                        />
                    </div>
                    <span>${((item.product.price * item.quantity * 100) / (100 - item.product.discountPercentage)).toFixed(1)}</span>
                    <span>${(item.product.price * item.quantity).toFixed(1)}</span>
                    <span>{item.product.discountPercentage}% Off</span>
                </div>
                <div className="cartDeliveryDetails">
                    {(type === "cart" || type === "checkout") && (
                        <div>
                            Delivery by {formattedDate(new Date().getTime())} <span>|</span>
                            {(item.product.price * item.quantity).toFixed(1) > 50 && <span style={{ color: "#388e3c" }}>FREE</span>}
                            <span
                                style={{
                                    color: "#717478",
                                    textDecoration: `${(item.product.price * item.quantity).toFixed(1) > 50 ? "line-through" : "none"}`,
                                }}
                            >
                                ${(item.quantity * 0.75).toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="handlingCartDiv">
                    <div className="disFlexAlignItCen" style={{ color: "black", pointerEvents: `${type === "saveLater" && "none"}` }}>
                        <button name="decrease" onClick={handleQuant}>
                            -
                        </button>
                        <div className="quantityInput">
                            <input type="text" value={item.quantity} onInput={handleInpQuant} />
                        </div>
                        <button name="increase" onClick={handleQuant}>
                            +
                        </button>
                    </div>
                </div>
                <div className="handleCartButton">
                    {type !== "checkout" && <div onClick={handleMoving}>{type === "cart" ? "save for later" : "move to cart"}</div>}
                    <div onClick={handleRemoveProduct}>remove</div>
                </div>
            </div>
        </div>
    );
};

export default memo(CartElement);
