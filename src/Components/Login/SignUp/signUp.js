import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import './signUpStyles.css'
import { createUser, validateUser } from '../../Utility/utility';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './loginForm';

export default function Register({ open, setOpen }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginType, setLoginType] = React.useState('Login')

    const [passMatched, setPassMatched] = React.useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [helperText, setHelperText] = React.useState({
        loginCredentialsError: '',
        signUpCredentialsError: '',
        signUpConfirmPassword: '',
    })
    const [formData, setFormData] = React.useState({
        loginEmail: '',
        loginPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpConfirmPassword: '',
    })

    const handleInputClear = () => {
        setHelperText((prevState) => ({
            ...prevState,
            loginCredentialsError: '',
            signUpCredentialsError: '',
            signUpConfirmPassword: '',
        }))
        setFormData((prevState) => ({
            ...prevState,
            loginEmail: '',
            loginPassword: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpConfirmPassword: '',
        }))
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (loginType === 'Login') {
            await validateUser(formData.loginEmail, formData.loginPassword, setHelperText, handleClose, dispatch);
        } else {
            await createUser(formData.signUpEmail, formData.signUpPassword, setHelperText, handleClose, dispatch);
        }
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {

            handleInputClear();
            setLoginType('Login');
        }, 500)
    };

    return (
        <div style={{
            background: 'transparent',
        }}>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                PaperComponent={'div'}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth={100}
                sx={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    maxHeight: '100%'
                }}
            >
                <div className='_sign_001'>
                    <button className='_sign_002' onClick={handleClose}>X</button>
                    <div className='_sign_003'>
                        <div className='_sign_004'>
                            <div className='_sign_005'>
                                <span className='_sign_006'>{loginType}</span>
                                <p className='_sign_007'>
                                    Get access to your Orders,
                                    Wishlist and Recommendations
                                </p>
                            </div>
                            <div className='_sign_008'>
                                <LoginForm id={1} setOpen={setOpen}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}