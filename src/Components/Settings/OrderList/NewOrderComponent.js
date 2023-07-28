import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const OrderComponent = () => {

    const [handleOrderStatuschecked, setHandleOrderStatusChecked] = useState([false, false, false, false]);
    // const [handleOrderTimechecked, setHandleOrderTimeChecked] = useState([false, false, false, false, false]);

    const handleOrderStatusChange = (event, idx) => {
        handleOrderStatuschecked[idx] = event.target.checked;
        setHandleOrderStatusChecked((checked) => [...checked]);
        // console.log(checked);
    };
    // const handleOrderTimeChange = (event, idx) => {
    //     handleOrderTimechecked[idx] = event.target.checked;
    //     setHandleOrderTimeChecked((checked) => [...checked]);
    //     // console.log(checked);
    // };
    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '18px', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <div style={{ width: '20%', }}>
                    <div
                        style={{
                            height: 'max-height',
                            paddingBottom: '8px',
                            lineHeight: '24px',
                            backgroundColor: 'white',
                            borderRadius: '2px',
                            boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)'
                        }}>
                        <div style={{ padding: '8px 16px', fontWeight: '500', fontSize: '20px' }}>
                            Filters
                        </div>
                        <div style={{
                            padding: '0 16px',
                            borderTop: '1px solid #f8f8f8'
                        }}>
                            <div style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                padding: '8px 0'
                            }}>
                                order status
                            </div>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 0) }}
                                    />} label="On the way" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 1) }}
                                    />} label="Delivered" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 2) }}
                                    />} label="Cancelled" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="Returned" />
                            </FormGroup>
                        </div>
                        <div style={{
                            padding: '0 16px',
                            borderTop: '1px solid #f8f8f8'
                        }}>
                            <div style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                padding: '8px 0'
                            }}>
                                order time
                            </div>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 0) }}
                                    />} label="Last 30 days" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 1) }}
                                    />} label="2022" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 2) }}
                                    />} label="2021" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="2020" />
                                <FormControlLabel control={
                                    <Checkbox size='small'
                                        onChange={(event) => { handleOrderStatusChange(event, 3) }}
                                    />} label="Older" />
                            </FormGroup>
                        </div>

                    </div>
                </div>
                <div style={{ width: ' 100%', paddingLeft: '16px' }}>
                    <div style={{
                        display: 'flex',
                        marginRight: '10%',
                        marginBottom: '16px',
                        borderRadius: '4px 0 0 4px'
                    }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input type="text" style={{
                                height: '40px',
                                width: '100%',
                                border: '1px solid #dbdbdb',
                                padding: '8px',
                                borderRadius: '4px 0 0 4px',
                                fontSize: '14px'

                            }} placeholder="Search your orders here" />
                        </div>
                        <Button variant="contained" sx={{ borderRadius: '0 4px 4px 0', textTransform: 'lowercase' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none',
                            }}

                            >
                                <SearchIcon fontSize="small" sx={{ marginRight: '6px' }} />
                                <span>Search Orders</span>
                            </div>
                        </Button>
                    </div>
                    {/* orders map */}
                    <div style={{
                        padding: '16px',
                        width: '100%',
                        fontSize: '14px',
                        overflow: 'hidden',
                        transition: 'box-shadow .1s linear',
                        backgroundColor: '#fff',
                        border: '1px solid #dbdbdb',
                        position: 'relative',
                        cursor: 'pointer',
                        display: 'block',
                        boxShadow: '0 0 0 0 rgba(0,0,0,.15)',
                        marginBottom: '8px',
                        borderRadius: '4px',
                        //hover
                        //                     zIndex: 1,
                        // boxShadow: '0 1px 12px 2px #dbdbdb'
                    }}>
                        <div style={{
                            width: '100%',
                            display: 'flex'
                        }}>
                            <div style={{ width: '50%' }}>
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ height: '75px', width: '75px', position: 'relative' }}>
                                            <img src="https://rukminim2.flixcart.com/image/xif0q/cooling-pad/v/b/a/-original-imagnpgztxgzpqng.jpeg" alt="" style={{
                                                maxHeight: '100%', maxWidth: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto'
                                            }} />
                                        </div>
                                    </div>
                                    <div style={{ width: '66.66%' }}>
                                        <div>
                                            <span style={{
                                                boxShadow: 'none',
                                                padding: 0,
                                                border: 'none',
                                                fontSize: '14px',
                                                textDecoration: 'none',
                                                color: '#212121',
                                                marginBottom: '10px',
                                                fontWeight: 400,
                                                width: '100%',
                                                cursor: 'pointer'
                                            }}>Title of product</span>
                                            <div style={{
                                                color: '#878787',
                                                fontSize: '12px',
                                                marginBottom: '5px'
                                            }}>Description</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                color: '#212121',
                                width: '16.66%', textTransform: 'uppercase',
                            }}>Price</div>
                            <div style={{ color: '#212121', width: '33.33%' }}>
                                <div>
                                    <div style={{
                                        backgroundColor: '#26a541',
                                        // backgroundColor: '#ff6161' //if replacement
                                        // backgroundColor: '#ff6161' //if replacement
                                        border: '2px solid #26a541',
                                        height: '10px',
                                        width: '10px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}></div>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>Delivered on ....</span>
                                    <div style={{
                                        fontSize: '12px',
                                        marginTop: '8px'
                                    }}>Yyour order is delivred on</div>
                                </div>
                            </div>
                        </div>

                        {/* if refunded */}
                        <div style={{
                            marginTop: '16px',
                            border: '1px solid #eee',
                            borderRadius: '3px',
                            padding: '10px 10px 6px'

                        }}>
                            <div style={{
                                color: '#212121',
                                fontWeight: 500
                            }}>
                                <span style={{
                                    color: '#26a541'
                                }}>Refund Completed</span>
                                <span style={{
                                    color: '#878787',
                                    fontSize: '12px',
                                    marginBottom: '5px',
                                    marginRight: '4px',
                                    marginLeft: '4px',
                                }}>(Refund Id 458442541)</span>
                            </div>
                            <div style={{
                                paddingTop: '8px',
                                fontSize: '12px'
                            }}>
                                <ul>
                                    <li style={{
                                        // list-style-type: disc;
                                        margin: '5px 0 5px 15px',
                                        fontSize: '14px'
                                    }}>
                                        <span>₹690.0 has been refunded to your Flipkart Pay Later  on Apr 05 </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                                    {/* last div */}
                    <div style={{
                        margin: '10px 0',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            color: '#2874f0',
                            fontWeight: 500,
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#fff',
                            border: '1px solid #d7d7d7',
                            fontSize: '14px',
                            borderRadius: '2px',
                            textTransform: 'capitalize',
                            boxShadow: 'none',
                        }}>
                            <span>No more results to display</span>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default OrderComponent;