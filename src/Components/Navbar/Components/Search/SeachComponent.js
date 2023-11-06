import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, memo } from "react";

import ListComponent from "./Component/SearchListComponent";

import { Search, SearchIconWrapper, StyledInputBase, handleSearchKeyUp } from "../../Functions/navbarFunctions";
import { website } from "../../../websiteData";

import { List } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ id }) => {
    const elementRef = useRef(null);
    const navigate = useNavigate();

    const [searchkey, setSearchKey] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchList, setShowSearchList] = useState(false);

    const handleSearch = async (input) => {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${input}`);
        setSearchResults(response.data.products);
    };

    const handleClickOutside = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            setShowSearchList(false);
        }
    };

    const handleInput = (event) => {
        setSearchKey(event.target.value);
    };

    const handleItemClick = (item, type) => {
        setSearchKey("");
        setSearchResults([]);
        setShowSearchList(false);
        if (type === "history") {
            const index = searchHistory.findIndex((search) => search.title === item.title);
            searchHistory.splice(index, 1);
            const history = [item, ...searchHistory];
            localStorage.setItem("searchHistory", JSON.stringify(history));
            setSearchHistory(history);
            navigate(`/search?q=${item.title}`);
        } else {
            window.open(`${website}/products/${item.title}/p/${item.id}`, "_blank");
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("searchHistory"));
        if (data) {
            setSearchHistory(data);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={elementRef}>
            <Search style={{ position: "relative", width: "auto", boxShadow: "0 2px 4px 0 rgba(0,0,0,.23)" }} className="bar">
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    onClick={(e) => {
                        setShowSearchList(true);
                        setShowHistory(true);
                    }}
                    onKeyUp={(event) => {
                        setShowSearchList(true);
                        setShowHistory(true);
                        handleSearchKeyUp(
                            event,
                            navigate,
                            handleSearch,
                            setSearchResults,
                            setSearchHistory,
                            setShowSearchList,
                            setSearchKey,
                            searchHistory
                        );
                    }}
                    onChange={handleInput}
                    placeholder="Search for products, brands and more"
                    inputProps={{ "aria-label": "search" }}
                    style={{ color: "black" }}
                    id={`products-search-01-${id}`}
                    autoComplete="off"
                    value={searchkey}
                    sx={{ width: "100%" }}
                />
                {showSearchList && (searchHistory.some((history) => history.title.includes(searchkey)) || searchResults.length > 0) && (
                    <div
                        className="mainSearchDiv"
                        style={{
                            color: "black",
                            height: "fit-content",
                            borderRadius: "3px",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            maxHeight: "250px",
                            boxShadow: "2px 3px 5px -1px rgba(0,0,0,.5)",
                            backgroundColor: "white",
                            overflow: "scroll",
                        }}
                    >
                        {showHistory && (
                            <List
                                sx={{
                                    padding: 0,
                                }}
                            >
                                {searchHistory
                                    .filter((historyElement) => {
                                        if (historyElement.title.includes(searchkey.trim()) || searchkey.length === 0) {
                                            return true;
                                        }
                                        return false;
                                    })
                                    .map((item) => (
                                        <ListComponent type="history" searchKey={searchkey} item={item} handleItemClick={handleItemClick} />
                                    ))}
                                {searchResults.length > 0 && (
                                    <>
                                        {searchResults.map((item) => (
                                            <ListComponent
                                                type="search"
                                                item={item}
                                                searchKey={searchkey}
                                                handleItemClick={handleItemClick}
                                            />
                                        ))}
                                    </>
                                )}
                            </List>
                        )}
                    </div>
                )}
            </Search>
        </div>
    );
};
export default memo(SearchComponent);
