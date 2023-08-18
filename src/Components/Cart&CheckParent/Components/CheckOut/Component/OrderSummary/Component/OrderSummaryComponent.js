import { useSelector } from "react-redux";

import CartElement from "../../../../../../Cart&CheckParent/Components/Cart/Component/cartElementComponent";

const OrderSummaryComponent = ({ orderProducts, item_id, setSelectedStep }) => {
    const userData = useSelector(state => state.userState.userData);

    return (
        <div className="_check_013">
            <div className="_check_044">
                <div className="_check_045">
                    {orderProducts.map((product) =>
                        <div className="_check_046">
                            <CartElement type="checkout" method={`${item_id ? 'single' : 'cart'}`} item={product} />
                        </div>
                    )}
                </div>
                <div className="_check_047">
                    <span className="_check_048">
                        Order confirmation email will be sent to
                        <span className="_check_049">{userData.email}</span>
                    </span>
                    <span>
                        <button className="_check_050" onClick={() => {
                            setSelectedStep(4)
                        }}>Continue</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryComponent;