import React from "react";

const HeaderComponent = ({ children, selectedStep, step, setSelectedStep }) => {
    const handleStep = () => {
        setSelectedStep(step);
    };

    return (
        <h3
            className="_check_011"
            style={{
                color: `${selectedStep === step ? "white" : "#878787"}`,
                backgroundColor: `${selectedStep === step ? "#2874f0" : "white"}`,
                height: "fit-content",
            }}
        >
            <div className="disFlexJusConBet">
                <div
                    style={{
                        alignSelf: "flex-start",
                        display: "flex",
                    }}
                >
                    <div
                        className="_check_012"
                        style={{
                            backgroundColor: `${selectedStep === step ? "white" : "#f0f0f0"}`,
                            height: "fit-content",
                        }}
                    >
                        {step}
                    </div>
                    <div>{children}</div>
                </div>
                {selectedStep > step && (
                    <div
                        style={{
                            alignSelf: "flex-end",
                        }}
                    >
                        <button className="addressChangeButton" onClick={handleStep}>
                            Change
                        </button>
                    </div>
                )}
            </div>
        </h3>
    );
};

export default React.memo(HeaderComponent);
