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


export const handleLogin = async (event, dispatch, handleClose, setSelectedStep, setHelperText, formData, id, loginType, navigate) => {
    if (loginType === 'Login') {
        const valid = await validateUser(formData.loginEmail, formData.loginPassword);
        if (valid) {
            dispatch(loginUser())
            handleClose();

            if(!isUserDataAvailable()) {
                navigate('/account?userType=first_user');
            } else {
                if (id === 2) {
                    setSelectedStep(2);
                }
            }

        } else {
            setHelperText((lastState) => ({
                ...lastState, loginCredentialsError: 'Email/Password is mismatched'
            }))
        }
    } else {
        const valid = await createUser(formData.signUpEmail, formData.signUpPassword);
        if (valid) {
            dispatch(loginUser(formData.signUpEmail));
            handleClose();
            navigate('/account?userType=first_user');
        } else {
            setHelperText((lastState) => ({
                ...lastState, loginCredentialsError: 'Email is already in use'
            }))
        }
    }
}

const isUserDataAvailable = ()=>{
    if(localStorage.getItem('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData.firstName && userData.lastName && userData.email && userData.mobileNumber) {
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
}