import PaymentDetails from "./PaymentDetails"

const OrderRewards = ({ selectedOrder }) => {
    return (
        <div className="_order_002 w-1-1 _order_030">
            <div className='_order_003 w-1-2'>
                <div className='_order_016'>
                    <div className="_order_017 _order_013">Delivery Address</div>
                    <div className="_order_018">
                        <div className="flexSpaceBetCen">
                            <div className="_order_020">{selectedOrder.order_details.address.name}</div>
                        </div>
                        <div className="_order_014 _order_015 w-3-4">
                            {selectedOrder.order_details.address.address}, {selectedOrder.order_details.address.locality}, {selectedOrder.order_details.address.area} - {selectedOrder.order_details.address.pincode}, {selectedOrder.order_details.address.state}
                        </div>
                        <div className="_order_014 _order_015 flexSpaceBetCen">
                            <div>
                                <span className="_order_020">Phone Number</span>
                                <div className="_order_023">{selectedOrder.order_details.address.phone}</div>
                            </div>
                        </div>
                        <div className="_order_014 _order_015 flexSpaceBetCen">
                            <div>
                                <span className="_order_020">Payment Method</span>
                                <div className="_order_023">{selectedOrder.order_details.payment_method}</div>
                            </div>
                        </div>
                        {selectedOrder.order_details.data
                            &&
                            <PaymentDetails order={selectedOrder.order_details}/>
                        }
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
                        <div>{(selectedOrder.order_details.price_details.price * 2 / 50).toFixed(0)} Super Coins Cashback</div>
                        <div className="_order_029">Use it to save on your next order</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderRewards