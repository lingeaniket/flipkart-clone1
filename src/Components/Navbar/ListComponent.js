import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from "react-router-dom";

const ListItemTitle = ({ originalString, substring }) => {
    const parts = originalString.split(new RegExp(`(${substring})`, 'i'));
    return (
        <div style={{
            WebkitFlex: '1 1 auto',
            msFlex: '1 1 auto',
            flex: '1 1 auto',
            minWidth: '0',
            marginTop: '4px',
            marginBottom: '4px',
        }}>
            <p style={{
                margin: 0,
                fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                fontSize: '0.875rem',
                lineHeight: 1.43,
                letterSpacing: '0.01071em',
                color: 'black',
                display: 'block',
                fontSize: '0.9vw'
            }}>

                {parts.map((part, index) =>
                    part.toLowerCase() === substring.toLowerCase() ? (
                        <strong key={index}>{part}</strong>
                    ) : (
                        part
                    )
                )}
            </p>
        </div>
    )
}

const ListComponent = ({ type, item, setSearchResults, setShowSearchList, setSearchHistory, searchHistory, searchKey }) => {
    const navigate = useNavigate();
    return (

        <ListItem disablePadding id="hellloji">
            <ListItemButton sx={{ overflow: 'hidden' }}
                onClick={() => {
                    document.getElementById('loader').classList.toggle('showLoader');
                    setTimeout(() => {
                        document.getElementById('standard-textarea').value = '';
                        document.getElementById('loader').classList.toggle('showLoader');
                        setSearchResults([]);
                        setShowSearchList(false);
                        if (type === 'history') {
                            const index = searchHistory.indexOf((search) => search.title === item.title);
                            searchHistory.splice(index, 1);
                            const history = [item, ...searchHistory]
                            localStorage.setItem('searchHistory', JSON.stringify(history));
                            setSearchHistory(history);
                            navigate(`/search?q=${item.title}`);
                        } else {
                            navigate(`products/${item.title}/p/${item.id}`)
                        }
                    }, 1000);
                }}
            >
                <ListItemIcon sx={{ padding: '0 5px 0 0', minWidth: '0' }}>
                    {
                        type === 'history' ? <HistoryIcon /> :
                            <SearchIcon />
                    }
                </ListItemIcon>
                <ListItemTitle originalString={item.title} substring={searchKey} />
            </ListItemButton>
        </ListItem>
    )
}

export default ListComponent;