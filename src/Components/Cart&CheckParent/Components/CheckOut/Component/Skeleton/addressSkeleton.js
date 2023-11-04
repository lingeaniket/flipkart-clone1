import LoadingStep from "../loadingSteps";

import { Skeleton } from "@mui/material";

const AddressSkeleton = () => {
    return (
        <div
            style={{
                height: "150px",
                width: "100%",
                position: "relative",
                backgroundColor: "white",
            }}
        >
            <div
                style={{
                    padding: "10px 0 0 50px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        padding: "10px 0",
                    }}
                >
                    <Skeleton variant="text" animation="wave" sx={{ background: "white", fontSize: "14px" }} width={50} />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ background: "white", fontSize: "14px", marginLeft: "15px" }}
                        width={50}
                    />
                </div>
                <Skeleton variant="rectangle" animation="wave" sx={{ background: "white", margin: "10px 0" }} width={200} height={37} />
                <Skeleton variant="rectangle" animation="wave" sx={{ background: "white", margin: "10px 0" }} width={75} height={37} />
            </div>
            <LoadingStep />
        </div>
    );
};

export default AddressSkeleton;
