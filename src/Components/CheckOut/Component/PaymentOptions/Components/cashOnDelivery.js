import { useEffect, useState } from "react";
import OrderConfirmation from "../../confirmationDialogue";
import RefreshIcon from '@mui/icons-material/Refresh';
import { TextField } from "@mui/material";

const getText = () => {
    return Math.floor(Math.random() * 900) + 100;
}

const CashOnDelivery = ({ selectedPayment, handleCheckout }) => {
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [textVerify, setTextVerify] = useState(getText());
    const [error, setError] = useState(false);
    const [text, setText] = useState('');
    const handleInput = (event) => {
        setText(event.target.value);
        setError(false)
    }
    const handleRefreshText = () => {
        setTextVerify(getText());
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        if (Number(text) === textVerify) {
            setOpen(true);
            setTimeout(() => {
                setConfirmed(true)
            }, 5000)
            setTimeout(() => {
                setOpen(false);
                // handleCheckout('cod', null);
            }, 8000)
        } else if(text.length === 0){
            setError(false);
        } else {
            setError(true)
        }
    }
    useEffect(() => {

    }, [])
    return (
        <div className="_check_052">
            {selectedPayment === 0
                &&
                <form onSubmit={handleSubmit} style={{
                    display: 'inline-flex',
                    flexWrap: 'wrap'
                }}>
                    <div className="_payment_019">
                        <div className="_payment_020">
                            <div className="_payment_021">{textVerify}</div>
                            <div className="_payment_022" onClick={handleRefreshText}>
                                <RefreshIcon color="primary" fontSize="medium" />
                            </div>
                        </div>
                        <div className="_payment_023">
                            <div className="_payment_024" style={{
                                border: `${error ? '1px solid #d32f2f' : '1px solid #e0e0e0'}`
                            }}>
                                <TextField size="small" variant="standard" type="text" required sx={{
                                    fontSize: '14px',
                                    outline: 'none',
                                    border: 'none',
                                    backgroundColor: '#fff',
                                    height: '48px'

                                }}
                                focused
                                error={error}
                                    helperText={error ? 'Enter Correct Characters' : ''}
                                    value={text}
                                    onChange={handleInput}
                                    placeholder="Enter the Characters" />
                            </div>
                        </div>
                    </div>
                    <button className="_check_025" type="submit">Confirm Order</button>
                </form>
            }
            <OrderConfirmation open={open} confirmed={confirmed} />
        </div>
    )
}

export default CashOnDelivery;