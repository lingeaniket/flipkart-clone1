import * as React from "react";

import DeleteConfirm from "./DeleteConfirmDialogue";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

const AddressMenuItem = ({ setEdit, index }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDialogOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    edit
                </MenuItem>
                <MenuItem onClick={handleDialogOpen}>delete</MenuItem>
            </Menu>
            <DeleteConfirm open={dialogOpen} handleClose={handleClose} index={index} />
        </div>
    );
};

export default React.memo(AddressMenuItem);
