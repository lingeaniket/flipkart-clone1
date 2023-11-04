import { useState,memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EmailComponent from "./Components/EmailComponent";
import PasswordComponent from "./Components/PasswordComponent";
import ConfirmPassComponent from "./Components/ConfirmPassComponent";

import { handleLogin, handleInputClear } from "../../Functions/loginFormFunctions";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { closeLogin } from "../../../Features/User/userSlice";
import { stopForLoginWishlist } from "../../../Features/User/userWishListSlice";

const LoginForm = ({ setOpen, id, setSelectedStep }) => {
    const [loginType, setLoginType] = useState("Login");
    const loginForWishlist = useSelector((state) => state.wishListState.loginForWishlist);
    const productToAdd = useSelector((state) => state.wishListState.productToAdd);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        loginEmail: "",
        loginPassword: "",
        signUpEmail: "",
        signUpPassword: "",
        signUpConfirmPassword: "",
    });

    const [helperText, setHelperText] = useState({
        loginCredentialsError: "",
        signUpCredentialsError: "",
        signUpConfirmPassword: "",
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setHelperText((prevState) => ({
            ...prevState,
            loginCredentialsError: "",
            signUpCredentialsError: "",
            signUpConfirmPassword: "",
        }));
    };

    const handleClose = () => {
        if (id === 1) {
            setOpen(false);
            dispatch(closeLogin());
            dispatch(stopForLoginWishlist());
        }
        setTimeout(() => {
            handleInputClear(setHelperText, setFormData);
            setLoginType("Login");
        }, 500);
    };

    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleLogin(
                        event,
                        dispatch,
                        handleClose,
                        setSelectedStep,
                        setHelperText,
                        formData,
                        id,
                        loginType,
                        navigate,
                        loginForWishlist,
                        productToAdd
                    );
                }}
            >
                <EmailComponent helperText={helperText} loginType={loginType} formData={formData} handleInput={handleInput} />
                <PasswordComponent loginType={loginType} helperText={helperText} handleInput={handleInput} formData={formData} />
                {loginType !== "Login" && <ConfirmPassComponent formData={formData} handleInput={handleInput} />}
                <div className="_sign_010">
                    By continuing, you agree to Flipkart's <span className="_sign_011">Terms of use</span> and{" "}
                    <span className="_sign_011">Privacy Policy</span>
                </div>
                <div className="_sign_012">
                    <button
                        type="submit"
                        className="_sign_013"
                        disabled={
                            loginType !== "Login" &&
                            formData.signUpConfirmPassword.length === 0 &&
                            formData.signUpPassword !== formData.signUpConfirmPassword
                        }
                    >
                        {loginType}
                    </button>
                </div>
                {id === 2 && (
                    <div
                        style={{
                            fontSize: "14px",
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {loginType === "Login" ? (
                            <div
                                className="_sign_015"
                                onClick={() => {
                                    setLoginType("Sign Up");
                                    handleInputClear(setHelperText, setFormData);
                                }}
                            >
                                New to Flipkart? Create an account
                            </div>
                        ) : (
                            <div
                                className="_sign_015"
                                onClick={() => {
                                    setLoginType("Login");
                                    handleInputClear(setHelperText, setFormData);
                                }}
                            >
                                Already a user? Login to your account
                            </div>
                        )}
                    </div>
                )}
            </form>
            {id === 1 && (
                <>
                    <div className="_sign_014">
                        {loginType === "Login" ? (
                            <div
                                className="_sign_015"
                                onClick={() => {
                                    setLoginType("Sign Up");
                                    handleInputClear(setHelperText, setFormData);
                                }}
                            >
                                New to Flipkart? Create an account
                            </div>
                        ) : (
                            <div
                                className="_sign_015"
                                onClick={() => {
                                    setLoginType("Login");
                                    handleInputClear(setHelperText, setFormData);
                                }}
                            >
                                Already a user? Login to your account
                            </div>
                        )}
                    </div>

                    <div className="_sign_016">
                        <span onClick={handleClose}>
                            <ArrowBackIcon fontSize="small" /> Back
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(LoginForm);
