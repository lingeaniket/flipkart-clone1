import { useSelector } from "react-redux";
import { memo } from "react";

import DoneIcon from "@mui/icons-material/Done";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";

const AddressHeader = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        address: { selectedAddress },
    } = props;

    const savedAddresses = useSelector((state) => state.userState.savedAddresses);

    return (
        <HeaderComponent selectedStep={selectedStep} setSelectedStep={setSelectedStep} step={2}>
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
        </HeaderComponent>
    );
};

export default memo(AddressHeader);
