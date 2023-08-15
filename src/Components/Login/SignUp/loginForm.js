import { useState } from "react";
import { TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateUser, createUser } from "../../Utility/utility";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Features/User/userSlice";

const LoginForm = ({ setOpen, id, setSelectedStep }) => {
    const [loginType, setLoginType] = useState('Login');

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [formData, setFormData] = useState({
        loginEmail: '',
        loginPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        signUpConfirmPassword: '',
    })
    const [helperText, setHelperText] = useState({
        loginCredentialsError: '',
        signUpCredentialsError: '',
        signUpConfirmPassword: '',
    })


    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setHelperText((prevState) => ({
            ...prevState,
            loginCredentialsError: '',
            signUpCredentialsError: '',
            signUpConfirmPassword: '',
        }))
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (loginType === 'Login') {
            const valid = await validateUser(formData.loginEmail, formData.loginPassword);
            if (valid) {
                dispatch(loginUser())
                handleClose();
                if (id === 2) {
                    setSelectedStep(2);
                }
            } else {
                setHelperText((lastState) => ({
                    ...lastState, loginCredentialsError: 'Email/Password is mismatched'
                }))
            }
        } else {
            const valid = await createUser(formData.signUpEmail, formData.signUpPassword);
            if (valid) {
                dispatch(loginUser())
                handleClose();
                navigate('/account?userType=first_user');
            } else {
                setHelperText((lastState) => ({
                    ...lastState, loginCredentialsError: 'Email is already in use'
                }))
            }
        }
    }

    const handleClose = () => {
        if (id === 1) {
            setOpen(false);
        }
        setTimeout(() => {
            handleInputClear();
            setLoginType('Login');
        }, 500)
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className='_sign_009'>
                    <div style={{
                        color: '#d32f2f',
                        fontSize: '12px',
                        marginBottom: '10px',
                    }}>{helperText.loginCredentialsError}</div>
                    {loginType === 'Login'
                        ?
                        <TextField
                            required
                            type='email'
                            autoComplete='off'
                            id="loginEmail" name='loginEmail' label="Enter Email" variant="standard" sx={{
                                width: '100%'
                            }}
                            error={
                                helperText.loginCredentialsError.length > 0 ? true : false
                            }
                            value={formData.loginEmail}
                            onInput={handleInput}
                        />
                        :
                        <TextField required
                            type='email'
                            autoComplete='off'
                            id="signUpEmail" name='signUpEmail' label="Enter Your Email" variant="standard" sx={{
                                width: '100%'
                            }}
                            value={formData.signUpEmail}
                            onInput={handleInput}
                        />
                    }
                </div>
                <div className='_sign_009'>
                    {loginType === 'Login'
                        ?
                        <TextField
                            type='password'
                            autoComplete="new-password"
                            required id="loginPassword" name='loginPassword' label="Enter Password" variant="standard" sx={{
                                width: '100%'
                            }}
                            error={
                                helperText.loginCredentialsError.length > 0 ? true : false
                            }
                            value={formData.loginPassword}
                            onInput={handleInput}
                        />
                        :
                        <TextField
                            type='password'
                            autoComplete="new-password"
                            required id="signUpPassword" name='signUpPassword' label="Create Password" variant="standard" sx={{
                                width: '100%'
                            }}
                            error={formData.signUpPassword.length > 0
                                ?
                                (
                                    formData.signUpPassword.length < 8 ? true : false
                                )
                                :
                                false

                            }
                            value={formData.signUpPassword}
                            helperText={formData.signUpPassword.length > 0
                                ?
                                (
                                    formData.signUpPassword.length < 8 ? 'Password should be at least 8 characters' : ''
                                )
                                :
                                ''
                            }
                            onChange={handleInput}
                        />
                    }
                </div>
                {loginType !== 'Login'
                    &&
                    <div className='_sign_009'>
                        <TextField
                            type='password'
                            required
                            id="signUpConfirmPassword"
                            name='signUpConfirmPassword'
                            label="Confirm Password"
                            variant="standard"
                            error={formData.signUpConfirmPassword.length > 0
                                ?
                                (formData.signUpPassword === formData.signUpConfirmPassword
                                    ?
                                    false
                                    :
                                    true
                                )
                                :
                                false
                            }
                            sx={{
                                width: '100%'
                            }}
                            value={formData.signUpConfirmPassword}
                            onChange={handleInput}
                            helperText={formData.signUpConfirmPassword.length > 0
                                ?
                                (formData.signUpPassword === formData.signUpConfirmPassword
                                    ?
                                    'Password matched'
                                    :
                                    'Password did not match'
                                )
                                :
                                ''
                            }
                        />
                    </div>
                }
                <div className='_sign_010'>
                    By continuing, you agree to Flipkart's <span className='_sign_011'>
                        Terms of use</span> and  <span className='_sign_011'>
                        Privacy Policy</span>
                </div>
                <div className='_sign_012'>
                    <button type='submit' className='_sign_013'
                        disabled={loginType !== 'Login'
                            &&
                            (formData.signUpConfirmPassword.length === 0
                                &&
                                (formData.signUpPassword !== formData.signUpConfirmPassword)
                            )
                        }
                    >{loginType}</button>
                </div>
                {id === 2
                    &&
                    <div style={{
                        fontSize: '14px',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        {loginType === 'Login'
                            ?
                            <div className='_sign_015' onClick={() => {
                                setLoginType('Sign Up');
                                handleInputClear();
                            }}>
                                New to Flipkart? Create an account
                            </div>
                            :
                            <div className='_sign_015' onClick={() => {
                                setLoginType('Login');
                                handleInputClear()
                            }}>
                                Already a user? Login to your account
                            </div>
                        }
                    </div>
                }
            </form>
            {id === 1
                &&
                <>
                    <div className='_sign_014'>
                        {loginType === 'Login'
                            ?
                            <div className='_sign_015' onClick={() => { setLoginType('Sign Up'); handleInputClear() }}>
                                New to Flipkart? Create an account
                            </div>
                            :
                            <div className='_sign_015' onClick={() => {
                                setLoginType('Login');
                                handleInputClear()
                            }}>
                                Already a user? Login to your account
                            </div>
                        }
                    </div>

                    <div className='_sign_016'>
                        <span onClick={handleClose}>
                            <ArrowBackIcon fontSize='small' /> Back
                        </span>
                    </div>
                </>
            }
        </div>
    )
}

export default LoginForm;