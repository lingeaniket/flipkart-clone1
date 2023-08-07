const OrderRewards = ({selectedOrder}) => {
    return (
        <div className="_order_002 w-1-1 _order_030">
            <div className='_order_003 w-1-2'>
                <div className='_order_016'>
                    <div className="_order_017 _order_013">Delivery Address</div>
                    <div className="_order_018">
                        <div className="flexSpaceBetCen">
                            <div className="_order_020">{selectedOrder.order_details.address.name}</div>
                        </div>
                        <div className="_order_014 w-3-4">
                            <span className="_check_009">{selectedOrder.order_details.address.address},</span>
                            <span className="_check_009">{selectedOrder.order_details.address.locality},</span>
                            <span className="_check_009">{selectedOrder.order_details.address.area} -</span>
                            <span className="_check_009">{selectedOrder.order_details.address.pincode},</span>
                            <span className="_check_009">{selectedOrder.order_details.address.state} </span>
                        </div>
                        <div className="_order_014 flexSpaceBetCen">
                            <div>
                                <span className="_order_020">Phone Number</span>
                                <div className="_order_023">{selectedOrder.order_details.address.phone}</div>
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
                        <div>{(selectedOrder.order_details.price_details.price * 2).toFixed(0)} SuperCoins Cashback</div>
                        <div className="_order_029">Use it to save on your next order</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderRewards