import React, { useState } from 'react'
import {
    FormControl, Box, Checkbox, FormControlLabel, FormLabel, RadioGroup, Radio, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterProducts,
    sortProducts
} from '../Features/User/productsSlice';
import { SwipeableDrawer } from '@mui/material';

import './filter.css'

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

    const filterComp = () => (
        <Box
        className='filter-container'
        // sx={{width:50}}
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
            <div className='filterDivCont' style={{ borderBottom: '1px solid grey'}}>
                <div className='filterComp' >
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 0, minWidth: 120 }}>
                            <div>
                                <FormLabel>Filter By</FormLabel>
                            </div>
                            {filter.map((item, idx) => <FormControlLabel key={item.category}
                                control={<Checkbox className='filterComp' checked={item.checked} onChange={(event) => {
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
                                }} name={item.category} />} label={item.category.slice(0, 1).toUpperCase() + item.category.slice(1, item.category.length)} />)}
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className='filterDivCont' style={{ padding: '0 0%' }}>
                <div className='filterComp2'>
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
                                <FormControlLabel name='sorting' id="pasc" value="pasc" checked={checked[0]} control={<Radio />} label="Price Increasing" />
                                <FormControlLabel name='sorting' id="pdsc" value="pdsc" checked={checked[1]} control={<Radio />} label="Price Decreasing" />
                                <FormControlLabel name='sorting' id="rasc" value="rasc" checked={checked[2]} control={<Radio />} label="Rating Increasing" />
                                <FormControlLabel name='sorting' id="rdsc" value="rdsc" checked={checked[3]} control={<Radio />} label="Rating Decreasing" />
                                {isSelected && <div>
                                    <Button onClick={() => {
                                        document.getElementById('loader').classList.toggle('showLoader');
                                        setTimeout(() => {
                                            document.getElementById('loader').classList.toggle('showLoader');
                                            dispatch(sortProducts({ sorting: 'remove' }))
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
        </Box>
    )
    return (
        <>
            <div className='filterDesktopMedia' style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
                {filterComp()}

            </div>
            <div className='filterMobileMedia'>
                <SwipeableDrawer
                    anchor='left'
                    open={props.state}
                    onClose={props.toggleDrawer(false)}
                    onOpen={props.toggleDrawer(true)}
                    className='filterMobileMedia'
                >
                    {filterComp()}
                </SwipeableDrawer>
            </div>
        </>
    )
}

export default FilterDiv