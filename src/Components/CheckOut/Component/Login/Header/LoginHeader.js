import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';

const LoginHeader = ({ selectedStep, setSelectedStep }) => {
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

export default LoginHeader;