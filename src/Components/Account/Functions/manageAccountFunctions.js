import { closeLogin, updateUserData } from "../../Features/User/userSlice";
import { setMessage, setOpen } from "../../Features/SnackBar/snackbarSlice";

export const handleEditFunc = (index, editState, setEditState, userData, setCurrentUserdata) => {
    editState[index] = !editState[index];
    setEditState((lastState) => [...lastState]);
    if (index === 0) {
        setCurrentUserdata((prevState) => ({
            ...prevState,
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
        }));
    } else if (index === 1) {
        setCurrentUserdata((prevState) => ({ ...prevState, email: userData.email }));
    } else {
        setCurrentUserdata((prevState) => ({ ...prevState, mobileNumber: userData.mobileNumber }));
    }
};

export const handleFirsttuser = (handleForm, dispatch, navigate, setError, isCheckOut, singleOrder, currentUserdata) => {
    const formFilled = handleForm();
    if (formFilled) {
        dispatch(setMessage("Details Updated"));
        dispatch(setOpen(true));
        setTimeout(() => {
            dispatch(updateUserData(currentUserdata));
            if (singleOrder.length > 0) {
                navigate(`/checkout?item-id=${singleOrder[0].id}`);
            } else if (isCheckOut) {
                navigate("/checkout");
            } else {
                navigate("/");
                dispatch(closeLogin());
            }
        }, 2000);
    } else {
        setError(true);
    }
};
