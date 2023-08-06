const PaymentComponent = ({selectedPayment, handleCheckout}) => {
    return (
        <div className="_check_013">
            <div className="_check_044">
                <label className="_check_015" htmlFor="1258" style={{
                    // if selected
                    backgroundColor: '#f5faff'
                }}>
                    <div>
                        <input type="radio" id="1258" name="address" checked={selectedPayment === 0} />
                    </div>
                    <div className="_check_016">
                        <div className="_check_017">
                            <div className="_check_051">
                                <p className="_check_019">
                                    <span className="_check_020">Cash on Delivery</span>
                                </p>
                                <div className="_check_052">
                                    <div className="_check_053">
                                        <div className="_check_054">
                                            Due to handling costs, a nominal fee of $0.1
                                            will be charged for orders placed using this
                                            option. Avoid this fee by paying online now.
                                        </div>
                                    </div>
                                    <div>
                                        <button className="_check_025" onClick={handleCheckout}>Confirm Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default PaymentComponent;