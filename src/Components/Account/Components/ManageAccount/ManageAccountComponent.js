import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import AccountForm from "./Components/AccountFormComponent";

import { updateUserData } from "../../../Features/User/userSlice";
import { setMessage, setOpen } from "../../../Features/SnackBar/snackbarSlice";
import { handleEditFunc, handleFirstuser } from "../../Functions/manageAccountFunctions";

import { TextField } from "@mui/material";

import "../../Styles/manageAccountStyles.css";

const ManageAccount = () => {
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("userType");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userState.userData);
    const isCheckOut = useSelector((state) => state.orderDetailsState.checkout);
    const singleOrder = useSelector((state) => state.orderDetailsState.singleOrder);

    const [error, setError] = useState(false);
    const [userdata, setUserdata] = useState({});
    const [editState, setEditState] = useState([false, false, false]);
    const [currentUserdata, setCurrentUserdata] = useState({});

    const handleEdit = (index) => {
        handleEditFunc(index, editState, setEditState, userdata, setCurrentUserdata);
        setError((prevState) => prevState);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentUserdata((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleForm = () => {
        return currentUserdata.firstName && currentUserdata.lastName && currentUserdata.email && currentUserdata.mobileNumber;
    };

    const handleSave = (index) => {
        setError(false);
        if (!userType) {
            editState[index] = false;
            setEditState((prevState) => [...prevState]);
        }
        dispatch(setMessage("Details Updated"));
        dispatch(setOpen(true));
        dispatch(updateUserData(currentUserdata));
    };

    const handleUser = () => {
        const formFilled = handleForm();
        if (formFilled) {
            handleFirstuser(dispatch, navigate, isCheckOut, singleOrder, currentUserdata);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (userType) {
            setEditState(() => [true, true, true]);
        }
        setUserdata(() => userData);
        setCurrentUserdata(() => userData);
        // eslint-disable-next-line
    }, [userData]);

    return (
        <div className="_manageAcc_001">
            <div className="_manageAcc_002">
                <div className="_manageAcc_003">
                    <div className="_manageAcc_004">
                        <span className="_manageAcc_005">Personal Information</span>
                        {userType ? null : (
                            <span
                                className="_manageAcc_006"
                                onClick={() => {
                                    handleEdit(0);
                                }}
                            >
                                {editState[0] ? "Cancel" : "Edit"}
                            </span>
                        )}
                    </div>
                    <AccountForm
                        handleSave={handleSave}
                        currentUserdata={currentUserdata}
                        editState={editState}
                        error={error}
                        handleInput={handleInput}
                    />
                </div>
                <div>
                    <div className="_manageAcc_003">
                        <div className="_manageAcc_004">
                            <span className="_manageAcc_005">Email Address</span>
                            {userType ? null : (
                                <span
                                    className="_manageAcc_006"
                                    onClick={() => {
                                        handleEdit(1);
                                    }}
                                >
                                    {editState[1] ? "Cancel" : "Edit"}
                                </span>
                            )}
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSave(1);
                            }}
                        >
                            <div className="_manageAcc_007">
                                <div className="_manageAcc_008">
                                    <div className="_manageAcc_009">
                                        <TextField
                                            autoComplete="off"
                                            disabled={!editState[1]}
                                            type="text"
                                            name="email"
                                            error={error && !currentUserdata.email}
                                            helperText={error && !currentUserdata.email ? "Fill this" : ""}
                                            required
                                            className="_manageAcc_010"
                                            value={currentUserdata.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                {editState[1] && !userType && (
                                    <button className="_manageAcc_014" type="submit">
                                        Save
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="_manageAcc_003">
                        <div className="_manageAcc_004">
                            <span className="_manageAcc_005">Mobile Number</span>
                            {userType ? null : (
                                <span
                                    className="_manageAcc_006"
                                    onClick={() => {
                                        handleEdit(2);
                                    }}
                                >
                                    {editState[2] ? "Cancel" : "Edit"}
                                </span>
                            )}
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSave(2);
                            }}
                        >
                            <div className="_manageAcc_007">
                                <div className="_manageAcc_008">
                                    <div className="_manageAcc_009">
                                        <TextField
                                            className="_manageAcc_010"
                                            autoComplete="off"
                                            disabled={!editState[2]}
                                            name="mobileNumber"
                                            value={currentUserdata.mobileNumber}
                                            error={error && !currentUserdata.mobileNumber}
                                            helperText={error && !currentUserdata.mobileNumber ? "Fill this" : ""}
                                            onChange={handleInput}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                {editState[2] && !userType && (
                                    <button className="_manageAcc_014" type="submit">
                                        Save
                                    </button>
                                )}
                            </div>
                        </form>
                        {userType && (
                            <div>
                                <button className="_manageAcc_014" onClick={handleUser}>
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                    alt=""
                    width={"100%"}
                    height={"auto"}
                    style={{
                        verticalAlign: "middle",
                    }}
                />
            </div>
        </div>
    );
};

export default memo(ManageAccount);
