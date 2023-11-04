import DoneIcon from "@mui/icons-material/Done";

const OrderSummaryHeader = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        orderProducts,
    } = props;

    return (
        <h3
            className="_check_011"
            style={{
                color: `${selectedStep === 3 ? "white" : "#878787"}`,
                backgroundColor: `${selectedStep === 3 ? "#2874f0" : "white"}`,
                height: "fit-content",
            }}
        >
            <div className="disFlexJusConBet">
                <div style={{ alignSelf: "flex-start", display: "flex" }}>
                    <div
                        className="_check_012"
                        style={{
                            backgroundColor: `${selectedStep === 3 ? "white" : "#f0f0f0"}`,
                            height: "fit-content",
                        }}
                    >
                        3
                    </div>
                    <div>
                        order summary
                        {selectedStep > 3 && (
                            <>
                                <DoneIcon
                                    fontSize="small"
                                    sx={{
                                        verticalAlign: "top",
                                        height: "20px",
                                        marginLeft: "8px",
                                    }}
                                />
                                <div className="_check_007">
                                    <span className="_check_008">{orderProducts.length} products</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {selectedStep > 3 && (
                    <div
                        style={{
                            alignSelf: "flex-end",
                        }}
                    >
                        <button
                            className="addressChangeButton"
                            onClick={() => {
                                setSelectedStep(3);
                            }}
                        >
                            Change
                        </button>
                    </div>
                )}
            </div>
        </h3>
    );
};

export default OrderSummaryHeader;
