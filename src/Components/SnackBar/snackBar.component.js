import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../Features/SnackBar/snackbarSlice";

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
const SnackBar = () => {
    const message = useSelector((state) => state.snackBarState.message);
    const [messages, setmessages] = useState([]);
    const open = useSelector((state) => state.snackBarState.open);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    useEffect(() => {
        setmessages(message.split("/-"));
    }, [message]);

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={TransitionUp}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <div style={{ color: "white", backgroundColor: "black", padding: "15px", fontSize: "16px" }}>
                    <CheckCircleIcon fontSize="medium" sx={{ color: "green", marginRight: "10px" }} />
                    <span>
                        {messages[0]}
                        {messages[1] && (
                            <i>
                                <b>{messages[1]}</b>
                            </i>
                        )}
                        {messages[2] && <>{messages[2]}</>}
                        {messages[3] && <b>{messages[3]}</b>}
                    </span>
                </div>
            </Snackbar>
            {/* // dispatch(setMessage(`${<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(event.target.value), 1)}</b></span>}`)) */}
        </>
    );
};

export default React.memo(SnackBar);
