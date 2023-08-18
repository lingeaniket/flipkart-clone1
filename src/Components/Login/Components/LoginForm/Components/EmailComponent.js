import { TextField } from "@mui/material";

const EmailComponent = (props) => {
    const {helperText, loginType, formData, handleInput} = props;
    
    return (
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
    )
}

export default EmailComponent;