import { useState } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import {List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Account = ({ id }) => {
    console.log(id)
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(Number(id));

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div style={{
            margin: '0px auto',
            // maxWidth: '1366px',
            // minWidth: '1128px'
        }}>
            <div style={{
                margin: '0px auto',
                position: 'relative',
                padding: '14px 64px 0px',
                width: '100%',
                display: 'flex',
            }}>
                <div style={{
                    width: '25%',
                    height: 'fit-content'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '2px',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)',
                        padding: '12px',
                        marginBottom: '16px',
                        width: '100%',
                        display: 'flex',
                    }}>
                        <div style={{
                            borderRadius: '50%',
                            backgroundColor: '#ffc107',
                            padding: '5px',
                        }}>
                            <ManageAccountsIcon fontSize='large' />
                        </div>
                        <div style={{
                            padding: '5px 0px 0px 16px'
                        }}>
                            <div style={{
                                fontSize: '12px'
                            }}>Hello,</div>
                            <div style={{
                                paddingTop: '3px',
                                fontSize: '16px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'capitalize',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>Aniket Linge</div>
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '2px',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)',
                        marginBottom: '16px'
                    }}>
                        <div>

                            <div style={{
                                paddingBottom: '12px'
                            }}>
                                <div style={{
                                    padding: '20px 12px 5px 24px',
                                    width: '100%',
                                    display: 'flex'
                                }}>
                                    <ShoppingBasketIcon sx={{
                                        color: '#2874f0'
                                    }} />
                                    <span style={{
                                        // width: calc(100% - 26px);
                                        paddingLeft: '20px',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: 'rgb(135, 135, 135)',
                                        width: '100%',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                    }}>
                                        My Orders
                                        <ArrowForwardIosIcon fontSize='small' sx={{
                                            float: 'right'
                                        }} />
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                borderBottom: '1px solid rgb(240, 240, 240)'
                            }}>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                paddingBottom: '12px'
                            }}>
                                <div style={{
                                    padding: '20px 12px 5px 24px',
                                    width: '100%',
                                    display: 'flex'
                                }}>
                                    <PersonIcon sx={{
                                        color: '#2874f0'
                                    }} />
                                    <span style={{
                                        // width: calc(100% - 26px);
                                        paddingLeft: '20px',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: 'rgb(135, 135, 135)',
                                        width: '100%',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                    }}>
                                        Account Settings
                                    </span>
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
                            <div style={{
                                borderBottom: '1px solid rgb(240, 240, 240)'
                            }}>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                paddingBottom: '12px'
                            }}>
                                <div style={{
                                    padding: '20px 12px 5px 24px',
                                    width: '100%',
                                    display: 'flex'
                                }}>
                                    <FolderSharedIcon sx={{
                                        color: '#2874f0'
                                    }} />
                                    <span style={{
                                        // width: calc(100% - 26px);
                                        paddingLeft: '20px',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: 'rgb(135, 135, 135)',
                                        width: '100%',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                    }}>
                                        My stuff
                                    </span>
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
                            <div style={{
                                borderBottom: '1px solid rgb(240, 240, 240)'
                            }}>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                paddingBottom: '12px'
                            }}>
                                <div style={{
                                    padding: '20px 12px 5px 24px',
                                    width: '100%',
                                    display: 'flex'
                                }}>
                                    <PowerSettingsNewIcon sx={{
                                        color: '#2874f0'
                                    }} />
                                    <span style={{
                                        // width: calc(100% - 26px);
                                        paddingLeft: '20px',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: 'rgb(135, 135, 135)',
                                        width: '100%',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                    }}>
                                        Logout
                                    </span>
                                </div>

                            </div>
                            <div style={{
                                borderBottom: '1px solid rgb(240, 240, 240)'
                            }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    width: '75%',
                    paddingLeft: '16px'
                }}>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default Account;