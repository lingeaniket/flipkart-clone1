import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { handleCardNumber, handleMMChange, handleYYChange, splitStringIntoChunks } from "../../../../../Functions/paymentFunctions";
import OrderConfirmation from "../../confirmationDialogue";
import { useSelector } from "react-redux";

const Card = ({ id, selectedPayment, handleCheckout }) => {
    const orderPrice = useSelector((state) => state.orderDetailsState.orderPrice);

    const [cvv, setCVV] = useState("");
    const [year, setYear] = useState("YY");
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState("MM");
    const [disabled, setDisabled] = useState(true);
    const [cardError, setCardError] = useState(true);
    const [cardNumber, setCardNumber] = useState("");
    const [cardIssuer, setCardIssuer] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [monthError, setMonthError] = useState(true);

    const handleCardPayment = () => {
        setOpen(true);

        setTimeout(() => {
            setConfirmed(true);
        }, 5000);

        setTimeout(() => {
            setOpen(false);
            handleCheckout("card", { cardNumber, month, year, cardIssuer });
        }, 8000);
    };

    const handleMonth = (event) => {
        handleMMChange(event, year, setMonth, setMonthError);
    };

    const handleYear = (event) => {
        handleYYChange(event, month, setYear, setMonthError);
    };

    const handleDisabled = () => {
        const errors = cardError && cardNumber.length > 0 && monthError && month !== "MM" && year !== "YY" && cvv.length === 3;
        setDisabled(!errors);
    };

    const handleCVV = (event) => {
        if (Number(event.target.value) || event.target.value.length === 0) {
            setCVV(event.target.value);
        }
    };

    const handleCard = (event) => {
        handleCardNumber(event, setCardNumber, setCardIssuer, setCardError);
    };

    useEffect(() => {
        handleDisabled();
        // eslint-disable-next-line
    }, [cardError, monthError, cardNumber, cvv, month, year]);

    return (
        <div>
            <div className="_payment_001">
                <div
                    className="_payment_010"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        type="text"
                        size="small"
                        name={`card_payment01_${id}`}
                        sx={{ background: "white" }}
                        value={splitStringIntoChunks(cardNumber).join(" - ")}
                        onChange={handleCard}
                        placeholder="Enter Card Number"
                        error={!cardError}
                        focused
                        label={!cardError ? "Error" : ""}
                    />
                    <span style={{ marginLeft: "10px", fontWeight: "500" }}>{cardIssuer}</span>
                </div>
                <div className="_payment_011">
                    <span>Valid thru</span>
                    <span className="_payment_012">
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={month} onChange={handleMonth} error={!monthError}>
                                    <MenuItem value="MM">MM</MenuItem>
                                    {Array.from({ length: 12 }).map((value, index) => (
                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={year} onChange={handleYear}>
                                    <MenuItem value="YY">YY</MenuItem>
                                    {Array.from(
                                        { length: 50 },
                                        (_, index) => Number(new Date().getFullYear().toString().slice(2, 4)) + index
                                    ).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </span>
                </div>
                <div className="_payment_014">
                    <div className="_payment_015">
                        <TextField
                            type="password"
                            sx={{ height: "inherit", background: "white" }}
                            placeholder="CVV"
                            inputProps={{
                                maxLength: 3,
                                pattern: "[0-9]*",
                            }}
                            value={cvv}
                            onChange={handleCVV}
                        />
                    </div>
                </div>
                <div className="_payment_016">
                    <button
                        disabled={disabled}
                        className="_check_025"
                        style={{
                            background: `${!disabled ? "#fb641b" : "grey"}`,
                        }}
                        onClick={handleCardPayment}
                    >
                        Pay Amount $ {orderPrice.price}
                    </button>
                </div>
            </div>
            <OrderConfirmation open={open} confirmed={confirmed} />
        </div>
    );
};

export default Card;
