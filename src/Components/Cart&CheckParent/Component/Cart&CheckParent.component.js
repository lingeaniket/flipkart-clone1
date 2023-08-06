import { Outlet } from "react-router-dom";
import PriceDetails from "../../PriceDetails/Component/PriceDetails.component";

import '../Styles/cart&CheckStyles.css'

const CartCheckParent = () => {

    return (
        <div className="disFlexJusConCen _cartCheck_001">
            <div className="_cartCheck_002">
                <Outlet />
                <div className="_cartCheck_003">
                    <PriceDetails />
                </div>
            </div >
        </div >
    )
}

export default CartCheckParent;