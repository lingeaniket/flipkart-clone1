import React from 'react'
import {
    Button, DialogActions,
    InputLabel, FormControl,
    Box, OutlinedInput,
    Select, DialogContent,
    DialogTitle, Dialog,
    Checkbox, FormControlLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts } from '../Features/User/productsSlice';

const FilterDiv = () => {
    const filter = useSelector(state => state.productState.filter)
    const dispatch = useDispatch();
    const [openF, setOpenF] = React.useState(false);
    const [openC, setOpenC] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpenSort = () => {
        setOpenC(true);
    };
    const handleClickOpenFilter = () => {
        setOpenF(true);
    };

    const handleCloseF = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenF(false);
        }
    };
    const handleCloseS = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenC(false);
        }
    };
    return (
        <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
            <div>Filter
                <div>
                    <Button onClick={handleClickOpenFilter}>Filter Products By</Button>
                    <Dialog disableEscapeKeyDown open={openF} onClose={handleCloseF}>
                        <DialogTitle>Fill the form</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    {filter.map((item, idx) => <FormControlLabel key={item.category}
                                        control={<Checkbox checked={item.checked} onChange={(event) => {
                                            document.getElementById('loader').classList.toggle('showLoader');
                                            dispatch(filterProducts({ category: item.category, checked: event.target.checked }))
                                            setTimeout(() => {
                                                handleCloseF()
                                                document.getElementById('loader').classList.toggle('showLoader');
                                            }, 1000)
                                        }} name={item.category} />} label={item.category} />)}
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseF}>Cancel</Button>
                            <Button onClick={handleCloseF}>Ok</Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
            <div>Sort
                <div>
                    <Button onClick={handleClickOpenSort}>Sort Products By</Button>
                    <Dialog disableEscapeKeyDown open={openC} onClose={handleCloseS}>
                        <DialogTitle>Fill the form</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                                    <Select
                                        native
                                        value={age}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseS}>Cancel</Button>
                            <Button onClick={handleCloseS}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default FilterDiv