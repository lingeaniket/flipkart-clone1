import { Paper, Button, TextField } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import CartElement from "../../CartElement/Component/cartElement";
const Checkout = () => {
    return (
        <Paper className="cartMainPaper" sx={{ backgroundColor: 'transparent' }} elevation={0}>
            <Paper elevation={1} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                <Paper sx={{ padding: '0 0 10px', backgroundColor: 'transparent', }} elevation={0}>
                    <div style={{
                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)',
                        borderRadius: '5px',
                        padding: '16px 24px',
                        backgroundColor: 'white',
                        minHeight: '72px',
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}>
                        <h3 style={{
                            padding: 0,
                            height: '48px',
                            textTransform: 'uppercase',
                            color: '#878787',
                            fontSize: '16px',
                            fontWeight: 500,
                            borderRadius: '2px 2px 0 0'

                        }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#2874f0',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '2px',
                                padding: '3px 7px',
                                verticalAlign: 'baseline',
                                marginRight: '17px'
                            }}>1</span>
                        </h3>
                        <div style={{ display: 'inline-block' }}>
                            <div style={{
                                color: '#878787',
                                fontSize: '16px',
                                fontWeight: 500,
                                marginBottom: '6px',
                                textTransform: 'uppercase',
                            }}>
                                Login
                                <DoneIcon fontSize="small" sx={{
                                    verticalAlign: 'top',
                                    height: '20px',
                                    marginLeft: '8px'
                                }} />
                            </div>
                            <div style={{
                                fontSize: '14px'
                            }}>
                                <span style={{
                                    fontWeight: 500,
                                    color: '#212121'
                                }}>Aniket Linge</span>
                                <span style={{ marginLeft: '6px' }}>+91 7030325245</span>
                            </div>
                        </div>
                        <div>
                            <Button className="addressChangeButton">Change</Button>
                        </div>
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div style={{
                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)',
                        borderRadius: '5px',
                        minHeight: '72px',
                    }}>
                        <h3 style={{
                            height: '48px',
                            textTransform: 'uppercase',
                            color: '#fff',
                            backgroundColor: '#2874f0',
                            fontSize: '16px',
                            fontWeight: 500,
                            padding: '14px 24px',
                            marginBottom: '0',
                            borderRadius: '2px 2px 0 0'
                        }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#2874f0',
                                borderRadius: '2px',
                                padding: '3px 7px',
                                verticalAlign: 'baseline',
                                marginRight: '17px',
                                backgroundColor: '#fff',
                                position: 'relative',
                                top: '-2px'
                            }}>2</span>
                            <span>Delivery Address</span>
                        </h3>
                        <div style={{
                            position: 'relative',
                        }}>
                            <div style={{
                                marginBottom: '10px',
                                backgroundColor: 'white'
                            }}>
                                <label htmlFor="1258" style={{
                                    padding: '16px 24px 12px', width: '100%', display: 'flex',
                                    // if selected
                                    backgroundColor: '#f5faff'
                                }}>
                                    <div>
                                        <input type="radio" id="1258" name="address" />
                                    </div>
                                    <div style={{ marginLeft: '18px', width: '100%', display: 'inline-block' }}>
                                        {/* if not edited */}
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                        }}>
                                            <div style={{
                                                float: 'left',
                                                cursor: 'pointer',
                                                width: '75%'
                                            }}>
                                                <p style={{ lineHeight: 1.5 }}>
                                                    <span style={{
                                                        fontWeight: '500'
                                                    }}>Aniket Linge</span>
                                                    <span style={{
                                                        fontWeight: '500',
                                                        margin: '0 0 0 11px',
                                                        textTransform: 'uppercase',
                                                        fontSize: '11px',
                                                        color: '#878787',
                                                        verticalAlign: 'middle',
                                                        padding: '4px 7px',
                                                        borderRadius: '2px',
                                                        backgroundColor: '#f0f0f0',
                                                    }}>HOME</span>
                                                    <span style={{
                                                        fontWeight: '500',
                                                        margin: '0 0 0 11px',
                                                    }}>7030325245</span>
                                                </p>
                                                <span style={{
                                                    marginTop: '10px',
                                                    lineHeight: '1.5',
                                                    display: 'block'
                                                }}>Boys Hostel, Near Baramati Bank, Nityanand Society, Balaji Nagar Dhankawadi, Pune, Maharashtra -
                                                    <span style={{
                                                        fontWeight: '500'
                                                    }}>413308
                                                    </span>
                                                </span>
                                                {/* if selected */}

                                                <button style={{
                                                    background: '#fb641b',
                                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                                    border: 'none',
                                                    color: '#fff',
                                                    fontSize: '14px',
                                                    width: '200px',
                                                    height: '48px',
                                                    marginTop: '12px',
                                                    display: 'inline-block',
                                                    textTransform: 'uppercase',
                                                    borderRadius: '2px',
                                                    padding: '10px 20px',
                                                    fontWeight: 500,
                                                    transition: 'box-shadow .2s ease',
                                                    verticalAlign: 'super',
                                                    outline: 'none'
                                                }}>Deliver Here</button>

                                            </div>
                                            {/* if selected */}
                                            <div style={{ float: 'right', width: '25%' }}>
                                                <button style={{
                                                    fontSize: '14px',
                                                    color: '#2874f0',
                                                    border: 0,
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                    float: 'right'
                                                }}>EDIT</button>
                                            </div>
                                        </div>
                                        {/* if edited */}
                                        <div style={{
                                            width: '80%'
                                        }}>
                                            <form>
                                                <span style={{
                                                    color: '#2874f0',
                                                    fontWeight: 500
                                                }}>EDIT ADDRESS</span>
                                                <div style={{
                                                    marginTop: '16px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '15px',
                                                    }}>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Name"
                                                                name="id_name"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="10 digit mobile number"
                                                                name="id_phone"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '15px',
                                                    }}>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Pincode"
                                                                name="id_pincode"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Locality"
                                                                name="id_locality"

                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '15px',
                                                    }}>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '100%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Address (Area and Street)"
                                                                multiline
                                                                rows={3}
                                                                name="id_address"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '15px',
                                                    }}>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="City/District/Town"
                                                                name="id_area"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="State"
                                                                name="id_state"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '15px',
                                                    }}>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                id="outlined-required"
                                                                label="Landmark (Optional)"
                                                                name="id_landmark"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{
                                                            position: 'relative',
                                                            marginRight: '10px',
                                                            width: '50%'
                                                        }}>
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Alternate Phone (Optional)"
                                                                name="id_alt_phone"
                                                                sx={{
                                                                    backgroundColor: 'white',
                                                                    width: '100%'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        paddingLeft: '13px',
                                                        width: '100%',
                                                        marginTop: '8px',
                                                        marginBottom: '8px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '12px',
                                                            color: '#878787',
                                                            marginBottom: '10px'
                                                        }}>Address Type</p>
                                                        <div style={{
                                                            marginBottom: '16px',
                                                            width: '100%'
                                                        }}>
                                                            <div style={{ display: 'flex' }}>
                                                                <label htmlFor="" style={{

                                                                    marginRight: '32px', display: 'flex'
                                                                }}>
                                                                    <div>
                                                                        <input type="radio" name="" id="" />
                                                                    </div>
                                                                    <div style={{
                                                                        marginLeft: '12px',
                                                                        width: 'auto',
                                                                        display: 'inline-block'
                                                                    }}>
                                                                        <span>Home (All day delivery)</span>
                                                                    </div>
                                                                </label>
                                                                <label htmlFor="" style={{
                                                                    display: 'inline-block',
                                                                    marginRight: '32px'
                                                                }}>
                                                                    <input type="radio" name="" id="" />
                                                                    <div style={{
                                                                        marginLeft: '12px',
                                                                        width: 'auto',
                                                                        display: 'inline-block'
                                                                    }}>
                                                                        <span>Work (Delivery between 10 AM - 6 PM)</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        marginTop: '30px',
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                    }}>
                                                        <button style={{
                                                            background: '#fb641b',
                                                            boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                                            border: 'none',
                                                            color: '#fff',
                                                            fontSize: '14px',
                                                            height: '48px',
                                                            display: 'inline-block',
                                                            textTransform: 'uppercase',
                                                            borderRadius: '2px',
                                                            padding: '10px 20px',
                                                            fontWeight: 500,
                                                            transition: 'box-shadow .2s ease',
                                                            verticalAlign: 'super',
                                                            outline: 'none'
                                                        }}>save and Deliver Here</button>
                                                        <button style={{
                                                            fontSize: '14px',
                                                            color: '#2874f0',
                                                            border: 0,
                                                            background: 'none',
                                                            cursor: 'pointer',
                                                            outline: 'none',
                                                            float: 'right',
                                                            display: 'inline-block',
                                                            marginLeft: '20px'
                                                        }}>CANCEL</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </label>
                                {/* address map ended */}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                color: '#2874f0',
                                fontWeight: 500,
                                padding: '16px 0',
                                backgroundColor: 'white',
                                borderBottom: '1px solid #f0f0f0',
                                cursor: 'pointer'
                            }}>
                                <AddIcon sx={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }} /> Add a new address
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div style={{
                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)',
                        borderRadius: '5px',
                        minHeight: '72px',
                    }}>
                        <h3 style={{
                            height: '48px',
                            textTransform: 'uppercase',
                            color: '#fff',
                            backgroundColor: '#2874f0',
                            fontSize: '16px',
                            fontWeight: 500,
                            padding: '14px 24px',
                            marginBottom: '0',
                            borderRadius: '2px 2px 0 0'
                        }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#2874f0',
                                borderRadius: '2px',
                                padding: '3px 7px',
                                verticalAlign: 'baseline',
                                marginRight: '17px',
                                backgroundColor: '#fff',
                                position: 'relative',
                                top: '-2px'
                            }}>3</span>
                            <span>Order Summary</span>
                        </h3>
                        <div style={{
                            position: 'relative',
                        }}>
                            <div style={{
                                marginBottom: '10px',
                            }}>
                                <div style={{ backgroundColor: 'white' }}>
                                    {/* items map */}
                                    <div style={{
                                        padding: '24px', position: 'relative',
                                        // last
                                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)'
                                    }}>
                                        <CartElement type="cart" />
                                    </div>
                                </div>
                                <div style={{
                                    height: '80px',
                                    marginTop: '10px',
                                    borderTop: '1px solid #f0f0f0',
                                    backgroundColor: 'white',
                                    padding: '16px 24px',
                                    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                                }}>
                                    <span style={{
                                        flex: '1 1 auto'
                                    }}>Order confirmation email will be sent to <span style={{
                                        color: '#212121',
                                        fontSize: '14px',
                                        backgroundColor: '#fafafa',
                                        fontWeight: '500'
                                    }}>linge.aniket.10@gmail.com</span>
                                    </span>
                                    <span>
                                        <button style={{
                                            background: '#fb641b',
                                            boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                            border: 'none',
                                            color: '#fff',
                                            fontSize: '14px',
                                            height: '48px',
                                            width: '200px',
                                            display: 'inline-block',
                                            textTransform: 'uppercase',
                                            borderRadius: '2px',
                                            padding: '10px 20px',
                                            fontWeight: 500,
                                            transition: 'box-shadow .2s ease',
                                            verticalAlign: 'super',
                                            outline: 'none'
                                        }}>Continue</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper square elevation={0} sx={{
                    padding: '0 0 10px', backgroundColor: 'transparent'
                }}>
                    <div style={{
                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)',
                        borderRadius: '5px',
                        minHeight: '72px',
                    }}>
                        <h3 style={{
                            height: '48px',
                            textTransform: 'uppercase',
                            color: '#fff',
                            backgroundColor: '#2874f0',
                            fontSize: '16px',
                            fontWeight: 500,
                            padding: '14px 24px',
                            marginBottom: '0',
                            borderRadius: '2px 2px 0 0'
                        }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#2874f0',
                                borderRadius: '2px',
                                padding: '3px 7px',
                                verticalAlign: 'baseline',
                                marginRight: '17px',
                                backgroundColor: '#fff',
                                position: 'relative',
                                top: '-2px'
                            }}>3</span>
                            <span>Order Summary</span>
                        </h3>
                        <div style={{
                            position: 'relative',
                        }}>
                            <div style={{
                                marginBottom: '10px',
                            }}>
                                <label htmlFor="1258" style={{
                                    padding: '16px 24px 12px', width: '100%', display: 'flex',
                                    // if selected
                                    backgroundColor: '#f5faff'
                                }}>
                                    <div>
                                        <input type="radio" id="1258" name="address" />
                                    </div>
                                    <div style={{ marginLeft: '18px', width: '100%', display: 'inline-block' }}>
                                        {/* if not edited */}
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                        }}>
                                            <div style={{
                                                float: 'left',
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}>
                                                <p style={{ lineHeight: 1.5 }}>
                                                    <span style={{
                                                        fontWeight: '500'
                                                    }}>Cash on Delivery</span>
                                                </p>

                                                <div style={{
                                                    marginTop: '5px',
                                                    display: 'inline-block',
                                                }}>
                                                    <div style={{
                                                        borderRadius: '3px',
                                                        border: '0.5px solid #af7b1c',
                                                        background: '#fef7e9',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        margin: '0 auto 12px',
                                                        padding: '8px 12px 8px 8px'
                                                    }}>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            lineHeight: '18px'
                                                        }}>
                                                            Due to handling costs, a nominal fee of ₹10 will be charged for orders placed using this option. Avoid this fee by paying online now.
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button style={{
                                                            background: '#fb641b',
                                                            boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
                                                            border: 'none',
                                                            color: '#fff',
                                                            fontSize: '14px',
                                                            height: '48px',
                                                            width: '200px',
                                                            display: 'inline-block',
                                                            textTransform: 'uppercase',
                                                            borderRadius: '2px',
                                                            padding: '10px 20px',
                                                            fontWeight: 500,
                                                            transition: 'box-shadow .2s ease',
                                                            verticalAlign: 'super',
                                                            outline: 'none'
                                                        }}>Confirm Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Paper>
        </Paper>
    )
}

export default Checkout;