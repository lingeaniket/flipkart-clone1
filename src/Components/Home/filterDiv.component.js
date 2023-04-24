import React from 'react'
import {
    FormControl, Box, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts } from '../Features/User/productsSlice';

const FilterDiv = () => {
    const filter = useSelector(state => state.productState.filter)
    const dispatch = useDispatch();
    return (
        <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
            <div>Filter
                <div>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            {filter.map((item, idx) => <FormControlLabel key={item.category}
                                control={<Checkbox checked={item.checked} onChange={(event) => {
                                    document.getElementById('loader').classList.toggle('showLoader');
                                    dispatch(filterProducts({ category: item.category, checked: event.target.checked }))
                                    setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                    }, 1000)
                                }} name={item.category} />} label={item.category} />)}
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div>Sort
                <div>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default FilterDiv