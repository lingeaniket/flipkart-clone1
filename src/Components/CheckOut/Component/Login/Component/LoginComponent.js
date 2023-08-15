import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../../../Features/User/userSlice";
import { useNavigate } from 'react-router-dom';
import '../../../Styles/checkoutStyles.css'
import LoginForm from '../../../../Login/SignUp/loginForm';
import { useEffect, useState } from 'react';

const LoginComponent = ({ setSelectedStep }) => {
    const isUserLoggedIn = useSelector(state => state.userState.userLoggedIn);
    const userData = useSelector(state => state.userState.userData);
    const [userDataAvailable, setUserDataAvailable] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.firstName && userData.lastName && userData.mobileNumber && userData.email) {
            setUserDataAvailable(true)
        } else {
            setUserDataAvailable(false)
        }
    }, [userData])

    return (
        <div className="_check_013">
            <div className="_check_045">
                <div className="_check_055">
                    <div className="_check_056">
                        {isUserLoggedIn
                            ?
                            <>
                                {userDataAvailable
                                    ?
                                    <>
                                        <div className='_check_062'>
                                            <span className='_check_063'>Name</span>
                                            <span className='_check_064'>{userData.firstName} {userData.lastName}</span>
                                        </div>
                                        <div className='_check_062'>
                                            <span className='_check_063'>Phone</span>
                                            <span className='_check_064'>+91 {userData.mobileNumber}</span>
                                        </div>
                                    </>
                                    :
                                    <div className="_check_057">
                                        <button className="_check_025 w-1-1"
                                            onClick={() => { navigate('/account?userType=first_user')}}
                                            style={{
                                                width: '250px',
                                                marginBottom: '12px'
                                            }}
                                        >
                                            Update details to continue
                                        </button>
                                    </div>
                                }
                                <div className='_check_062'>
                                    <div className='_check_065'
                                        onClick={() => {
                                            dispatch(logoutUser());
                                            navigate(`/`);
                                        }}>
                                        <span>Logout & Sign in to another account</span>
                                    </div>
                                </div>
                            </>
                            :
                            <LoginForm id={2} setSelectedStep={setSelectedStep} />
                        }
                        {isUserLoggedIn
                            &&
                            <div className="_check_057">
                                <button disabled={!userDataAvailable} className="_check_025 w-1-1"
                                    onClick={() => { setSelectedStep(2) }}
                                    style={{
                                        backgroundColor: `${userDataAvailable ? '#fb641b': 'grey'}`,
                                        width: '250px'
                                    }}
                                >
                                    continue to checkout
                                </button>
                            </div>
                        }
                    </div>
                    <div className="_check_058">
                        <div className='_check_063'>
                            <span>Advantages of our secure login</span>
                            <ul className="_check_059">
                                <li className="_check_060">
                                    <LocalShippingIcon className="_check_061" />
                                    <span>Easily Track Orders, Hassle free Returns</span>
                                </li>
                                <li className="_check_060">
                                    <NotificationsIcon className="_check_061" />
                                    <span>Get Relevant Alerts and Recommendation</span>
                                </li>
                                <li className="_check_060">
                                    <StarRateIcon className="_check_061" />
                                    <span>Wishlist, Reviews, Ratings and more.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {isUserLoggedIn
                    &&
                    <div className='_check_066'>
                        <span>
                            Please note that upon clicking "Logout" you will lose all items in cart and
                            will be redirected to Flipkart home page.
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginComponent;