import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import '../Styles/accountStyles.css'

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Account = ({ id }) => {
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(Number(id));

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className='_acc_001'>
            <div className='_acc_002'>
                <div className='_acc_003'>
                    <div className='_acc_004'>
                        <div className='_acc_005'>
                            <ManageAccountsIcon fontSize='large' />
                        </div>
                        <div className='_acc_006'>
                            <div className='_acc_007'>Hello,</div>
                            <div className='_acc_008'>Aniket Linge</div>
                        </div>
                    </div>
                    <div className='_acc_009'>
                        <div>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <ShoppingBasketIcon sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>
                                        My Orders
                                        <ArrowForwardIosIcon fontSize='small' sx={{ float: 'right' }} />
                                    </span>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                        <div>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <PersonIcon sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>Account Settings</span>
                                </div>
                                <div>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItemButton
                                            selected={selectedIndex === 0}
                                            onClick={(event) => { handleListItemClick(event, 0); navigate('/account') }}
                                        >
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
                        <div>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <FolderSharedIcon sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>My stuff</span>
                                </div>
                                <div>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItemButton
                                            selected={selectedIndex === 1}
                                            onClick={(event) => {
                                                handleListItemClick(event, 1);
                                                navigate('/wishlist')
                                            }}
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <ListItemText primary="Wishlist" primaryTypographyProps={{ fontSize: '14px', color: `${selectedIndex === 1 && '#2874f0'}` }} />
                                        </ListItemButton>
                                    </List>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                        <div>
                            <div className='_acc_010'>
                                <div className='_acc_011'>
                                    <PowerSettingsNewIcon sx={{ color: '#2874f0' }} />
                                    <span className='_acc_012'>Logout</span>
                                </div>
                            </div>
                            <div className='_acc_013'></div>
                        </div>
                    </div>
                </div>
                <div className='_acc_014'><Outlet /></div>
            </div>
        </div >
    )
}

export default Account;