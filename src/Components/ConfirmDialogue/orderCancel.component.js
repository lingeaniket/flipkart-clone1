import * as React from "react";
import { useDispatch } from "react-redux";

import { cancelOrder } from "../Features/User/orderDetailsSlice";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function OrderCancel(props) {
    const dispatch = useDispatch();

    const handleClose = () => {
        props.setOrderCancelOpen(false);
    };

    return (
        <div>
            <Dialog open={props.orderCancelOpen} onClose={handleClose}>
                <DialogTitle>Add reason for cancel your order</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <form
                        id="cancelOrder"
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const cancelReason = formData.get("cancelReason");
                            dispatch(cancelOrder({ id: props.cancelId, reason: cancelReason }));
                            props.setOrderCancelOpen(false);
                        }}
                    >
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="cancelReason"
                            name="cancelReason"
                            label="Reason for order cancel"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="cancelOrder">
                        Cancel Order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default React.memo(OrderCancel);
