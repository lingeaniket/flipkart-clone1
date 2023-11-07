import { useDispatch } from "react-redux";
import React, { useState, memo } from "react";

import {
    handleInputQuantity,
    handleQuantity,
    moveProductToCart,
    removeProduct,
    saveProductForLater,
} from "../../../Functions/cartElementFunctions";

const ActionComponent = ({ type, item, method }) => {
    const dispatch = useDispatch();

    const [timeId, setTimeId] = useState();

    const handleInpQuant = (event) => {
        handleInputQuantity(event, method, item, timeId, dispatch, setTimeId);
    };

    const handleRemoveProduct = () => {
        removeProduct(method, item, dispatch);
    };

    const handleMoving = () => {
        if (type === "cart") {
            saveProductForLater(item, dispatch);
        } else {
            moveProductToCart(item, dispatch);
        }
    };

    const handleQuant = (event) => {
        handleQuantity(event.target.name, method, item, dispatch, timeId);
    };

    return (
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
    );
};

export default memo(ActionComponent);
