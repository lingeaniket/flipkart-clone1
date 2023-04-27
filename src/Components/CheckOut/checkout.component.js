import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useLayoutEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './addressform.component';
import PaymentForm from './paymentform.component';
import Review from './review.component';
import { useDispatch, useSelector } from 'react-redux';
import { removeLastInfo } from '../Features/User/orderDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { checkoutCompleted } from '../Features/User/orderDetailsSlice';

function Copyright() {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FLIPKART
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, handleNext, setOrderId, handleRedirect) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} />;
    case 1:
      return <PaymentForm handleNext={handleNext} />;
    case 2:
      return <Review handleNext={handleNext} handleRedirect={handleRedirect} setOrderId={setOrderId} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderId, setOrderId] = React.useState(1);
  const [count, setCount] = React.useState(15);
  const [isCheckout, setIsCheckout] = React.useState(true);
  const checkout = useSelector(state => state.orderDetailsState.checkout);
  const dispatch = useDispatch();
  // const orderId = useSelector(state => state.orderDetailsState.lastId);
  const navigate = useNavigate();
  useLayoutEffect(() => {

    !checkout && setIsCheckout(false);

    //  && setIsCheckout(false);
    // eslint-disable-next-line
  }, []);

  const handleNext = (event) => {
    // console.log(id1)
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    dispatch(removeLastInfo());
    setActiveStep(activeStep - 1);
  };

  const handleRedirect = () =>{
    const id = setInterval(()=>{
      setCount(count=> count - 1);
    }, 1000)
    setTimeout(()=>{
      document.getElementById('loader').classList.toggle('showLoader');
    },12000)
    setTimeout(()=>{
      clearInterval(id);
      navigate('/orders');
      dispatch(checkoutCompleted())
      document.getElementById('loader').classList.toggle('showLoader');
    }, 15000)

  }
  // React.useEffect(() => {
  //   const id = setInterval(()=>{
  //     setCount(count - 1);
  //   }, 1000)
  //   setTimeout(()=>{
  //     clearInterval(id);
  //     navigate('/orders');
  //   }, 15000)
  //   // eslint-disable-next-line
  // }, [orderId])

  // React.useLayoutEffect(()=> {
  //   id = useSelector()
  // })

  return (
    <>{isCheckout ? 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderId} We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Typography variant="subtitle1">
                We redirecting to you to orders page in {count} sec, <br/>
                please don't refresh or close window
                </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleNext, setOrderId, handleRedirect)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  form={`formId${activeStep}`}
                  type='submit'
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider> : <div style={{width: '100%', aspectRatio: '2/0.5', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>You are not authorized for this step: Go To Your cart and place order</div>}
    </>
  );
}