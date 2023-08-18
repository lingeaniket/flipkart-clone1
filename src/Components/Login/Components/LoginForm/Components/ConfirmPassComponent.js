import { TextField } from "@mui/material";

const ConfirmPassComponent = (props) => {
    const {formData, handleInput} = props;
    
    return (
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
    )
}

export default ConfirmPassComponent