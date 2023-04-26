import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { currentOrderPaymentInfo } from '../Features/User/orderDetailsSlice';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';

export default function PaymentForm(props) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form id='formId1' onSubmit={(event)=>{
        event.preventDefault();
        const formData2 = new FormData(event.currentTarget);
        const obj = {};
        for (let pair of formData2.entries()) {
          if (pair[1].length > 0) {
            obj[pair[0]] = pair[1];
          }
        }
        dispatch(currentOrderPaymentInfo(obj))
        props.handleNext();
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            type='number'
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            type='password'
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      </form>

    </React.Fragment>
  );
}