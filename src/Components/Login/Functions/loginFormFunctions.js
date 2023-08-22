import { loginUser } from "../../Features/User/userSlice";
import { addToWishList } from "../../Features/User/userWishListSlice";
import { validateUser, createUser } from "../../Utility/utility";
import { setOpen, setMessage } from "../../Features/SnackBar/snackbarSlice";

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


export const handleLogin = async (event, dispatch, handleClose, setSelectedStep, setHelperText, formData, id, loginType, navigate, loginForWishlist, productToAdd) => {
    if (loginType === 'Login') {
        const valid = await validateUser(formData.loginEmail, formData.loginPassword);
        if (valid) {
            dispatch(loginUser())
            if (!loginForWishlist) {
                if (!isUserDataAvailable()) {
                    handleClose();
                    navigate('/account?userType=first_user');
                } else {
                    handleClose();
                    if (id === 2) {
                        setSelectedStep(2);
                    }
                }
            } else {
                dispatch(setOpen(true));
                dispatch(setMessage(`Added to your Wishlist`))
                dispatch(addToWishList(productToAdd));
                handleClose();
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
            if (!loginForWishlist) {
                handleClose();
                navigate('/account?userType=first_user');
            } else {
                dispatch(setOpen(true));
                dispatch(setMessage(`Added to your Wishlist`))
                dispatch(addToWishList(productToAdd));
                handleClose();
            }
        } else {
            setHelperText((lastState) => ({
                ...lastState, loginCredentialsError: 'Email is already in use'
            }))
        }
    }
}

const isUserDataAvailable = () => {
    if (localStorage.getItem('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData.firstName && userData.lastName && userData.email && userData.mobileNumber) {
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
}