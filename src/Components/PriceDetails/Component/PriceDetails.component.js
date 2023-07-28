import { Paper } from "@mui/material";
import '../Styles/priceDetailsStyles.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PriceDetails = () => {
    const cart = useSelector(state => state.cartState.cartItems);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
    const fetchData = async (id, quantity) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            return {
                product: response.data,
                quantity: quantity
            }
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCartData = async () => {
            const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));

            const cartData = await Promise.all(cartPromises);
            const cartProducts = cartData.filter((item) => item !== null);

            setTotalPrice(cartProducts.reduce((accum, product) => {

                return accum + Number((product.quantity * product.product.price).toFixed(1))
            }, 0))

            setTotalDiscount(cartProducts.reduce((accum, product) => {
                return accum + Number(((((product.product.price * product.quantity * 100) / (100 - product.product.discountPercentage)) * (product.product.discountPercentage / 100)).toFixed(2)))
            }, 0))

            setTotalOriginalPrice(cartProducts.reduce((accum, product) => {
                return accum + Number(((((product.product.price * product.quantity) * 100 / (100 - product.product.discountPercentage))).toFixed(2)))
            }, 0))
        };

        fetchCartData();
    }, [cart])

    return (
        <Paper className="priceDetailsMain" sx={{ backgroundColor: 'transparent' }} elevation={0} square>
            {cart.length > 0 &&
                <div>
                    <div className="priceDetail">
                        <div>
                            <span>Price details</span>
                            <div className="priceDetailDiv">
                                <div className="disFlexJusConBet priceDetailsItem">
                                    <div>
                                        <div className="disFlexAlignItCen">Price {cart.length} items</div>
                                    </div>
                                    <div>${totalOriginalPrice.toFixed(1)}</div>
                                </div>
                                <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                    <div>
                                        <div className="disFlexAlignItCen">Discount</div>
                                    </div>
                                    <div>-{(totalDiscount).toFixed(1)}</div>
                                </div>
                                <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                    <div>
                                        <div className="disFlexAlignItCen">Delivery Charges</div>
                                    </div>
                                    <div>FREE</div>
                                </div>
                                <div>
                                    <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                        <div>
                                            <div className="disFlexAlignItCen">Total Amount</div>
                                        </div>
                                        <div>{totalPrice.toFixed(1)}</div>
                                    </div>
                                </div>
                                <div className="disFlexJusConBet">You will save ${totalDiscount.toFixed(1)} on this order</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Paper>
    )
}

export default PriceDetails;