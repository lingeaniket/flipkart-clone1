import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from "@mui/material";
import { formattedFullDate } from "../Functions/orderListFunctions";
import { Timeline } from "./timeline";
import { useDispatch } from "react-redux";
import { setMessage, setOpen } from "../../Features/SnackBar/snackbarSlice";
import { cancelOrder } from "../../Features/User/orderDetailsSlice";
const OrderTimeline = ({ selectedOrder, selectedProduct, status_id, setStatus, status }) => {
    const [open, setDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleOrderCancel = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const reason = formData.get("reason");
        handleClose();
        dispatch(setMessage(`Order Id : ${selectedOrder.order_id} is Cancelled`));
        dispatch(setOpen(true));
        setTimeout(() => {
            dispatch(cancelOrder({ id: selectedOrder.order_id, reason }));
        }, 2000);
    };
    const handleCancel = () => {
        //open dialogue
        handleClickOpen();
    };

    return (
        <div className="_order_030 timelineDiv">
            <div className="_order_031 _order_003">
                <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                    <div className="_order_118">Order Id: {selectedOrder.order_id}</div>
                    <div className="_order_032 w-1-3">
                        <div className="flexCenCen w-1-3">
                            <div className="_order_006">
                                <img className="_order_035" src={selectedProduct.thumbnail} alt="product" />
                            </div>
                        </div>
                        <div className="w-2-3">
                            <div
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                <div className="_order_036">{selectedProduct.title}</div>
                                <div className="_order_037">{selectedProduct.description}</div>
                                <div
                                    className="cartProductDetails"
                                    style={{
                                        padding: "0",
                                        minHeight: 0,
                                    }}
                                >
                                    <span>${((selectedProduct.price * 100) / (100 - selectedProduct.discountPercentage)).toFixed(1)}</span>
                                    <span>${selectedProduct.price.toFixed(1)}</span>
                                    <span>{selectedProduct.discountPercentage}% Off</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_order_039 w-2-3">
                        <Timeline order={selectedOrder} id={status_id} setStatus={setStatus} />
                        <div className="_order_069 w-3-4">
                            <div className="_order_070 w-1-1">
                                <div className="_order_071">
                                    <div
                                        className="_order_072"
                                        style={{
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        <div>
                                            Your item is {status === "nearest_hub" && "reached"} {status.replace("_", " ")}
                                        </div>
                                        <span
                                            style={{
                                                fontWeight: 400,
                                                color: "grey",
                                                fontSize: "11px",
                                            }}
                                        >
                                            {status === "confirmed"
                                                ? formattedFullDate(selectedOrder.order_date)
                                                : formattedFullDate(selectedOrder.order_timeline[status])}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-1-1"
                        style={{
                            paddingLeft: "30px",
                            // width: '33.33%'
                        }}
                    >
                        <div>
                            {selectedOrder.order_status !== "delivered" &&
                                selectedOrder.order_status !== "cancelled" &&
                                selectedOrder.order_status !== "cancelled" && (
                                    <div
                                        style={{
                                            paddingBottom: "10px",
                                            fontWeight: "500",
                                            marginLeft: "-10px",
                                            width: "auto",
                                            color: "#2874f0",
                                            wordBreak: "break-all",
                                            display: "flex",
                                        }}
                                    >
                                        <span style={{ cursor: "pointer" }}>
                                            <span
                                                style={{
                                                    width: "18px",
                                                    margin: "0 8px 0 12px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                X
                                            </span>
                                            <span
                                                onClick={handleCancel}
                                                style={{
                                                    verticalAlign: "top",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                cancel Order
                                            </span>
                                        </span>
                                    </div>
                                )}
                            {selectedOrder.order_status === "delivered" &&
                                selectedOrder.order_timeline.return_policy > new Date().getTime() && (
                                    <div
                                        style={{
                                            paddingBottom: "10px",
                                            fontWeight: "500",
                                            marginLeft: "-10px",
                                            width: "auto",
                                            color: "#2874f0",
                                            wordBreak: "break-all",
                                            display: "flex",
                                        }}
                                    >
                                        <span style={{ cursor: "pointer" }}>
                                            <span
                                                style={{
                                                    width: "18px",
                                                    margin: "0 8px 0 12px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                --*
                                            </span>
                                            <span
                                                onClick={handleCancel}
                                                style={{
                                                    verticalAlign: "top",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Return
                                            </span>
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Do you want to cancel the order?"}</DialogTitle>
                <form onSubmit={handleOrderCancel}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">If you want to cancel order, give reason below</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            required
                            label="Reason"
                            name="reason"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type="submit" autoFocus>
                            Cancel Order
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default OrderTimeline;
