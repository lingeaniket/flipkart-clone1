import { FormGroup, FormControlLabel, Checkbox, Radio } from "@mui/material"
import { Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const FilterHome = ({type, ratingStatus, setRatingStatus, setOpen, sortStatus, setSortStatus }) => {
    const rating_status = ["4 and above", "3 and above",];
    const sort_status = ['Relevance', 'Popularity', 'Price -- Low to High', 'Price -- High to Low',]
    console.log(sortStatus)

    // const order_time = ["Last 30 days", "2022", "2021", "2020", "Older"];

    const handleRatingStatus = (idx) => {
        ratingStatus[idx] = !ratingStatus[idx];
        setRatingStatus((checked) => [...checked]);
    };

    const handleSortStatus = (idx)=>{
        sortStatus[idx] = !sortStatus[idx];
        setSortStatus((checked) => [...checked]);
    }

    const handleClear = () => {
        setRatingStatus(() => [false, false]);
        setOpen(false);
    }

    return (
        <div className="_order_097">
            <div className="_order_098">
                <div>Filters</div>
                {(ratingStatus.some((status) => status))
                    &&
                    <div className="_order_113" onClick={handleClear}>Clear Filter</div>
                }
            </div>
            {(ratingStatus.some((status) => status))
                &&
                <div className="_order_114" >
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                        {rating_status.map((status, index) => {
                            if (ratingStatus[index] === true) {
                                return <div style={{ margin: '5px 10px' }} >
                                    <Chip
                                        className="_order_112"
                                        size="small"
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderRadius: '0', fontSize: '12px' }}
                                        color={`${ratingStatus[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleRatingStatus(index) }}
                                        onDelete={() => { handleRatingStatus(index) }}
                                        deleteIcon={ratingStatus[index] ? null : <AddIcon />}
                                    />
                                </div>
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            }
            <div>
                <div className="_order_099">
                    <div className="_order_100">order status</div>
                    {type === "desktop"
                        ?
                        <FormGroup>
                            {rating_status.map((status, index) =>
                                <FormControlLabel checked={ratingStatus[index]} control={
                                    <Checkbox
                                        size='small'
                                        onChange={() => { handleRatingStatus(index) }}
                                    />} label={status} />
                            )}
                        </FormGroup>
                        :
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                            {rating_status.map((status, index) =>
                                <div style={{ margin: '5px 10px' }}>
                                    <Chip
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderWidth: '2px' }}
                                        color={`${ratingStatus[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleRatingStatus(index) }}
                                        onDelete={() => { handleRatingStatus(index) }}
                                        deleteIcon={ratingStatus[index] ? null : <AddIcon />}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
            <div className="_home_sort">
                <div className="_order_099">
                    <div className="_order_100">Sort by</div>
                    {type === "desktop"
                        ?
                        <FormGroup>
                            {sort_status.map((status, index) =>
                                <FormControlLabel checked={sortStatus[index]} control={
                                    <Radio
                                        size='small'
                                        onChange={() => { handleSortStatus(index) }}
                                    />} label={status} />
                            )}
                        </FormGroup>
                        :
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                            {sort_status.map((status, index) =>
                                <div style={{ margin: '5px 10px' }}>
                                    <Chip
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderWidth: '2px' }}
                                        color={`${sortStatus[index] ? 'primary' : 'default'}`}
                                        onClick={() => { handleSortStatus(index) }}
                                        onDelete={() => { handleSortStatus(index) }}
                                        deleteIcon={sortStatus[index] ? null : <AddIcon />}
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

export default FilterHome;