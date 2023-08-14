import { Outlet } from "react-router-dom";

import '../Styles/cart&CheckStyles.css'
import PriceDetails from "../../PriceDetails/Component/PriceDetails.component";

const CartCheckParent = () => {
    return (
        <div className="disFlexJusConCen _cartCheck_001">
            <div className="_cartCheck_002">
                <Outlet />
                <div className="_cartCheck_003"><PriceDetails /></div>
            </div >
        </div >
    )
}

export default CartCheckParent;