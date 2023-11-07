import { useSelector } from "react-redux";
import { memo } from "react";

import DoneIcon from "@mui/icons-material/Done";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";

const LoginHeader = ({ selectedStep, setSelectedStep }) => {
    const userData = useSelector((state) => state.userState.userData);

    return (
        <HeaderComponent selectedStep={selectedStep} setSelectedStep={setSelectedStep} step={1}>
            {selectedStep === 1 ? "Login or signup" : "Login"}
            {selectedStep > 1 && (
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
                        <span className="_check_008">
                            {userData.firstName} {userData.lastName}
                        </span>
                        <span className="_check_009">+91 {userData.mobileNumber}</span>
                    </div>
                </>
            )}
        </HeaderComponent>
    );
};

export default memo(LoginHeader);
