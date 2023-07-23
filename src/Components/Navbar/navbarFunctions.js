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

export function handleSearchKeyUp(event, navigate, handleSearch, setSearchResults,setSearchHistory,setShowSearchList, searchHistory) {
    if (event.key === 'Enter' && event.target.value.length > 1) {
        console.log(event.target.value.length);
        event.preventDefault();
        const key = event.target.value.trim();
        setSearchResults(()=>[]);
        event.target.value = '';

        // const searchkey = key.replace(/\s+/g, ' ').trim().replace(' ', '+');
        document.getElementById('loader').classList.toggle('showLoader');
        // axios.get(`https://dummyjson.com/products/search?q=${key}`).then((response)=>{
        //     setSearchResults(response.data.products);
        // })

        setTimeout(() => {
            // dispatch(addSearched({ searchKey: key }))
            document.getElementById('loader').classList.toggle('showLoader');
            const isSearched = searchHistory.some((search)=>{
                return search.title === key
            })

            if(isSearched) {
                const index = searchHistory.indexOf((search)=> search.title === key);
                searchHistory.splice(index, 1);
                const history = [{title:key}, ...searchHistory]
                localStorage.setItem('searchHistory', JSON.stringify(history));
                setSearchHistory(history);
            } else {
                const history = [{title:key}, ...searchHistory]
                console.log(history)
                localStorage.setItem('searchHistory', JSON.stringify(history));
                setSearchHistory(history);
            }
            setShowSearchList(false);
            navigate(`/search?q=${key}`);
        }, 1000);
    } else {

        if(event.target.value.length >= 2){

            setTimeout(() => {
                // dispatch(addSearched({ searchKey: key }))
                // document.getElementById('loader').classList.toggle('showLoader');
                // navigate(`/search?q=${key}`);
                handleSearch(event.target.value);
            }, 500);
        } else {

            setSearchResults(()=>[])
        }
    }
    // if (event.target.value.length < 3) {
    // }
}




                                    //     (event) => {
                                    //     if (event.key === 'Enter' && event.target.value.length > 1) {
                                    //         event.preventDefault();
                                    //         const key = event.target.value;
                                    //         setSearchState('');
                                    //         event.target.value = '';
                                    //         const searchkey = key.replace(/\s+/g, ' ').trim().replace(' ', '+');
                                    //         document.getElementById('loader').classList.toggle('showLoader');
                                    //         setTimeout(() => {
                                    //             dispatch(addSearched({ searchKey: key.trim() }))
                                    //             document.getElementById('loader').classList.toggle('showLoader');
                                    //             navigate(`/search?keyword=${searchkey}`);
                                    //         }, 1000);
                                    //     } else {
                                    //         handleSearch(event.target.value);
                                    //         console.log(event.target.value)
                                    //     }
                                    //     if (event.target.value.length < 3) {
                                    //         setSearchState('')
                                    //         console.log("working search")
                                    //     }
                                    // }