import { useSelector } from "react-redux";
import { memo } from "react";

import DoneIcon from "@mui/icons-material/Done";

const AddressHeader = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        address: { selectedAddress },
    } = props;

    const savedAddresses = useSelector((state) => state.userState.savedAddresses);

    return (
        <h3
            className="_check_011"
            style={{
                color: `${selectedStep === 2 ? "white" : "#878787"}`,
                backgroundColor: `${selectedStep === 2 ? "#2874f0" : "white"}`,
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
                            backgroundColor: `${selectedStep === 2 ? "white" : "#f0f0f0"}`,
                            height: "fit-content",
                        }}
                    >
                        2
                    </div>
                    <div>
                        delivery address
                        {selectedStep > 2 && (
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
                                    <span className="_check_008">{savedAddresses[selectedAddress].name}</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].address},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].locality},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].area},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].state} -</span>
                                    <span className="_check_024 _check_009">{savedAddresses[selectedAddress].pincode}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {selectedStep > 2 && (
                    <div
                        style={{
                            alignSelf: "flex-end",
                        }}
                    >
                        <button
                            className="addressChangeButton"
                            onClick={() => {
                                setSelectedStep(2);
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

export default memo(AddressHeader);
