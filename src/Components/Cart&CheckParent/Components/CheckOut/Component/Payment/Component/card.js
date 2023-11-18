import { useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";

import OrderConfirmation from "../../confirmationDialogue";

import { handleCardNumber, handleMMChange, handleYYChange, splitStringIntoChunks } from "../../../../../Functions/paymentFunctions";

import { FormControl, MenuItem, Select, TextField } from "@mui/material";

const Card = ({ id, handleCheckout }) => {
    const orderPrice = useSelector((state) => state.orderDetailsState.orderPrice);

    const [data, setData] = useState({
        cvv: "",
        year: "YY",
        month: "MM",
        cardNumber: "",
        cardIssuer: "",
    });

    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    const [cardError, setCardError] = useState(true);
    const [monthError, setMonthError] = useState(true);

    const handleCardPayment = () => {
        setOpen(true);

        setTimeout(() => {
            setConfirmed(true);
        }, 5000);

        setTimeout(() => {
            setOpen(false);
            handleCheckout("card", { cardNumber: data.cardNumber, month: data.month, year: data.year, cardIssuer: data.cardIssuer });
        }, 8000);
    };

    const handleMonth = (event) => {
        setData((prev) => {
            return { ...prev, month: event.target.value };
        });
        handleMMChange(event.target.value, data.year, setMonthError);
    };

    const handleYear = (event) => {
        setData((prev) => {
            return { ...prev, year: event.target.value };
        });
        handleYYChange(event.target.value, data.month, setMonthError);
    };

    const handleDisabled = () => {
        const errors =
            cardError && data.cardNumber.length > 0 && monthError && data.month !== "MM" && data.year !== "YY" && data.cvv.length === 3;
        setDisabled(!errors);
    };

    const handleCVV = (event) => {
        if (Number(event.target.value) || event.target.value.length === 0) {
            setData((prev) => {
                return { ...prev, cvv: event.target.value };
            });
        }
    };

    const handleCard = (event) => {
        setData((prev) => {
            return { ...prev, cardNumber: event.target.value.replaceAll(" - ", "") };
        });
        handleCardNumber(event.target.value, setData, setCardError);
    };

    useEffect(() => {
        handleDisabled();
        // eslint-disable-next-line
    }, [cardError, monthError, data.cardNumber, data.cvv, month, year]);

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
                        value={splitStringIntoChunks(data.cardNumber).join(" - ")}
                        onChange={handleCard}
                        placeholder="Enter Card Number"
                        error={!cardError}
                        focused
                        label={!cardError ? "Error" : ""}
                    />
                    <span style={{ marginLeft: "10px", fontWeight: "500" }}>{data.cardIssuer}</span>
                </div>
                <div className="_payment_011">
                    <span>Valid thru</span>
                    <span className="_payment_012">
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={data.month} onChange={handleMonth} error={!monthError}>
                                    <MenuItem value="MM">MM</MenuItem>
                                    {Array.from({ length: 12 }).map((value, index) => (
                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="_payment_013">
                            <FormControl size="small">
                                <Select value={data.year} onChange={handleYear}>
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
                            value={data.cvv}
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

export default memo(Card);
