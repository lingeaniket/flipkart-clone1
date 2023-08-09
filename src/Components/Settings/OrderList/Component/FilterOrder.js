import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const FilterOrder = ({ setOpen, type, setOrderList, orderList, orderStatus, setOrderStatus, orderTime, setOrderTime }) => {
    const order_status = ["On the way", "Delivered", "Cancelled", "Returned"];
    const order_time = ["Last 30 days", "2022", "2021", "2020", "Older"];

    const handleOrderStatus = (idx) => {
        orderStatus[idx] = !orderStatus[idx];
        setOrderStatus((checked) => [...checked]);
    };
    const handleOrderTime = (idx) => {
        orderTime[idx] = !orderTime[idx]
        setOrderTime((checked) => [...checked]);
    };

    const handleClear = () => {
        setOrderStatus(() => [false, false, false, false]);
        setOrderTime(() => [false, false, false, false, false]);
        setOpen(false);
    }

    return (
        <div className="_order_097">
            <div className="_order_098">
                <div>Filters</div>
                {(orderStatus.some((status) => status) || orderTime.some((time) => time))
                    &&
                    <div className="_order_113" onClick={handleClear}>Clear Filter</div>
                }
            </div>
            {(orderStatus.some((status) => status) || orderTime.some((time) => time))
                &&
                <div className="_order_114" >
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                        {order_status.map((status, index) => {
                            if (orderStatus[index] === true) {
                                return <div style={{ margin: '5px 10px' }} >
                                    <Chip
                                        className="_order_112"
                                        size="small"
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderRadius: '0', fontSize: '12px' }}
                                        color={`${orderStatus[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleOrderStatus(index) }}
                                        onDelete={() => { handleOrderStatus(index) }}
                                        deleteIcon={orderStatus[index] ? null : <AddIcon />}
                                    />
                                </div>
                            } else {
                                return null
                            }
                        })}
                        {
                            order_time.map((time, index) => {
                                if (orderTime[index] === true) {
                                    return <div style={{ margin: '5px 10px' }}>
                                        <Chip
                                            className="_order_112"
                                            size="small"
                                            label={time}
                                            variant="outlined"
                                            sx={{ borderRadius: '0', fontSize: '12px' }}
                                            color={`${orderTime[index] ? 'primary' : 'default'}`}
                                            onClick={() => { handleOrderTime(index) }}
                                            onDelete={() => { handleOrderTime(index) }}
                                            deleteIcon={orderTime[index] ? null : <AddIcon />}
                                        />
                                    </div>
                                } else {
                                    return null
                                }
                            })
                        }
                    </div>
                </div>
            }
            <div>
                <div className="_order_099">
                    <div className="_order_100">order status</div>
                    {type === "desktop"
                        ?
                        <FormGroup>
                            {order_status.map((status, index) =>
                                <FormControlLabel checked={orderStatus[index]} control={
                                    <Checkbox
                                        size='small'
                                        onChange={() => { handleOrderStatus(index) }}
                                    />} label={status} />
                            )}
                        </FormGroup>
                        :
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                            {order_status.map((status, index) =>
                                <div style={{ margin: '5px 10px' }}>
                                    <Chip
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderWidth: '2px' }}
                                        color={`${orderStatus[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleOrderStatus(index) }}
                                        onDelete={() => { handleOrderStatus(index) }}
                                        deleteIcon={orderStatus[index] ? null : <AddIcon />}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className="_order_099">
                    <div className="_order_100">order time</div>
                    {type === "desktop"
                        ?
                        <FormGroup>
                            {order_time.map((time, index) =>
                                <FormControlLabel checked={orderTime[index]} control={
                                    <Checkbox
                                        size='small'
                                        onChange={() => { handleOrderTime(index) }}
                                    />} label={time}
                                />
                            )}
                        </FormGroup>
                        :
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                            {order_time.map((time, index) =>
                                <div style={{
                                    margin: '5px 10px'
                                }}>
                                    <Chip
                                        label={time}
                                        sx={{ borderWidth: '2px' }}
                                        variant="outlined"
                                        color={`${orderTime[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleOrderTime(index) }}
                                        onDelete={() => { handleOrderTime(index) }}
                                        deleteIcon={orderTime[index] ? null : <AddIcon />}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterOrder
