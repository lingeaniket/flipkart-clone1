import { memo } from "react";

import DoneIcon from "@mui/icons-material/Done";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";

const OrderSummaryHeader = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        orderProducts,
    } = props;

    return (
        <HeaderComponent selectedStep={selectedStep} setSelectedStep={setSelectedStep} step={3}>
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
        </HeaderComponent>
    );
};

export default memo(OrderSummaryHeader);
