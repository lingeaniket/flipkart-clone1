import { useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";

import LoadingStep from "../../loadingSteps";
import OrderConfirmation from "../../confirmationDialogue";

import { BankOptions, BankRadio } from "../../../../../Functions/chechoutFunctions";

import { FormControl, MenuItem, Select } from "@mui/material";

const NetBanking = ({ id, handleCheckout, setSelectedBank, selectedBank, setRadioBank, radioBank }) => {
    const orderPrice = useSelector((state) => state.orderDetailsState.orderPrice);

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleBankPayment = () => {
        setOpen(true);
        setTimeout(() => {
            setConfirmed(true);
        }, 5000);
        setTimeout(() => {
            setOpen(false);
            handleCheckout("netBanking", {
                bankName: `${radioBank > -1 ? BankRadio[0].bankName : selectedBank}`,
            });
        }, 8000);
    };

    const handleSelectBank = (event) => {
        setSelectedBank(event.target.value);
        setRadioBank(-1);
    };

    const handleRadioBank = (index) => {
        setSelectedBank("");
        setRadioBank(index);
    };

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, [radioBank, selectedBank]);

    return (
        <div>
            <h6 className="_payment_001">Popular Banks</h6>
            <div>
                {BankRadio.map((value, index) => (
                    <label key={value.value + index} htmlFor={`bank_00${value.value}_${id}`} className="_payment_017">
                        <div className="_payment_003">
                            <input
                                type="radio"
                                name={`bank_00_${id}_net`}
                                id={`bank_00${value.value}_${id}`}
                                checked={radioBank === index}
                                onChange={() => {
                                    handleRadioBank(index);
                                }}
                            />
                        </div>
                        <div className="_payment_013">
                            <div>
                                <div className="_payment_005" style={{ fontSize: "13px" }}>
                                    {value.bankName}
                                </div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            <h6 className="_payment_001">Other Banks</h6>
            <div className="_payment_018">
                <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
                    <Select value={selectedBank} onChange={handleSelectBank} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                        <MenuItem value="">
                            <em>-- Select Bank --</em>
                        </MenuItem>
                        {BankOptions.map((value, index) => (
                            <MenuItem key={value.value + index} value={value.value}>
                                {value.bankName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="_payment_006">
                <button
                    disabled={radioBank === -1 && selectedBank === ""}
                    className="_check_025"
                    style={{
                        background: `${!(radioBank === -1 && selectedBank === "") ? "#fb641b" : "grey"}`,
                    }}
                    onClick={handleBankPayment}
                >
                    Pay Amount $ {orderPrice.price}
                </button>
            </div>
            <OrderConfirmation open={open} confirmed={confirmed} />
            {loader && <LoadingStep />}
        </div>
    );
};

export default memo(NetBanking);
