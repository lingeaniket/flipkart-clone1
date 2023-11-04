import { memo } from "react";

import { CircularProgress } from "@mui/material";

const LoadingStep = () => {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff80",
                zIndex: 1,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "180px",
                    zIndex: 1000,
                    background: "white",
                    boxShadow: "#0000006b -2px 2px 5px -2px, #0000006b 2px 2px 5px -2px",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <CircularProgress size={26} />
                <span
                    style={{
                        marginLeft: "12px",
                    }}
                >
                    Loading
                </span>
            </div>
        </div>
    );
};

export default memo(LoadingStep);
