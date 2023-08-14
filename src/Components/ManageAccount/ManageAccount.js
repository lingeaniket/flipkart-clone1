import { useEffect, useState } from 'react';
import './Styles/manageAccountStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateUserData } from '../Features/User/userSlice';
import { TextField } from '@mui/material';
import { handleEditFunc } from './Functions/manageAccountFunctions';
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
    const handleEdit = (index) => {
        handleEditFunc(index, editState, setEditState, userdata, setCurrentUserdata)
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentUserdata((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleFirsttuser=()=>{
        if (singleOrder.length > 0) {
            navigate(`/checkout?item-id=${singleOrder[0].id}`)
        } else if (isCheckOut) {
            navigate('/checkout');
        } else {
            navigate('/');
        }
        dispatch(updateUserData(currentUserdata))
    }
    
    const handleSave = (index) => {
        if (!userType) {
            editState[index] = false;
            setEditState((prevState) => ([...prevState]))
        }
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
                    <div>
                        <div className='_manageAcc_007'>
                            <div className='_manageAcc_008'>
                                <div className='_manageAcc_009'>
                                    <TextField
                                        className='_manageAcc_010'
                                        name='firstName'
                                        disabled={!editState[0]}
                                        autoComplete='off'
                                        type='text'
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
                                        label={editState[0] ? 'Last Name' : ''}
                                    />
                                </div>
                            </div>
                            {(editState[0] && !userType)
                                &&
                                <button className='_manageAcc_014' onClick={() => { handleSave(0) }}>Save</button>
                            }
                        </div>
                        <div className='_manageAcc_011'>Your gender</div>
                        <div>
                            <label className='_manageAcc_012'>
                                <input name='gender' disabled={!editState[0]}
                                    type="radio" value="male" checked={currentUserdata.gender === 'male'} onChange={handleInput} />
                                <div className='_manageAcc_013'>Male</div>
                            </label>
                            <label className='_manageAcc_012'>
                                <input name='gender' disabled={!editState[0]}
                                    type="radio" value="female" checked={currentUserdata.gender === 'female'} onChange={handleInput} />
                                <div className='_manageAcc_013'>Female</div>
                            </label>
                        </div>
                    </div>
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
                        <div>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <TextField
                                            autoComplete='off' disabled={!editState[1]}
                                            type="text"
                                            name='email'
                                            className='_manageAcc_010'
                                            value={currentUserdata.email}
                                            onChange={handleInput}

                                        />

                                    </div>
                                </div>
                                {(editState[1] && !userType)
                                    &&
                                    <button className='_manageAcc_014' onClick={() => { handleSave(1) }}>Save</button>
                                }
                            </div>
                        </div>
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
                        <div>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <TextField className='_manageAcc_010' autoComplete='off' disabled={!editState[2]}
                                            name='mobileNumber'
                                            value={currentUserdata.mobileNumber}
                                            onChange={handleInput}
                                            type="text" />
                                    </div>
                                </div>
                                {(editState[2] && !userType)
                                    &&
                                    <button className='_manageAcc_014' onClick={() => { handleSave(2) }}>Save</button>
                                }
                            </div>
                        </div>
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