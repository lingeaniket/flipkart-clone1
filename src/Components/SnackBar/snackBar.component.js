import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SnackBar = (props) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

  return (
    <>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.alertType} sx={{ width: '100%' }}>
          {props.message}
            <Button color="primary" size="small" onClick={handleClose}>
        UNDO
      </Button>
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackBar