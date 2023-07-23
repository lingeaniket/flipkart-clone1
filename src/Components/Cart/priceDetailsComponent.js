import { Paper } from "@mui/material";
import './priceDetailsStyles.css'

const PriceDetails = () => {
    return (
        <Paper className="priceDetailsMain" sx={{ backgroundColor: 'transparent' }} elevation={0} square>
            <div>
                <div className="priceDetail">
                    <div>
                        <span>Price details</span>
                        <div className="priceDetailDiv">
                            <div className="disFlexJusConBet priceDetailsItem">
                                <div>
                                    <div className="disFlexAlignItCen">Price 2 items</div>
                                </div>
                                <div>$125845</div>
                            </div>
                            <div className="disFlexJusConBet priceDetailsItem greenDetail">
                                <div>
                                    <div className="disFlexAlignItCen">Discount</div>
                                </div>
                                <div>-4522</div>
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
                                    <div>458985</div>
                                </div>
                            </div>
                            <div className="disFlexJusConBet">You will save ₹36,500 on this order</div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default PriceDetails;