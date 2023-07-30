import { useEffect } from "react";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import './Styles/orderListStyles.css'
import { Button } from "@mui/material";

const OrderDetails = ({ method }) => {
    useEffect(() => {

    }, [method])

    return (
        <div className="_order_001">
            {
                method === 'postCheckout'
                &&
                <div className="_order_002 w-1-1 _order_030" style={{
                    justifyContent: 'space-between'
                }}>
                    <div className="_order_003 w-2-3">
                        <div className="disFlexAlignItCen">
                            <div>
                                <div className="_order_006">
                                    <img className="_order_007"
                                        src="https://img.freepik.com/free-vector/couple-winning-prize-man-woman-holding-gift-box-flat-vector-illustration-lottery-present-birthday-party_74855-8307.jpg?t=st=1690709872~exp=1690710472~hmac=34bc133f2af958ac4a8c6b759ea931fd1d1cbeadc3e5ff82e99b6e72917f078f"
                                        alt="" />
                                </div>
                            </div>
                            <div className="_order_008">
                                <div className="_order_009">Order placed for $ 9,805!</div>
                                <div>
                                    <span>Your 3 items will be delivered by </span>
                                    <span className="_order_010">Tue, Aug 1st '23.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_order_003 w-1-3">
                        <div className="disFlexJusConBet">
                            <div className="_order_012">
                                <div>
                                    <div className="_order_013">Why call? Just click!</div>
                                    <div>Easily track your Flipkart orders!</div>
                                </div>
                                <div className="_order_014" >
                                    <Button variant="contained" color="primary">Go to My Orders</Button>
                                </div>
                            </div>
                            <div className="flexCenCen" >
                                <CardGiftcardIcon sx={{
                                    fontSize: '70px'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="_order_002 w-1-1 _order_030">
                <div className='_order_003 w-1-2'>
                    <div className='_order_016'>
                        <div className="_order_017 _order_013">Delivery Address</div>
                        <div className="_order_018">
                            <div className="flexSpaceBetCen">
                                <div className="_order_020">Aniket Linge</div>
                            </div>
                            <div className="_order_014 w-3-4">
                                Boys Hostel Near Baramati Bank, Nityanand Society,
                                Balaji Nagar Dhankawadi,  Pune - 411043, Maharashtra
                            </div>
                            <div className="_order_014 flexSpaceBetCen">
                                <div>
                                    <span className="_order_020">Phone Number</span>
                                    <div className="_order_023">7030325245</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_order_024 _order_003 w-1-2 _order_016">
                    <span className="_order_013">Your Rewards</span>
                    <div className="_order_026">
                        <img
                            src="https://rukminim1.flixcart.com/www/80/80/promos/15/07/2022/b24f2613-b89e-4e0a-8140-1316ad11f394.png?q=100"
                            alt=""
                            className="_order_027"
                        />
                        <div className="_order_028">
                            <div>16 SuperCoins Cashback</div>
                            <div className="_order_029">Use it to save on your next order</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_order_030">
                <div className="_order_031 _order_003">
                    <div className="_order_032 w-2-5">
                        <div className="flexCenCen w-1-3">
                            <div className="_order_006">
                                <img className="_order_035"
                                    src="https://rukminim2.flixcart.com/image/l3bx5e80/pendrive/o/t/l/-original-imagegvzrmuhzsws.jpeg"
                                    alt="product"
                                />
                            </div>
                        </div>
                        <div className="w-2-3">
                            <div>
                                <div className="_order_036">Product name</div>
                                <div className="_order_037">Description</div>
                                <div className="_order_038"></div>
                            </div>
                        </div>
                    </div>
                    <div className="_order_039 w-3-5">
                        <div className="disFlexJusConCen">
                            <div className="_order_041 w-1-4">
                                <div className="_order_042">Order Confirmed</div>
                                <div className="_order_043 flexCenCen">
                                    <div className="_order_044"></div>
                                    <div className="_order_045"></div>
                                    <div className="_order_046"></div>
                                </div>
                                <div className="_order_047">Tue, 20th Sep</div>
                            </div>
                            <div className="_order_041 w-1-4">
                                <div className="_order_042">Shipped</div>
                                <div className="_order_043 flexCenCen">
                                    <div className="_order_046"></div>
                                    <div className="_order_045"></div>
                                    <div className="_order_046"></div>
                                </div>
                                <div className="_order_047">Tue, 20th Sep</div>
                            </div>
                            <div className="_order_041 w-1-4">
                                <div className="_order_042">Out For Delivery</div>
                                <div className="_order_043 flexCenCen">
                                    <div className="_order_046"></div>
                                    <div className="_order_045"></div>
                                    <div className="_order_046"></div>
                                </div>
                                <div className="_order_047">Tue, 20th Sep</div>
                            </div>
                            <div className="_order_041 w-1-4">
                                <div className="_order_042">Delivered</div>
                                <div className="_order_043 flexCenCen">
                                    <div className="_order_046"></div>
                                    <div className="_order_045"></div>
                                    <div className="_order_044"></div>
                                </div>
                                <div className="_order_047">Tue, 20th Sep</div>
                            </div>
                        </div>
                        <div className="_order_069 w-3-4">
                            <div className="_order_070 w-1-1">
                                <div className="_order_071">
                                    <div className="_order_072">Your item is out for delivery</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_order_030">
                <div className="_order_074 _order_013">Other Items in this order</div>
                <div className="_order_075 w-1-1">
                    <div className="_order_002 w-1-1">
                        <div className="w-1-2">
                            <div className="_order_002 w-1-1">
                                <div className="disFlexJusConCen w-1-4">
                                    <div className="_order_078">
                                        <img className="_order_079"
                                            src="https://rukminim2.flixcart.com/image/xif0q/cooling-pad/v/b/a/-original-imagnpgztxgzpqng.jpeg"
                                            alt="" />
                                    </div>
                                </div>
                                <div className="w-2-3">
                                    <div>
                                        <span className="_order_080 w-1-1">Title of product</span>
                                        <div className="_order_037">Description</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="_order_082 w-1-6">Price</div>
                        <div className="_order_083 w-1-3">
                            <div>
                                <div className="_order_084 _order_016"></div>
                                <span className="_order_085">Delivered on ....</span>
                                <div className="_order_086">Yyour order is delivred on</div>
                            </div>
                        </div>
                    </div>

                    {/* if refunded */}
                    <div className="_order_087">
                        <div className="_order_088">
                            <span className="_order_089">Refund Completed</span>
                            <span className="_order_090 _order_037">(Refund Id 458442541)</span>
                        </div>
                        <div className="_order_091">
                            <ul>
                                <li className="_order_092">
                                    <span>₹690.0 has been refunded to your Flipkart Pay Later  on Apr 05 </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;