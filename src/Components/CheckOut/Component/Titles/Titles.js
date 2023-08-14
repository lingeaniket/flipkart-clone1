import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';

export const Login = ({ selectedStep, setSelectedStep }) => {
    const userData = useSelector(state => state.userState.userData);
    return (
        <h3 className="_check_011" style={{
            color: `${selectedStep === 1 ? 'white' : '#878787'}`,
            backgroundColor: `${selectedStep === 1 ? '#2874f0' : 'white'}`,
            height: 'fit-content'
        }}>
            <div className="disFlexJusConBet">
                <div style={{
                    alignSelf: 'flex-start', display: 'flex'
                }}>
                    <div className="_check_012" style={{
                        backgroundColor: `${selectedStep === 1 ? 'white' : '#f0f0f0'}`,
                        height: 'fit-content'
                    }}>1</div>
                    <div>
                        {selectedStep === 1 ? "Login or signup" : "Login"}
                        {selectedStep > 1
                            &&
                            <>
                                <DoneIcon fontSize="small" sx={{
                                    verticalAlign: 'top',
                                    height: '20px',
                                    marginLeft: '8px'
                                }} />
                                <div className="_check_007">
                                    <span className="_check_008">{userData.firstName} {userData.lastName}</span>
                                    <span className="_check_009">+91 {userData.mobileNumber}</span>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {(selectedStep > 1)
                    &&
                    (
                        <div style={{
                            alignSelf: 'flex-end'
                        }}>
                            <button className="addressChangeButton" onClick={() => {
                                setSelectedStep(1)
                            }}>Change</button>
                        </div>
                    )
                }
            </div>
        </h3>
    )
}

export const Address = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        address: { selectedAddress },
    } = props;
    const savedAddresses = useSelector(state => state.userState.savedAddresses);

    return (
        <h3 className="_check_011" style={{
            color: `${selectedStep === 2 ? 'white' : '#878787'}`,
            backgroundColor: `${selectedStep === 2 ? '#2874f0' : 'white'}`,
            height: 'fit-content'
        }}>
            <div className="disFlexJusConBet">
                <div style={{
                    alignSelf: 'flex-start', display: 'flex'
                }}>
                    <div className="_check_012" style={{
                        backgroundColor: `${selectedStep === 2 ? 'white' : '#f0f0f0'}`,
                        height: 'fit-content'
                    }}>2</div>
                    <div>
                        delivery address
                        {(selectedStep > 2)
                            &&
                            (
                                <>
                                    <DoneIcon fontSize="small" sx={{
                                        verticalAlign: 'top',
                                        height: '20px',
                                        marginLeft: '8px'
                                    }} />
                                    <div className="_check_007">
                                        <span className="_check_008">{savedAddresses[selectedAddress].name}</span>
                                        <span className="_check_009">{savedAddresses[selectedAddress].address},</span>
                                        <span className="_check_009">{savedAddresses[selectedAddress].locality},</span>
                                        <span className="_check_009">{savedAddresses[selectedAddress].area},</span>
                                        <span className="_check_009">{savedAddresses[selectedAddress].state} -</span>
                                        <span className="_check_024 _check_009">{savedAddresses[selectedAddress].pincode}</span>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                {(selectedStep > 2)
                    &&
                    (
                        <div style={{
                            alignSelf: 'flex-end'
                        }}>
                            <button className="addressChangeButton" onClick={() => {
                                setSelectedStep(2)
                            }}>Change</button>
                        </div>
                    )
                }
            </div>
        </h3>
    )
}

export const Order = (props) => {
    const {
        step: { selectedStep, setSelectedStep },
        orderProducts
    } = props

    return (
        <h3 className="_check_011" style={{
            color: `${selectedStep === 3 ? 'white' : '#878787'}`,
            backgroundColor: `${selectedStep === 3 ? '#2874f0' : 'white'}`,
            height: 'fit-content'
        }}>
            <div className="disFlexJusConBet">
                <div style={{ alignSelf: 'flex-start', display: 'flex' }}>
                    <div className="_check_012" style={{
                        backgroundColor: `${selectedStep === 3 ? 'white' : '#f0f0f0'}`,
                        height: 'fit-content'
                    }}>3</div>
                    <div>
                        order summary
                        {(selectedStep > 3)
                            &&
                            (
                                <>
                                    <DoneIcon fontSize="small" sx={{
                                        verticalAlign: 'top',
                                        height: '20px',
                                        marginLeft: '8px'
                                    }} />
                                    <div className="_check_007">
                                        <span className="_check_008">{orderProducts.length} products</span>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                {(selectedStep > 3)
                    &&
                    (
                        <div style={{
                            alignSelf: 'flex-end'
                        }}>
                            <button className="addressChangeButton" onClick={() => {
                                setSelectedStep(3)
                            }}>Change</button>
                        </div>
                    )
                }
            </div>
        </h3>
    )
}

export const Payment = ({ selectedStep }) => {
    return (
        <h3 className="_check_011" style={{
            color: `${selectedStep === 4 ? 'white' : '#878787'}`,
            backgroundColor: `${selectedStep === 4 ? '#2874f0' : 'white'}`,
        }}>
            <span className="_check_012" style={{
                backgroundColor: `${selectedStep === 4 ? 'white' : '#f0f0f0'}`,
            }}>4</span>
            <span>Payment</span>
        </h3>
    )
}