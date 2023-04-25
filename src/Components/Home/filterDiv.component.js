import React, { useState } from 'react'
import {
    FormControl, Box, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterProducts,
    sortProducts
} from '../Features/User/productsSlice';

const FilterDiv = (props) => {
    const filter = useSelector(state => state.productState.filter)
    // const searchedProducts = useSelector(state => state.productState.searchedProducts);
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);
    const [checked, setChecked] = useState([false, false, false, false]);

    const handleSort = () => {
        var ele = document.getElementsByName('sorting');
        document.getElementById('loader').classList.toggle('showLoader');
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                setIsSelected(true);
                checked[i] = true;
                dispatch(sortProducts({ sorting: ele[i].value }))
            } else {
                checked[i] = false;
            }
        }
        setTimeout(() => {
            document.getElementById('loader').classList.toggle('showLoader');
        }, 1000)
    }
    return (
        <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
            <div style={{ borderBottom: '1px solid grey', margin: '3%' }}>
                <div>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <div>
                                <FormLabel>Filter By</FormLabel>
                            </div>
                            {filter.map((item, idx) => <FormControlLabel key={item.category}
                                control={<Checkbox checked={item.checked} onChange={(event) => {
                                    document.getElementById('loader').classList.toggle('showLoader');
                                    dispatch(filterProducts({ category: item.category, checked: event.target.checked }))
                                    var ele = document.getElementsByName('sorting');
                                    for (var i = 0; i < ele.length; i++) {
                                        if (ele[i].checked) {
                                            dispatch(sortProducts({ sorting: ele[i].value }))
                                        }
                                    }
                                    setTimeout(() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                    }, 1000)
                                }} name={item.category} />} label={item.category} />)}
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div style={{ margin: '3%', padding: '0 3%' }}>
                <div>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={handleSort}
                            >
                                {/* <FormControlLabel name='sorting' id='nasc' value="nasc" control={<Radio />} label="Sort By Name A-Z" />
                                <FormControlLabel name='sorting' id="ndsc" value="ndsc" control={<Radio />} label="Sort By Name Z-A" /> */}
                                <FormControlLabel name='sorting' id="pasc" value="pasc" checked={checked[0]} control={<Radio  />} label="Price Low To High" />
                                <FormControlLabel name='sorting' id="pdsc" value="pdsc" checked={checked[1]} control={<Radio  />} label="Price High To Low" />
                                <FormControlLabel name='sorting' id="rasc" value="rasc" checked={checked[2]} control={<Radio  />} label="Rating Low To High" />
                                <FormControlLabel name='sorting' id="rdsc" value="rdsc" checked={checked[3]} control={<Radio  />} label="Rating High To Low" />
                                {isSelected && <div>
                                    <Button onClick={()=>{
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        setTimeout(() => {
                                            document.getElementById('loader').classList.toggle('showLoader');
                                            dispatch(sortProducts({sorting: 'remove'}))
                                            for (var i = 0; i < checked.length; i++) {
                                                setChecked([false, false, false, false])
                                            }
                                        }, 1000)
                                        setIsSelected(false);
                                    }}>Clear Sort</Button>
                                    </div>}

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default FilterDiv