import React, {useLayoutEffect} from 'react'
import './login.css'
import { TextField, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// import rootContext from '../../Context/RootContext/rootContext';
import { useContext } from 'react';

const Login = () => {
    // const {setRootPage} = useContext(rootContext)
    const navigate = useNavigate();

    useLayoutEffect(()=>{
        localStorage.getItem('isloggedIn') && navigate('/');
    })

    return (
        <div className='loginMain'>

            <Box className='loginContainer'
                sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: '#d0cdef',

                }}
            >
                <div className='loginTitle'>Login</div>
                <div className='flexCenter'>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        console.log('loginSubmit')
                        const formData = new FormData(event.target);
                        const username = formData.get('username');
                        const password = formData.get('password');
                        if (username === 'admin' && password === 'admin') {
                            localStorage.setItem('isloggedIn', true);
                            // setRootPage('true');
                            // localStorage.setItem('rootPage', true);
                            navigate('/');
                        }
                    }}>

                        <div style={{ padding: '2%' }}>

                            <TextField className='textField'
                                helperText="Please enter your username"
                                id="demo-helper-text-misaligned"
                                label="Name"
                                name='username'
                            />
                        </div>
                        <div>

                            <TextField className='textField'
                                helperText="Please enter your passsword"
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name='password'
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <Button
                                color="primary"
                                size="medium"
                                variant="contained"
                                type="submit"
                            >Login</Button>
                        </div>
                    </form>
                </div>
            </Box>
        </div>

    )
}

export default Login;