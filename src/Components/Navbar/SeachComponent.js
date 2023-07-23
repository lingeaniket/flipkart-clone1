import { Search, SearchIconWrapper, StyledInputBase, handleSearchKeyUp } from "./navbarFunctions";
import { List } from "@mui/material";
import ListComponent from "./ListComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = () => {

    const elementRef = useRef(null);
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [showSearchList, setShowSearchList] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchkey, setSearchKey] = useState('');

    const handleSearch = async (input) => {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${input}`);
        setSearchResults(response.data.products);
    }

    const handleClickOutside = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            setShowSearchList(false);
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('searchHistory'));
        if (data) {
            setSearchHistory(data)
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <div ref={elementRef}>
            <Search style={{ position: 'relative' }} className='bar' >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    onClick={(e) => {
                        if (e.target.value.trim().length === 0) {
                            setShowSearchList(true);
                            setShowHistory(true);
                        }
                    }}
                    onKeyDown={(event) => {
                        setSearchKey(() => event.target.value)
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                    }}
                    onKeyUp={(e) => {
                        setSearchKey(() => e.target.value);
                        handleSearchKeyUp(e, navigate, handleSearch, setSearchResults, setSearchHistory, setShowSearchList, searchHistory)
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ color: 'black' }}
                    id="standard-textarea"
                />
                {
                    showSearchList
                    &&
                    (
                        <div className="mainSearchDiv"
                            style={{
                                color: 'black',
                                height: 'fit-content',
                                borderRadius: '5px',
                                maxHeight: '250px',
                                boxShadow: '0px 0px 8px -1px blue',
                                backgroundColor: 'white',
                                borderTop: '2px solid black',
                                overflow: 'scroll'
                            }}>{
                                (showHistory && ((searchHistory.length > 0) || (searchResults.length > 0))) &&
                                <List>{
                                    searchHistory.filter((historyElement) => {
                                        if (
                                            historyElement.title.includes(searchkey.trim()) || searchkey.length === 0
                                        ) {
                                            return true
                                        }
                                        return false;
                                    }).map((item) =>
                                        <ListComponent
                                            type='history'
                                            searchKey={searchkey}
                                            item={item}
                                            setSearchResults={setSearchResults}
                                            setShowSearchList={setShowSearchList}
                                            setSearchHistory={setSearchHistory}
                                            searchHistory={searchHistory}
                                        />
                                    )
                                }
                                    {
                                        searchResults.length > 0
                                        &&
                                        <>
                                            {searchResults.map((item) =>
                                                <ListComponent
                                                    type='search'
                                                    item={item}
                                                    searchKey={searchkey}
                                                    setSearchResults={setSearchResults}
                                                    setShowSearchList={setShowSearchList}
                                                    setSearchHistory={setSearchHistory}
                                                    searchHistory={searchHistory}
                                                />
                                            )
                                            }
                                        </>
                                    }
                                </List>
                            }
                        </div>
                    )}
            </Search>
        </div>
    )
}
export default SearchComponent