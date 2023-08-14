import { FormControl, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { validateCard } from "../Functions/paymentFunctions";
import OrderConfirmation from "../../confirmationDialogue";

const Card = ({ id, selectedPayment, handleCheckout }) => {
    const [month, setMonth] = useState('MM');
    const [year, setYear] = useState('YY');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('')
    const [cardError, setCardError] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [monthError, setMonthError] = useState(true);
    const [cardIssuer, setCardIssuer] = useState('');
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleCardPayment = () => {
        setOpen(true);
        setTimeout(() => {
            setConfirmed(true)
        }, 5000)
        setTimeout(() => {
            setOpen(false);
            handleCheckout('card', { cardNumber, month, year, cvv })
        }, 8000)
    }

    const handleDisabled = () => {
        const errors = (cardError && cardNumber.length > 0 && monthError && month !== 'MM' && year !== 'YY' && cvv.length === 3)
        setDisabled(!errors)
    }

    const handleCVV = (event) => {
        if (Number(event.target.value) || event.target.value.length === 0) {
            setCVV(event.target.value)
        }
    }

    const handleMMChange = (event) => {
        setMonth(event.target.value);
        if (Number(year)) {
            if (Number(year) === (new Date().getFullYear() - 2000)) {
                if (Number(event.target.value)) {
                    if (Number(event.target.value) < (new Date().getMonth() + 1)) {
                        setMonthError(false);
                    } else {
                        setMonthError(true)
                    }
                } else {
                    setMonthError(true);
                }
            } else {
                setMonthError(true);
            }
        } else {
            setMonthError(true);
        }
    };

    const handleCardNumber = (event) => {
        setCardNumber(event.target.value.replaceAll(' - ', ''));
        if (event.target.value.trim().length > 0) {
            const data = validateCard(event.target.value.replaceAll(' - ', ''));
            setCardError(data.valid);
            setCardIssuer(data.issuer);
        } else {
            setCardError(true);
            setCardIssuer('')
        }
    }

    const handleYYChange = (event) => {
        setYear(event.target.value);
        if (Number(event.target.value)) {
            if (Number(event.target.value) === (new Date().getFullYear() - 2000)) {
                if (Number(month)) {
                    if (Number(month) < (new Date().getMonth() + 1)) {
                        setMonthError(false);
                    } else {
                        setMonthError(true)
                    }
                } else {
                    setMonthError(true);
                }
            } else {
                setMonthError(true);
            }
        } else {
            setMonthError(true);
        }
    };
    const splitStringIntoChunks = (str) => {
        const chunks = [];
        for (let i = 0; i < str.length; i += 4) {
            chunks.push(str.substr(i, 4));
        }
        return chunks;
    };

    useEffect(() => {
        handleDisabled()
        // eslint-disable-next-line
    }, [cardError, monthError, cardNumber, cvv, month, year])

    return (
        <div>
            <div className="_payment_001">
                <div className="_payment_010" style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <TextField
                        type="text"
                        size="small"
                        sx={{ background: 'white' }}
                        value={splitStringIntoChunks(cardNumber).join(' - ')}
                        onChange={handleCardNumber}
                        placeholder="Enter Card Number"
                        error={!cardError}
                        focused
                        label={!cardError ? 'Error' : ''}
                    />
                    <span style={{ marginLeft: '10px', fontWeight: '500' }}>{cardIssuer}</span>
                </div>
                <div className="_payment_011">
                    <span>Valid thru</span>
                    <span className="_payment_012">
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={month} onChange={handleMMChange} error={!monthError}>
                                    <MenuItem value="MM">MM</MenuItem>
                                    {Array.from({ length: 12 }).map((value, index) =>
                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={year} onChange={handleYYChange} >
                                    <MenuItem value="YY">YY</MenuItem>
                                    {Array.from({ length: 50 }, (_, index) =>
                                        (Number(new Date().getFullYear().toString().slice(2, 4))) + index)
                                        .map((value) =>
                                            <MenuItem key={value} value={value}>{value}</MenuItem>
                                        )}
                                </Select>
                            </FormControl>
                        </div>
                    </span>
                </div>
                <div className="_payment_014">
                    <div className="_payment_015">
                        <TextField
                            type="password"
                            sx={{ height: 'inherit', background: 'white' }}
                            placeholder="CVV"
                            inputProps={{
                                maxLength: 3,
                                pattern: '[0-9]*'
                            }}
                            value={cvv}
                            onChange={handleCVV}
                        />
                    </div>
                </div>
                <div className="_payment_016">
                    <button disabled={
                        disabled
                    } className="_check_025" style={{
                        background: `${(!disabled) ? '#fb641b' : 'grey'}`
                    }}
                        onClick={handleCardPayment}
                    >Pay Amount</button>
                </div>
            </div>
            <OrderConfirmation open={open} confirmed={confirmed} />
        </div>
    )
}

export default Card;