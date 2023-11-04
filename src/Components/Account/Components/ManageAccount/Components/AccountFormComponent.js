import { useSearchParams } from "react-router-dom";

import { TextField } from "@mui/material";

const AccountForm = (props) => {
    const { handleSave, currentUserdata, editState, error, handleInput } = props;

    const [searchParams] = useSearchParams();
    const userType = searchParams.get("userType");

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSave(0);
            }}
        >
            <div className="_manageAcc_007">
                <div className="_manageAcc_008">
                    <div className="_manageAcc_009">
                        <TextField
                            className="_manageAcc_010"
                            name="firstName"
                            disabled={!editState[0]}
                            autoComplete="off"
                            required
                            type="text"
                            error={error && !currentUserdata.firstName}
                            helperText={error && !currentUserdata.firstName ? "Fill this" : ""}
                            value={currentUserdata.firstName}
                            onChange={handleInput}
                            label={editState[0] ? "First Name" : ""}
                        />
                    </div>
                </div>
                <div className="_manageAcc_008">
                    <div className="_manageAcc_009">
                        <TextField
                            className="_manageAcc_010"
                            name="lastName"
                            disabled={!editState[0]}
                            autoComplete="off"
                            type="text"
                            value={currentUserdata.lastName}
                            onChange={handleInput}
                            required
                            error={error && !currentUserdata.lastName}
                            helperText={error && !currentUserdata.lastName ? "Fill this" : ""}
                            label={editState[0] ? "Last Name" : ""}
                        />
                    </div>
                </div>
                {editState[0] && !userType && (
                    <button className="_manageAcc_014" type="submit">
                        Save
                    </button>
                )}
            </div>
            <div className="_manageAcc_011">Your gender</div>
            <div>
                <label className="_manageAcc_012">
                    <input
                        name="gender"
                        disabled={!editState[0]}
                        required
                        type="radio"
                        value="male"
                        checked={currentUserdata.gender === "male"}
                        onChange={handleInput}
                    />
                    <div className="_manageAcc_013">Male</div>
                </label>
                <label className="_manageAcc_012">
                    <input
                        name="gender"
                        disabled={!editState[0]}
                        required
                        type="radio"
                        value="female"
                        checked={currentUserdata.gender === "female"}
                        onChange={handleInput}
                    />
                    <div className="_manageAcc_013">Female</div>
                </label>
            </div>
        </form>
    );
};

export default AccountForm;
