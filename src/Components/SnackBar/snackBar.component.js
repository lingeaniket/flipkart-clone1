import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../Features/SnackBar/snackbarSlice';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const SnackBar = () => {
  const message = useSelector(state=> state.snackBarState.message);
  const open = useSelector(state=> state.snackBarState.open);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} TransitionComponent={TransitionUp}
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'center'
        }}>
        <div style={{ color: 'white', backgroundColor: 'black', padding: '15px', fontSize: '16px' }}>
          <CheckCircleIcon fontSize='medium' sx={{ color: 'green', marginRight: '10px' }} />{message}
        </div>
      </Snackbar>
    </>
  )
}

export default SnackBar