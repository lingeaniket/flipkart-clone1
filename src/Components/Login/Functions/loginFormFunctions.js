import { loginUser } from "../../Features/User/userSlice";
import { validateUser, createUser } from "../../Utility/utility";
export const handleInputClear = (setHelperText, setFormData) => {
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


export const handleLogin = async (event, dispatch,handleClose, setSelectedStep, setHelperText, formData, id, loginType, navigate) => {
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