import { useSelector } from "react-redux";
import { useSearchParams, Outlet } from "react-router-dom";

import './Styles/cart&CheckStyles.css'
import PriceDetails from "./Components/PriceDetails/PriceDetails.component";

const CartCheckParent = () => {
    const [searchParams] = useSearchParams();
    const item_id = searchParams.get('item-id');
    const cart = useSelector(state => state.cartState.cartItems);

    return (
        <div className="disFlexJusConCen _cartCheck_001">
            <div className="_cartCheck_002">
                <Outlet />
                {(cart.length > 0 || item_id)
                    &&
                    <div className="_cartCheck_003"><PriceDetails /></div>
                }
            </div >
        </div >
    )
}

export default CartCheckParent;