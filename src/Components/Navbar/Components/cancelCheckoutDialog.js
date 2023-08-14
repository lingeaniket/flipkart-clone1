import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { checkoutCompleted } from '../../Features/User/orderDetailsSlice';
import { useNavigate } from 'react-router-dom';

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