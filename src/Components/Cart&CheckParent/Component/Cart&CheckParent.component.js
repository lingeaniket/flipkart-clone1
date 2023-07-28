import { Outlet } from "react-router-dom";
import PriceDetails from "../../PriceDetails/Component/PriceDetails.component";

const CartCheckParent = () => {

    return (
        <div className="disFlexJusConCen" style={{ paddingTop: '15px' }}>
            <div className="disFlexJusConCen" style={{ width: '80%', maxWidth: '1600px' }}>
                <Outlet />
                <PriceDetails />
            </div >
        </div >
    )
}

export default CartCheckParent;