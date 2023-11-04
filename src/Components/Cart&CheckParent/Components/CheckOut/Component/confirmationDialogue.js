import * as React from "react";
import { memo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

function OrderConfirmation({ open, confirmed }) {
    return (
        <Dialog open={open}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {confirmed ? (
                    <>
                        <img
                            src="https://cdn.dribbble.com/users/282075/screenshots/4756095/icon_confirmation.gif"
                            alt="Confirmation"
                            height={150}
                        />
                        <DialogTitle
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            Order Confirmed!!
                        </DialogTitle>
                    </>
                ) : (
                    <>
                        <img
                            height={150}
                            alt="placing order"
                            src="https://media4.giphy.com/media/fKgyuyVVXrVzXsLSlm/giphy.gif?cid=6c09b952kxj9pw3h0zk0kmvbpzb61gbe5xb9g8jb0uxv099z&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        ></img>
                        <DialogTitle
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            Confirming Your Order Please Wait...
                        </DialogTitle>
                    </>
                )}
            </div>
        </Dialog>
    );
}

export default memo(OrderConfirmation);
