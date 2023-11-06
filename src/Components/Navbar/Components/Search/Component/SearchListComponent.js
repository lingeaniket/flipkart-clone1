import { memo } from "react";

import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";

const ListItemTitle = ({ originalString, substring }) => {
    const parts = originalString.split(new RegExp(`(${substring})`, "i"));

    return (
        <div
            style={{
                WebkitFlex: "1 1 auto",
                msFlex: "1 1 auto",
                flex: "1 1 auto",
                minWidth: "0",
                marginTop: "4px",
                marginBottom: "4px",
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                    lineHeight: 1.43,
                    letterSpacing: "0.01071em",
                    color: "black",
                    display: "block",
                    fontSize: "10.5px",
                }}
            >
                {parts.map((part, index) => (part.toLowerCase() === substring.toLowerCase() ? <strong key={index}>{part}</strong> : part))}
            </p>
        </div>
    );
};

const ListComponent = ({ type, item, searchKey, handleItemClick }) => {
    return (
        <ListItem disablePadding id="hellloji">
            <ListItemButton
                sx={{ overflow: "hidden" }}
                onClick={() => {
                    setTimeout(() => {
                        handleItemClick(item, type);
                    }, 1000);
                }}
            >
                <ListItemIcon sx={{ padding: "0 5px 0 0", minWidth: "0" }}>
                    {type === "history" ? <HistoryIcon /> : <SearchIcon />}
                </ListItemIcon>
                <ListItemTitle originalString={item.title} substring={searchKey} />
            </ListItemButton>
        </ListItem>
    );
};

export default memo(ListComponent);
