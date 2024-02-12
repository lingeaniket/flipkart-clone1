import { useEffect, memo } from "react";
import "../../../Styles/cartElementStyles.css";

import ActionComponent from "./ActionComponent";

import { website } from "../../../../websiteData";
import { formattedDate } from "../../../../OrderDetails/Functions/orderListFunctions";


const CartElement = ({ type, method, item }) => {
    const handleProductClick = () => {
        window.open(`${website}/products/${item.product.title}/p/${item.product.id}`, "_blank");
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
            <ActionComponent type={type} method={method} item={item} />
        </div>
    );
};

export default memo(CartElement);
