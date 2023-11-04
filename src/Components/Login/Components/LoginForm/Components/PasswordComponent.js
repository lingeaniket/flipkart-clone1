import { memo } from "react";

import { TextField } from "@mui/material";

const PasswordComponent = (props) => {
    const { loginType, helperText, handleInput, formData } = props;

    return (
        <div className="_sign_009">
            {loginType === "Login" ? (
                <TextField
                    type="password"
                    autoComplete="new-password"
                    required
                    id="loginPassword"
                    name="loginPassword"
                    label="Enter Password"
                    variant="standard"
                    sx={{
                        width: "100%",
                    }}
                    error={helperText.loginCredentialsError.length > 0 ? true : false}
                    value={formData.loginPassword}
                    onInput={handleInput}
                />
            ) : (
                <TextField
                    type="password"
                    autoComplete="new-password"
                    required
                    id="signUpPassword"
                    name="signUpPassword"
                    label="Create Password"
                    variant="standard"
                    sx={{
                        width: "100%",
                    }}
                    error={formData.signUpPassword.length > 0 ? (formData.signUpPassword.length < 8 ? true : false) : false}
                    value={formData.signUpPassword}
                    helperText={
                        formData.signUpPassword.length > 0
                            ? formData.signUpPassword.length < 8
                                ? "Password should be at least 8 characters"
                                : ""
                            : ""
                    }
                    onChange={handleInput}
                />
            )}
        </div>
    );
};

export default memo(PasswordComponent);
