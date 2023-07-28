import * as React from 'react';
import { styled } from '@mui/material/styles';
import { InputBase, useScrollTrigger } from '@mui/material';
// import { addSearched } from '../Features/User/productsSlice';
// import axios from 'axios';

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
}));

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
}));

export function ElevationScroll(props) {
    const { children, } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export function handleSearchKeyUp(event, navigate, handleSearch, setSearchResults, setSearchHistory, setShowSearchList, searchHistory) {
    if (event.key === 'Enter' && event.target.value.length > 1) {
        event.preventDefault();
        const key = event.target.value.trim();
        setSearchResults(() => []);
        event.target.value = '';

        document.getElementById('loader').classList.toggle('showLoader');

        const isSearched = searchHistory.some((search) => {
            return search.title === key
        })

        if (isSearched) {
            const index = searchHistory.findIndex((search) => search.title === key);
            console.log(index)
            searchHistory.splice(index, 1);
            console.log(searchHistory)
            const history = [{ title: key }, ...searchHistory];
            localStorage.setItem('searchHistory', JSON.stringify(history));
            setSearchHistory(history);
        } else {
            const history = [{ title: key }, ...searchHistory]
            localStorage.setItem('searchHistory', JSON.stringify(history));
            setSearchHistory(history);
        }
        setTimeout(() => {
            document.getElementById('loader').classList.toggle('showLoader');
            setShowSearchList(false);
            navigate(`/search?q=${key}`);
        }, 1000);
    } else {
        if (event.target.value.length >= 2) {
            setTimeout(() => {
                handleSearch(event.target.value);
            }, 500);
        } else {
            setSearchResults(() => [])
        }
    }
}