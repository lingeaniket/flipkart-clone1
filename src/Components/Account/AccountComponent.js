import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

import './Styles/accountStyles.css'
import { logoutUser } from '../Features/User/userSlice';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import {
    Person, FolderShared, ManageAccounts, ShoppingBasket, SettingsRounded,
    ArrowForwardIos, PowerSettingsNew, ShoppingBagRounded, FavoriteBorderRounded
} from '@mui/icons-material';

const Account = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(Number(id));

    const userData = useSelector(state => state.userState.userData);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className='_acc_001'>
            <div className='_acc_002'>
                <div className='_acc_003'>
                    <div className='_acc_004'>
                        <div style={{ display: 'flex' }}>
                            <div className='_acc_005'>
                                <ManageAccounts fontSize='large' />
                            </div>
                            <div className='_acc_006'>
                                <div className='_acc_007'>Hello,</div>
                                <div className='_acc_008'>{userData.firstName} {userData.lastName}</div>
                            </div>
                        </div>
                        <div className='_acc_016' >
                            <SettingsRounded fontSize='small' />
                            <span className='_acc_020' onClick={() => {
                                handleListItemClick(0);
                                navigate('/account');
                            }}>
                                Account Settings
                            </span>
                        </div>
                    </div>
                    <div className='_acc_009'>
                        <div className='_acc_021'>
                            <div className='_acc_022' onClick={() => { navigate('/orders') }}>
                                <ShoppingBagRounded color='primary' />
                                <span style={{ marginLeft: '10px' }}>Orders</span>
                            </div>
                            <div className='_acc_023' onClick={() => {
                                handleListItemClick(1);
                                navigate('/wishlist');
                            }}>
                                <FavoriteBorderRounded color='primary' />
                                <span style={{ marginLeft: '10px' }}>Wishlist</span>
                            </div>
                        </div>
                        <div className='_acc_015'>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <ShoppingBasket sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012' style={{ width: '100%' }} onClick={() => { navigate('/orders') }}>
                                        My Orders
                                        <ArrowForwardIos fontSize='small' sx={{ float: 'right' }} />
                                    </span>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                        <div className='_acc_015'>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <Person sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>Account Settings</span>
                                </div>
                                <div>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItemButton selected={selectedIndex === 0} onClick={() => {
                                            handleListItemClick(0);
                                            navigate('/account');
                                        }}>
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <ListItemText primary="Profile Information" primaryTypographyProps={{
                                                fontSize: '14px', color: `${selectedIndex === 0 && '#2874f0'}`
                                            }} />
                                        </ListItemButton>
                                    </List>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                        <div className='_acc_015'>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <FolderShared sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>My stuff</span>
                                </div>
                                <div>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItemButton selected={selectedIndex === 1} onClick={() => {
                                            handleListItemClick(1);
                                            navigate('/wishlist');
                                        }}>
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <ListItemText primary="Wishlist" primaryTypographyProps={{ fontSize: '14px', color: `${selectedIndex === 1 && '#2874f0'}` }} />
                                        </ListItemButton>
                                    </List>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                        <div className='_acc_015'>
                            <div className='_acc_010'>
                                <div className='_acc_011' onClick={() => { dispatch(logoutUser()) }}>
                                    <PowerSettingsNew sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>Logout</span>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                    </div>
                </div>
                <div className='_acc_014'><Outlet /></div>
                <div className='_acc_017'>
                    <div className='_acc_018' onClick={() => { dispatch(logoutUser()) }}>
                        <PowerSettingsNew fontSize='small' color='error' />
                        <span className='_acc_019'>Logout</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Account;