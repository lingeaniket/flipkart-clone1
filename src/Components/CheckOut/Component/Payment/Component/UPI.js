import { TextField } from "@mui/material"
import { verifyUpiId } from "../Functions/paymentFunctions";
import { useEffect, useState } from "react"
import OrderConfirmation from "../../confirmationDialogue";
import LoadingStep from "../../loadingSteps";

const UPI = ({ handleCheckout, id,upiMethod, setUpiMethod }) => {
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [confirmed, setConfirmed] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [upiVefified, setUpiVerified] = useState(false);
    const [error, setError] = useState(false);
    const handleUPIPayment = () => {
        setOpen(true);
        setTimeout(() => {
            setConfirmed(true);
        }, 5000)

        setTimeout(() => {
            setOpen(false);
            if (upiMethod === 1) {
                handleCheckout('upi', { server: 'Phone Pe' })
            } else {
                handleCheckout('upi', { server: 'Custom', id: upiId })
            }
        }, 8000)
    }

    const handleUPIMethod = (index) => {
        setUpiMethod(index)
    }

    const handleUpiId = (event) => {
        setUpiId(event.target.value.trim());
        setError(false);
    }

    useEffect(() => {
        if (upiMethod === 0) {
            setLoader(true);
            setTimeout(() => {
                setLoader(false)
            }, 2000)
        }

    }, [upiMethod])

    return (
        <div>
            <h6 className="_payment_001">Choose an option</h6>
            <label htmlFor={`upi_01_${id}`} className="_payment_002">
                <div className="_payment_003">
                    <input
                        type="radio"
                        name={`upi-${id}-upiId`}
                        id={`upi_01_${id}`}
                        checked={upiMethod === 0}
                        onChange={() => { handleUPIMethod(0) }}
                    />
                </div>
                <div className="_payment_004">
                    <div>
                        <div className="_payment_005">Phone Pe</div>
                        {upiMethod === 0
                            &&
                            <div className="_payment_006">
                                <button className="_check_025" onClick={handleUPIPayment}>Pay Amount</button>
                            </div>
                        }
                    </div>
                </div>
            </label>
            <label htmlFor={`upi_02_${id}`} style={{ cursor: 'auto', display: 'block', marginTop: '16px' }}>
                <div className="_payment_003">
                    <input
                        type="radio"
                        name={`upi-${id}-upiId`}
                        id={`upi_02_${id}`}
                        checked={upiMethod === 1}
                        onChange={() => { handleUPIMethod(1) }}
                    />
                </div>
                <div className="_payment_004">
                    <div>
                        <div className="_payment_005">Your UPI ID</div>
                        {upiMethod === 1
                            &&
                            <div className="_payment_006">
                                <div className="_payment_007">
                                    <div className="_payment_008">
                                        <TextField
                                            required
                                            placeholder="Enter UPI ID"
                                            type="text"
                                            value={upiId}
                                            sx={{
                                                outline: 'none',
                                                background: 'white',
                                                borderRadius: '2px',
                                                border: '1px solid #f0f0f0'
                                            }}
                                            onChange={handleUpiId}
                                            error={error ? true : false}
                                        />
                                    </div>
                                    <div className="_payment_009" onClick={() => {
                                        verifyUpiId(upiId, setUpiVerified, setError);
                                    }}>Verify</div>
                                    {error &&
                                        <span style={{
                                            color: "#d32f2f",
                                            fontSize: '0.75em',
                                            marginLeft: '14px',
                                            fontWeight: 400,
                                            lineHeight: '1.6'
                                        }}
                                        >UPI ID is not valid</span>
                                    }
                                </div>
                                <button disabled={!upiVefified} className="_check_025" style={{
                                    marginTop: 0,
                                    background: `${upiVefified ? '#fb641b' : 'grey'}`
                                }}
                                    onClick={handleUPIPayment}
                                >Pay Amount</button>
                            </div>
                        }
                    </div>
                </div>
            </label>
            <OrderConfirmation open={open} confirmed={confirmed} />
            {
                loader
                &&
                <LoadingStep />
            }
        </div>
    )
}

export default UPI;