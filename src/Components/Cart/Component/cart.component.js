import axios from 'axios';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import '../Styles/cartStyles.css'
import CartElement from "../../CartElement/Component/cartElement";
import { checkoutInProgress } from '../../Features/User/orderDetailsSlice';

import { Button, Paper, Skeleton } from "@mui/material";
import PriceDetails from '../../PriceDetails/Component/PriceDetails.component';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);
    const [cartProducts, setCartProducts] = useState([])
    const [saveLaterProducts, setSaveLaterProducts] = useState([])

    const cart = useSelector(state => state.cartState.cartItems);
    const savelater = useSelector(state => state.cartState.saveLaterItems);

    const fetchDataForKeyword = async (id, quantity) => {
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
        const fetchDataForAllKeywords = async () => {
            const cartPromises = cart.map((item) => fetchDataForKeyword(item.id, item.quantity));
            const saveLaterPromises = savelater.map((item) => fetchDataForKeyword(item.id, item.quantity));

            const cartData = await Promise.all(cartPromises);
            const saveLaterData = await Promise.all(saveLaterPromises);

            setCartProducts(cartData.filter((item) => item !== null));
            setSaveLaterProducts(saveLaterData.filter((item) => item !== null));
            setTimeout(() => {
                setLoader(false);
            }, 1000);
        };

        fetchDataForAllKeywords();

    }, [cart, savelater])

    return (
        <>
            <Paper className="cartMainPaper" sx={{ backgroundColor: 'transparent' }} elevation={0}>
                {(cart.length !== 0)
                    ?
                    (
                        <Paper elevation={1} style={{ backgroundColor: 'transparent' }}>
                            {/* <Paper sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }} elevation={0}>
                                <div className="disFlexJusConCen titleAddressDiv">
                                    <div>
                                        <div>Deliver To</div>
                                        <div>Full address</div>
                                    </div>
                                    <div>
                                        <Button className="addressChangeButton">Change</Button>
                                    </div>
                                </div>
                            </Paper> */}
                            {loader
                                ?
                                (
                                    <>
                                        {cart.map((item, idx) =>
                                            <Skeleton key={idx} variant="rectangular" animation="wave" width={'100%'} height={'203px'} sx={{ backgroundColor: 'white', borderTop: '1px solid #f0f0f0' }} />
                                        )}
                                    </>
                                )
                                :
                                (
                                    <>
                                        {cartProducts.map((item) =>
                                            <Paper square elevation={0} key={item.product.id}>
                                                <CartElement type="cart" method="cart" item={item} />
                                            </Paper>
                                        )}
                                    </>
                                )
                            }
                            <Paper square elevation={0} className="placeOrderPaper innerPlaceOrder">
                                <div>
                                    <button onClick={() => {
                                        dispatch(checkoutInProgress());
                                        navigate('/checkout');
                                    }}>Place order</button>
                                </div>
                            </Paper>
                        </Paper>
                    )
                    :
                    (
                        <div className='disFlexJusConEven emptyCartDiv' >
                            Sorry! No Items In the Cart
                            <div>
                                <Button onClick={() => {
                                    navigate('/home')
                                }}>Start Shopping</Button>
                            </div>
                        </div>
                    )
                }
                {(savelater.length > 0)
                    &&
                    (
                        <Paper className="saveLaterPaper" elevation={1} square>
                            <div className="disFlexAlignItCen">
                                <div> Saved For Later ({savelater.length})</div>
                            </div>
                            <div>
                                {loader
                                    ?
                                    (
                                        <>
                                            {savelater.map((item, index) =>
                                                <Skeleton key={index} variant="rectangular" animation="wave" width={'100%'} height={'203px'} sx={{ backgroundColor: 'white', borderTop: '1px solid #f0f0f0' }} />
                                            )}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {saveLaterProducts.map((item) =>
                                                <CartElement type="saveLater" method="cart" item={item} />
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </Paper>
                    )
                }
                <div className='_cart_001'>
                    <PriceDetails />
                </div>
                {cart.length !== 0
                    &&
                    <Paper square elevation={0} className="placeOrderPaper outerPlaceOrder">
                        <div>
                            <button onClick={() => {
                                dispatch(checkoutInProgress());
                                navigate('/checkout');
                            }}>Place order</button>
                        </div>
                    </Paper>
                }
            </Paper>

        </>
    )
}

export default CartPage;