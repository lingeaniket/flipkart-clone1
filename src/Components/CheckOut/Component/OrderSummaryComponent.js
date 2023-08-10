import CartElement from "../../CartElement/Component/cartElement";

const OrderSummaryComponent = ({orderProducts, item_id, setSelectedStep}) => {
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
                    {/* <span className="_check_048">
                        Order confirmation email will be sent to
                        <span className="_check_049">linge.aniket.10@gmail.com</span>
                    </span> */}
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