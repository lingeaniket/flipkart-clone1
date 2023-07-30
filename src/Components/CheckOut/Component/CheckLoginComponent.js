import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../Features/User/userSlice";
import { useNavigate } from 'react-router-dom';
import '../Styles/checkoutStyles.css'

const CheckLogin = ({ setSelectedStep }) => {
    const isUserLoggedIn = useSelector(state => state.userState.userLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="_check_013">
            <div className="_check_045">
                <div className="_check_055">
                    <div className="_check_056">
                        {isUserLoggedIn
                            &&
                            <>
                                <div className='_check_062'>
                                    <span className='_check_063'>Name</span>
                                    <span className='_check_064'>Aniket Linge</span>
                                </div>
                                <div className='_check_062'>
                                    <span className='_check_063'>Phone</span>
                                    <span className='_check_064'>7030325245</span>
                                </div>
                                <div className='_check_062'>
                                    <div className='_check_065'
                                        onClick={() => {
                                            localStorage.setItem('isUserLoggedIn', false);
                                            localStorage.removeItem('username');
                                            dispatch(logoutUser());
                                            navigate(`/`);
                                        }}>
                                        <span>Logout & Sign in to another account</span>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="_check_057">
                            <button className="_check_025 w-1-1"
                                onClick={() => {
                                    if (isUserLoggedIn) {
                                        setSelectedStep(2)
                                    } else {
                                        localStorage.setItem('isUserLoggedIn', false);
                                        localStorage.removeItem('username');

                                        dispatch(logoutUser());
                                        navigate(`/login`);
                                    }
                                }}
                            >
                                {isUserLoggedIn
                                    ?
                                    'continue to checkout'
                                    :
                                    'continue to login page'
                                }
                            </button>
                        </div>
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
                {isUserLoggedIn &&
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

export default CheckLogin;