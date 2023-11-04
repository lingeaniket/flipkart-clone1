import axios from "axios";
import { useState, useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../Styles/priceDetailsStyles.css";

import { updateOrderPrice } from "../../../Features/User/orderDetailsSlice";

import { Paper, Skeleton } from "@mui/material";

const PriceDetails = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartState.cartItems);
    const singleOrder = useSelector((state) => state.orderDetailsState.singleOrder);

    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

    const [searchParams] = useSearchParams();
    const item_id = searchParams.get("item-id");

    const fetchData = async (id, quantity) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            return {
                product: response.data,
                quantity: quantity,
            };
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };

    const FindPriceDetails = (products) => {
        const originalPrice = products.reduce((accum, product) => {
            return (
                accum + Number(((product.product.price * product.quantity * 100) / (100 - product.product.discountPercentage)).toFixed(2))
            );
        }, 0);

        const discount = products.reduce((accum, product) => {
            return (
                accum +
                Number(
                    (
                        ((product.product.price * product.quantity * 100) / (100 - product.product.discountPercentage)) *
                        (product.product.discountPercentage / 100)
                    ).toFixed(2)
                )
            );
        }, 0);

        const price = products.reduce((accum, product) => {
            return accum + Number((product.quantity * product.product.price).toFixed(1));
        }, 0);

        const priceData = { price, discount, originalPrice };

        dispatch(updateOrderPrice(priceData));

        setTotalOriginalPrice(originalPrice);
        setTotalDiscount(discount);
        setTotalPrice(price);
    };

    useEffect(() => {
        const fetchCartData = async () => {
            if (item_id) {
                const promise = singleOrder.map((item) => fetchData(item.id, item.quantity));
                const data = await Promise.all(promise);
                const cartProducts = data.filter((item) => item !== null);
                FindPriceDetails(cartProducts);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));

                const cartData = await Promise.all(cartPromises);
                const cartProducts = cartData.filter((item) => item !== null);

                FindPriceDetails(cartProducts);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        setLoading(true);

        fetchCartData();
        // eslint-disable-next-line
    }, [cart, item_id, singleOrder]);

    return (
        <Paper className="priceDetailsMain" sx={{ backgroundColor: "transparent" }} elevation={0} square>
            <div>
                <div className="priceDetail">
                    <div>
                        <span>Price details</span>
                        <div className="priceDetailDiv">
                            <div className="disFlexJusConBet priceDetailsItem">
                                {loading ? (
                                    <Skeleton width="100%" variant="rectangular" animation="wave" sx={{ backgroundColor: "white" }} />
                                ) : (
                                    <>
                                        <div>
                                            <div className="disFlexAlignItCen">Price {cart.length} items</div>
                                        </div>
                                        <div>${totalOriginalPrice.toFixed(1)}</div>
                                    </>
                                )}
                            </div>
                            <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                {loading ? (
                                    <Skeleton width="100%" variant="rectangular" animation="wave" sx={{ backgroundColor: "white" }} />
                                ) : (
                                    <>
                                        <div>
                                            <div className="disFlexAlignItCen">Discount</div>
                                        </div>
                                        <div>-{totalDiscount.toFixed(1)}</div>
                                    </>
                                )}
                            </div>
                            <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                {loading ? (
                                    <Skeleton width="100%" variant="rectangular" animation="wave" sx={{ backgroundColor: "white" }} />
                                ) : (
                                    <>
                                        <div>
                                            <div className="disFlexAlignItCen">Delivery Charges</div>
                                        </div>
                                        <div>FREE</div>
                                    </>
                                )}
                            </div>
                            <div>
                                <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                    {loading ? (
                                        <Skeleton width="100%" variant="rectangular" animation="wave" sx={{ backgroundColor: "white" }} />
                                    ) : (
                                        <>
                                            <div>
                                                <div className="disFlexAlignItCen">Total Amount</div>
                                            </div>
                                            <div style={{ color: "black" }}>${totalPrice.toFixed(1)}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="disFlexJusConBet">
                                {loading ? (
                                    <Skeleton width="100%" variant="rectangular" animation="wave" sx={{ backgroundColor: "white" }} />
                                ) : (
                                    <>You will save ${totalDiscount.toFixed(1)} on this order</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default memo(PriceDetails);
