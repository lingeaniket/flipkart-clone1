import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkoutCompleted } from '../../../../Features/User/orderDetailsSlice';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export default function AlertDialog({open, handleClose}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Want to cancel checkout?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you want to cancel checkout, you can again start checkout from cart by placing order again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        handleClose();
                        dispatch(checkoutCompleted());
                        navigate('/')
                    }}>Cancel Checkout</Button>
                    <Button onClick={handleClose} autoFocus>
                        Continue to checkout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}