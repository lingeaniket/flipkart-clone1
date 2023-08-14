import { useEffect, useState } from "react"

import '../../../Styles/payment.css'

import UPI from "./UPI"
import Card from "./card"
import NetBanking from "./netBanking"
import LoadingStep from "../../loadingSteps"
import CashOnDelivery from "./cashOnDelivery"

import { Skeleton } from "@mui/material"

const PaymentComponent = (props) => {
    const {
        bank: { selectedBank, setSelectedBank, radioBank, setRadioBank },
        upi: { upiMethod, setUpiMethod },
        payment: { selectedPayment, setSelectedPayment },
        handleCheckout,
        id
    } = props

    const [firstLoad, setFirstLoad] = useState(true);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setFirstLoad(false);
            setLoader(false)
        }, 2000)

        return () => {
            setLoader(true)
        }

    }, [selectedPayment])

    return (
        <div className="_check_013">
            <div className="_check_044" style={{
                position: 'relative'
            }}>
                {firstLoad
                    ?
                    <div style={{
                        position: 'relative'
                    }}>
                        {Array.from({ length: 4 }).fill(1).map((value, index) =>
                            <div key={value + index} style={{
                                paddingLeft: '15px',
                                backgroundColor: 'white',
                                borderBottom: '1px solid #f0f0f080'
                            }}>
                                <Skeleton variant="rectangle" animation="wave" sx={{ backgroundColor: 'white', }} height={40} />
                            </div>
                        )}
                        <LoadingStep />
                    </div>
                    :
                    <>
                        <label className="_check_015" htmlFor={`12581-${id}`} style={{
                            backgroundColor: `${selectedPayment === 1 ? '#f5faff' : 'white'}`
                        }}>
                            <div>
                                <input type="radio" id={`12581-${id}`} name={`payment-${id}`} checked={selectedPayment === 1} onChange={() => {
                                    setSelectedPayment(() => 1)
                                }} />
                            </div>
                            <div className="_check_016">
                                <div className="_check_017">
                                    <div className="_check_051">
                                        <p className="_check_019">
                                            <span className="_check_020">UPI</span>
                                        </p>
                                        <>
                                            {!loader
                                                &&
                                                <>
                                                    {(selectedPayment === 1)
                                                        &&
                                                        <UPI id={id} upiMethod={upiMethod}
                                                            setUpiMethod={setUpiMethod}
                                                            selectedPayment={selectedPayment} handleCheckout={handleCheckout} />
                                                    }
                                                </>
                                            }
                                        </>
                                    </div>
                                </div>
                            </div>
                        </label>
                        <label className="_check_015" htmlFor={`12582-${id}`} style={{
                            backgroundColor: `${selectedPayment === 2 ? '#f5faff' : 'white'}`
                        }}>
                            <div>
                                <input type="radio" id={`12582-${id}`} name={`payment-${id}`} checked={selectedPayment === 2} onChange={() => {
                                    setSelectedPayment(() => 2)
                                }} />
                            </div>
                            <div className="_check_016">
                                <div className="_check_017">
                                    <div className="_check_051">
                                        <p className="_check_019">
                                            <span className="_check_020">Credit/Debit/ATM Card</span>
                                        </p>
                                        {!loader
                                            &&
                                            ((selectedPayment === 2)
                                                &&
                                                <Card id={id} selectedPayment={selectedPayment} handleCheckout={handleCheckout} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </label>
                        <label className="_check_015" htmlFor={`12583-${id}`} style={{
                            backgroundColor: `${selectedPayment === 3 ? '#f5faff' : 'white'}`
                        }}>
                            <div>
                                <input type="radio" id={`12583-${id}`} name={`payment-${id}`} checked={selectedPayment === 3} onChange={() => {
                                    setSelectedPayment(() => 3)
                                }} />
                            </div>
                            <div className="_check_016">
                                <div className="_check_017">
                                    <div className="_check_051">
                                        <p className="_check_019">
                                            <span className="_check_020">Net Banking</span>
                                        </p>
                                        {!loader
                                            &&
                                            ((selectedPayment === 3)
                                                &&
                                                <NetBanking
                                                    radioBank={radioBank}
                                                    setRadioBank={setRadioBank}
                                                    selectedBank={selectedBank}
                                                    setSelectedBank={setSelectedBank}
                                                    id={id}
                                                    selectedPayment={selectedPayment}
                                                    handleCheckout={handleCheckout}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </label>
                        <label className="_check_015" htmlFor={`12580-${id}`} style={{
                            backgroundColor: `${selectedPayment === 0 ? '#f5faff' : 'white'}`
                        }}>
                            <div>
                                <input type="radio" id={`12580-${id}`} name={`payment-${id}`} checked={selectedPayment === 0} onChange={() => {
                                    setSelectedPayment(() => 0)
                                }} />
                            </div>
                            <div className="_check_016">
                                <div className="_check_017">
                                    <div className="_check_051">
                                        <p className="_check_019">
                                            <span className="_check_020">Cash on Delivery</span>
                                        </p>
                                        {!loader
                                            &&
                                            ((selectedPayment === 0)
                                                &&
                                                <CashOnDelivery id={id} selectedPayment={selectedPayment} handleCheckout={handleCheckout} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </label>
                        {loader
                            &&
                            <LoadingStep />
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default PaymentComponent;