import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import CheckLogin from './CheckLoginComponent';
import AddressComponent1 from './AddressComponent1';
import OrderSummaryComponent from './OrderSummaryComponent';
import PaymentComponent from './PaymentComponent';
import { useSearchParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const steps = ['Login', 'Address', 'Order Summary', 'Payment'];

// export default function MobileViewCheck({ id, setSelectedStep, selectedStep }) {
export default function MobileViewNew(props) {
    const id = "mobile"
    const {
        handleCheckout,
        products: { orderProducts },
        upi: { upiMethod, setUpiMethod },
        step: { selectedStep, setSelectedStep },
        address: { selectedAddress, setSelectedAddress },
        payment: { selectedPayment, setSelectedPayment },
        bank: { setSelectedBank, selectedBank, setRadioBank, radioBank }
    } = props

    const [searchParams] = useSearchParams();
    const item_id = searchParams.get('item-id');
    const savedAddresses = useSelector(state => state.userState.savedAddresses);

    const handleBack = () => {
        setSelectedStep((prevActiveStep) => prevActiveStep - 1)
    };

    return (
        <Paper className='_check_068'>
            <Paper square sx={{ zIndex: 1000, marginBottom: '10px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px 0',
                    width: '100%',
                    zIndex: 999
                }}>
                    <Stepper style={{ width: '90%' }} activeStep={selectedStep - 1}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
            </Paper>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%' }}>
                    {selectedStep > 2
                        &&
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                            <div>
                                <div className='_check_008'>Deliver to</div>
                                <div className="_check_007">
                                    <span className="_check_008">{savedAddresses[selectedAddress].name}</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].address},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].locality},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].area},</span>
                                    <span className="_check_009">{savedAddresses[selectedAddress].state} -</span>
                                    <span className="_check_024 _check_009">{savedAddresses[selectedAddress].pincode}</span>
                                </div>
                            </div>
                            <div style={{ alignSelf: 'flex-end' }}>
                                <button className="addressChangeButton" onClick={() => {
                                    setSelectedStep(2)
                                }}>Change</button>
                            </div>
                        </div>
                    }
                    {(selectedStep === 1)
                        &&
                        (
                            <CheckLogin setSelectedStep={setSelectedStep} id={id} />
                        )
                    }
                    {(selectedStep === 2)
                        &&
                        (
                            <AddressComponent1
                                id={id}
                                address={{ savedAddresses, selectedAddress, setSelectedAddress }}
                                step={{ setSelectedStep }}
                            />
                        )
                    }
                    {(selectedStep === 3)
                        &&
                        (
                            <OrderSummaryComponent
                                orderProducts={orderProducts}
                                item_id={item_id}
                                id={id}
                                setSelectedStep={setSelectedStep}
                            />
                        )
                    }
                    {(selectedStep === 4)
                        &&
                        (
                            <PaymentComponent
                                id={id}
                                handleCheckout={handleCheckout}
                                upi={{ upiMethod, setUpiMethod }}
                                payment={{ selectedPayment, setSelectedPayment }}
                                bank={{ radioBank, setRadioBank, selectedBank, setSelectedBank }}
                            />
                        )
                    }
                </div>
            </Box>
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '0 10px 10px', position: 'sticky', bottom: 0, background: 'white', boxShadow: '0 -2px 10px 0 rgba(0, 0, 0, .1)', zIndex: 999 }}>
                    <Button
                        color="inherit"
                        disabled={selectedStep - 1 === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon fontSize='small' />
                        <span style={{
                            fontWeight: 500,
                            paddingLeft: '10px'
                        }}>Back</span>
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                </Box>
            </>
        </Paper>
    );
}