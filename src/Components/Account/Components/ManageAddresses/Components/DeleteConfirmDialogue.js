import * as React from "react";
import { useDispatch } from "react-redux";

import { deleteAddress } from "../../../../Features/User/userSlice";

import Dialog from "@mui/material/Dialog";

function DeleteConfirm(props) {
    const { handleClose, open, index } = props;
    const dispatch = useDispatch();

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className="_manageAdd_007">
                <div className="_manageAdd_008">Are you sure you want to delete this address?</div>
                <div className="_manageAdd_009">
                    <button
                        className="_check_041"
                        onClick={() => {
                            dispatch(deleteAddress(index));
                            handleClose();
                        }}
                    >
                        yes, delete
                    </button>
                    <button className="_check_041" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default DeleteConfirm;
