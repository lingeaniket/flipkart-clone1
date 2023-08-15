import { useEffect, useState } from 'react';
import './Styles/manageAccountStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateUserData } from '../Features/User/userSlice';
import { TextField } from '@mui/material';
import { handleEditFunc } from './Functions/manageAccountFunctions';
import { setMessage, setOpen } from '../Features/SnackBar/snackbarSlice';
const ManageAccount = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userType = searchParams.get('userType');
    const isCheckOut = useSelector(state => state.orderDetailsState.checkout);
    const singleOrder = useSelector(state => state.orderDetailsState.singleOrder);
    const userData = useSelector(state => state.userState.userData);
    const [editState, setEditState] = useState([false, false, false]);
    const [userdata, setUserdata] = useState({})
    const [currentUserdata, setCurrentUserdata] = useState({})
    const [error , setError] = useState(false)
    const handleEdit = (index) => {
        handleEditFunc(index, editState, setEditState, userdata, setCurrentUserdata);
        setError((prevState)=> prevState)
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentUserdata((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleForm = ()=>{
        return (currentUserdata.firstName && currentUserdata.lastName && currentUserdata.email && currentUserdata.mobileNumber)
    }

    const handleFirsttuser = () => {
        const formFilled = handleForm();
        if(formFilled) {
            dispatch(setMessage('Details Updated'))
            dispatch(setOpen(true))
            setTimeout(()=> {
                dispatch(updateUserData(currentUserdata))
                if (singleOrder.length > 0) {
                    navigate(`/checkout?item-id=${singleOrder[0].id}`)
                } else if (isCheckOut) {
                    navigate('/checkout');
                } else {
                    navigate('/');
                }
            }, 2000)
        } else {
            setError(true);
        }
    }

    const handleSave = (index) => {
        setError(false)
        if (!userType) {
            editState[index] = false;
            setEditState((prevState) => ([...prevState]))
        }
        dispatch(setMessage('Details Updated'));
        dispatch(setOpen(true))
        dispatch(updateUserData(currentUserdata))
    }

    useEffect(() => {
        if (userType) {
            setEditState(() => ([true, true, true]))
        }
        setUserdata(() => userData);
        setCurrentUserdata(() => userData);
        // eslint-disable-next-line
    }, [userData])

    return (
        <div className='_manageAcc_001'>
            <div className='_manageAcc_002'>
                <div className='_manageAcc_003'>
                    <div className='_manageAcc_004'>
                        <span className='_manageAcc_005'>Personal Information</span>
                        {userType
                            ? null
                            :
                            <span className='_manageAcc_006' onClick={() => {
                                handleEdit(0);
                            }}>{editState[0] ? 'Cancel' : 'Edit'}</span>
                        }
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSave(0);
                    }}>
                        <div className='_manageAcc_007'>
                            <div className='_manageAcc_008'>
                                <div className='_manageAcc_009'>
                                    <TextField
                                        className='_manageAcc_010'
                                        name='firstName'
                                        disabled={!editState[0]}
                                        autoComplete='off'
                                        required
                                        type='text'
                                        error={error && !currentUserdata.firstName}
                                        helperText={error && !currentUserdata.firstName ? 'Fill this' : ''}
                                        value={currentUserdata.firstName}
                                        onChange={handleInput}
                                        label={editState[0] ? 'First Name' : ''}
                                    />
                                </div>
                            </div>
                            <div className='_manageAcc_008'>
                                <div className='_manageAcc_009'>
                                    <TextField
                                        className='_manageAcc_010' name='lastName' disabled={!editState[0]} autoComplete='off'
                                        type="text"
                                        value={currentUserdata.lastName}
                                        onChange={handleInput}
                                        required
                                        error={error && !currentUserdata.lastName}
                                        helperText={error && !currentUserdata.lastName ? 'Fill this' : ''}
                                        label={editState[0] ? 'Last Name' : ''}
                                    />
                                </div>
                            </div>
                            {(editState[0] && !userType)
                                &&
                                <button className='_manageAcc_014' type='submit'>Save</button>
                            }
                        </div>
                        <div className='_manageAcc_011'>Your gender</div>
                        <div>
                            <label className='_manageAcc_012'>
                                <input name='gender' disabled={!editState[0]} required
                                    type="radio" value="male" checked={currentUserdata.gender === 'male'} onChange={handleInput} />
                                <div className='_manageAcc_013'>Male</div>
                            </label>
                            <label className='_manageAcc_012'>
                                <input name='gender' disabled={!editState[0]} required
                                    type="radio" value="female" checked={currentUserdata.gender === 'female'} onChange={handleInput} />
                                <div className='_manageAcc_013'>Female</div>
                            </label>
                        </div>
                    </form>
                </div>
                <div>
                    <div className='_manageAcc_003'>
                        <div className='_manageAcc_004'>
                            <span className='_manageAcc_005'>Email Address</span>
                            {userType
                                ?
                                null
                                :
                                <span className='_manageAcc_006' onClick={() => {
                                    handleEdit(1);
                                }}>{editState[1] ? 'Cancel' : 'Edit'}</span>
                            }
                        </div>
                        <form onSubmit={(event)=> {
                            event.preventDefault();
                            handleSave(1);
                        }}>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <TextField
                                            autoComplete='off' disabled={!editState[1]}
                                            type="text"
                                            name='email'
                                            error={error && !currentUserdata.email}
                                            helperText={error && !currentUserdata.email ? 'Fill this' : ''}
                                            required
                                            className='_manageAcc_010'
                                            value={currentUserdata.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                {(editState[1] && !userType)
                                    &&
                                    <button className='_manageAcc_014' type='submit'>Save</button>
                                }
                            </div>
                        </form>
                    </div>
                    <div className='_manageAcc_003'>
                        <div className='_manageAcc_004'>
                            <span className='_manageAcc_005'>Mobile Number</span>
                            {userType
                                ?
                                null
                                :
                                <span className='_manageAcc_006' onClick={() => {
                                    handleEdit(2);
                                }}>{editState[2] ? 'Cancel' : 'Edit'}</span>
                            }
                        </div>
                        <form onSubmit={(event)=> {
                            event.preventDefault();
                            handleSave(2)
                        }}>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <TextField className='_manageAcc_010' autoComplete='off' disabled={!editState[2]}
                                            name='mobileNumber'
                                            value={currentUserdata.mobileNumber}
                                            error={error && !currentUserdata.mobileNumber}
                                            helperText={error && !currentUserdata.mobileNumber ? 'Fill this' : ''}
                                            onChange={handleInput}
                                            type="text" />
                                    </div>
                                </div>
                                {(editState[2] && !userType)
                                    &&
                                    <button className='_manageAcc_014' type='submit'>Save</button>
                                }
                            </div>
                        </form>
                        {userType &&
                            <div>
                                <button className='_manageAcc_014' onClick={handleFirsttuser}>Save</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>
                <img src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt=""
                    width={'100%'} height={'auto'}
                    style={{
                        verticalAlign: 'middle',
                    }}
                />
            </div>
        </div >
    )
}

export default ManageAccount;