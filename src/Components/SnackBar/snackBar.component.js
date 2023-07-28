import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Slide } from '@mui/material';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const SnackBar = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Snackbar open={props.open} autoHideDuration={3000} onClose={handleClose} TransitionComponent={TransitionUp}
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'center'
        }}>
        <div style={{ color: 'white', backgroundColor: 'black', padding: '15px', fontSize: '16px' }}>
          <CheckCircleIcon fontSize='medium' sx={{ color: 'green', marginRight: '10px' }} />{props.message}
        </div>
      </Snackbar>
    </>
  )
}

export default SnackBar