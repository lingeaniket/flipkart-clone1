import { Button, Paper } from "@mui/material";
import '../Styles/cartStyles.css'
import { useEffect, useState } from "react";
import { checkoutInProgress } from '../../Features/User/orderDetailsSlice';
import ContentLoader from '../../Loader/contentLoader.component';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CartElement from "../../CartElement/Component/cartElement";
// import PriceDetails from "./priceDetailsComponent";

const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([])
    const [saveLaterProducts, setSaveLaterProducts] = useState([])

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const cart = useSelector(state => state.cartState.cartItems);
    const savelater = useSelector(state => state.cartState.saveLaterItems);

    // const [totalPrice, setTotalPrice] = useState(0);
    // useLayoutEffect(() => {
    //   setTotalPrice(totalPrice =>
    //     (Math.round((
    //       cart.reduce((accum, value) => {
    //         return accum + Number(value.value.price) * Number(value.quantity);
    //       }, 0)
    //     ) * 1000) / 1000).toFixed(2)
    //   );
    //   setTimeout(() => {
    //     setLoader(false);
    //   }, 1000);
    //   // eslint-disable-next-line
    // }, [cart])
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
            // setLoaded(true)
        };

        fetchDataForAllKeywords();
    }, [cart, savelater])
    return (
        <>{loader
            ?
            <ContentLoader />
            :
            null
        }
            {!loader
                ?
                <>
                    {(cart.length !== 0 || savelater.length !== 0)
                        &&
                        <Paper className="cartMainPaper" sx={{ backgroundColor: 'transparent' }} elevation={0}>
                            {cart.length !== 0
                                ?
                                <Paper elevation={1} style={{ backgroundColor: 'transparent' }}>
                                    <Paper sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }} elevation={0}>
                                        <div className="disFlexJusConCen titleAddressDiv">
                                            <div>
                                                <div>Deliver To</div>
                                                <div>Full address</div>
                                            </div>
                                            <div>
                                                <Button className="addressChangeButton">Change</Button>
                                            </div>
                                        </div>
                                    </Paper>
                                    {cartProducts.map((item) =>
                                        <Paper square elevation={0} key={item.product.id}>
                                            <CartElement type="cart" item={item} />
                                        </Paper>
                                    )}
                                    <Paper square elevation={0} className="placeOrderPaper">
                                        <div>
                                            <button onClick={() => {
                                                dispatch(checkoutInProgress());
                                                navigate('/checkout');
                                            }}>Place order</button>
                                        </div>
                                    </Paper>
                                </Paper>
                                :
                                <div className='disFlexJusConEven emptyCartDiv' >
                                    Sorry! No Items In the Cart
                                    <div>
                                        <Button onClick={() => {
                                            navigate('/home')
                                        }}>Start Shopping</Button>
                                    </div>
                                </div>
                            }
                            {savelater.length > 0 &&
                                <Paper className="saveLaterPaper" elevation={1} square>
                                    <div className="disFlexAlignItCen">
                                        <div> Saved For Later ({savelater.length})</div>
                                    </div>
                                    <div>
                                        {saveLaterProducts.map((item) =>
                                            <CartElement type="saveLater" item={item} />
                                        )}
                                    </div>
                                </Paper>
                            }
                        </Paper>
                    }
                </>
                :
                null
            }
        </>
    )
}

export default CartPage;