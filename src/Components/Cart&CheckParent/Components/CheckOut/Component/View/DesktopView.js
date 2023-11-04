import { useSearchParams } from "react-router-dom";

import LoginHeader from "../Login/Header/LoginHeader";
import AddressComponent from "../Address/AddressComponent";
import PaymentHeader from "../Payment/Header/PaymentHeader";
import AddressHeader from "../Address/Component/AddressHeader";
import LoginComponent from "../Login/Component/LoginComponent";
import PaymentComponent from "../Payment/Component/PaymentComponent";
import OrderSummaryHeader from "../OrderSummary/Header/OrderSummaryHeader";
import OrderSummaryComponent from "../OrderSummary/Component/OrderSummaryComponent";

import { Paper } from "@mui/material";

const DeskTopView = (props) => {
    const {
        handleCheckout,
        products: { orderProducts },
        upi: { upiMethod, setUpiMethod },
        step: { selectedStep, setSelectedStep },
        payment: { selectedPayment, setSelectedPayment },
        address: { savedAddresses, selectedAddress, setSelectedAddress },
        bank: { radioBank, setRadioBank, selectedBank, setSelectedBank },
    } = props;

    const [searchParams] = useSearchParams();
    const item_id = searchParams.get("item-id");

    return (
        <Paper elevation={1} className="_check_067" style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <Paper square elevation={0} sx={{ padding: "0 0 10px", backgroundColor: "transparent" }}>
                <div className="_check_010">
                    <LoginHeader selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
                    {selectedStep === 1 && <LoginComponent setSelectedStep={setSelectedStep} id="desktop" />}
                </div>
            </Paper>
            <Paper
                square
                elevation={0}
                sx={{
                    padding: "0 0 10px",
                    backgroundColor: "transparent",
                }}
            >
                <div className="_check_010">
                    <AddressHeader step={{ selectedStep, setSelectedStep }} address={{ selectedAddress }} />
                    {selectedStep === 2 && (
                        <AddressComponent
                            id="desktop"
                            address={{ savedAddresses, selectedAddress, setSelectedAddress }}
                            step={{ setSelectedStep }}
                        />
                    )}
                </div>
            </Paper>
            <Paper square elevation={0} sx={{ padding: "0 0 10px", backgroundColor: "transparent" }}>
                <div className="_check_010">
                    <OrderSummaryHeader step={{ selectedStep, setSelectedStep }} orderProducts={orderProducts} />
                    {selectedStep === 3 && (
                        <OrderSummaryComponent
                            orderProducts={orderProducts}
                            item_id={item_id}
                            id="desktop"
                            setSelectedStep={setSelectedStep}
                        />
                    )}
                </div>
            </Paper>
            <Paper square elevation={0} sx={{ padding: "0 0 10px", backgroundColor: "transparent" }}>
                <div className="_check_010">
                    <PaymentHeader selectedStep={selectedStep} />
                    {selectedStep === 4 && (
                        <PaymentComponent
                            id="desktop"
                            handleCheckout={handleCheckout}
                            upi={{ upiMethod, setUpiMethod }}
                            payment={{ selectedPayment, setSelectedPayment }}
                            bank={{ radioBank, setRadioBank, selectedBank, setSelectedBank }}
                        />
                    )}
                </div>
            </Paper>
        </Paper>
    );
};

export default DeskTopView;
