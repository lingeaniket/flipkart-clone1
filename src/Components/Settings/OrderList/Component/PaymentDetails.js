const PaymentDetails = ({ order }) => {
    return (
        <>
            <div className="_order_014 flexSpaceBetCen">
                <div>
                    <span className="_order_020">Transaction Details</span>
                    {order.payment_method === 'upi'
                        &&
                        (order.data.server === 'Phone Pe'
                            ?
                            <div className="_order_023">{order.data.server}</div>
                            :
                            <div className="_order_023">UPI Id : <b>{order.data.id}</b></div>
                        )
                    }
                    {order.payment_method === 'card'
                        &&
                        <>
                            <div className="_order_023">{order.data.cardIssuer}</div>
                            <div className="_order_023">*****{order.data.cardNumber.slice(-4)}</div>
                        </>
                    }
                    {order.payment_method === 'netBanking'
                        &&

                        <div className="_order_023">{order.data.bankName}</div>

                    }
                </div>
            </div>
        </>
    )
}

export default PaymentDetails