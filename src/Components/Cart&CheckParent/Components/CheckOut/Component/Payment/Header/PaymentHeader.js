const PaymentHeader = ({ selectedStep }) => {
    return (
        <h3
            className="_check_011"
            style={{
                color: `${selectedStep === 4 ? "white" : "#878787"}`,
                backgroundColor: `${selectedStep === 4 ? "#2874f0" : "white"}`,
            }}
        >
            <span
                className="_check_012"
                style={{
                    backgroundColor: `${selectedStep === 4 ? "white" : "#f0f0f0"}`,
                }}
            >
                4
            </span>
            <span>Payment</span>
        </h3>
    );
};

export default PaymentHeader;
