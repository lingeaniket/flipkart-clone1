import { useState, memo } from "react";

import { FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FilterHome = ({ type, ratingStatus, sort_status, handleSort, selectedSort, handleRatingStatus, handleClear }) => {
    const [value, setValue] = useState(selectedSort);

    const rating_status = ["4 and above", "3 and above"];

    const handleChange = (event) => {
        setValue(event.target.value);
        handleSort(Number(event.target.value));
    };

    return (
        <div className="_order_097">
            <div className="_order_098">
                <div>Filters</div>
                {ratingStatus.some((status) => status) && (
                    <div className="_order_113" onClick={handleClear}>
                        Clear Filter
                    </div>
                )}
            </div>
            {ratingStatus.some((status) => status) && (
                <div className="_order_114">
                    <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
                        {rating_status.map((status, index) => {
                            if (ratingStatus[index] === true) {
                                return (
                                    <div style={{ margin: "5px 10px" }}>
                                        <Chip
                                            className="_order_112"
                                            size="small"
                                            label={status}
                                            variant="outlined"
                                            sx={{ borderRadius: "0", fontSize: "12px" }}
                                            color={`${ratingStatus[index] ? "primary" : "default"}`}
                                            onClick={() => {
                                                handleRatingStatus(index);
                                            }}
                                            onDelete={() => {
                                                handleRatingStatus(index);
                                            }}
                                            deleteIcon={ratingStatus[index] ? null : <AddIcon />}
                                        />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            )}
            <div>
                <div className="_order_099">
                    <div className="_order_100">Rating</div>
                    {type === "desktop" ? (
                        <FormGroup>
                            {rating_status.map((status, index) => (
                                <FormControlLabel
                                    checked={ratingStatus[index]}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={() => {
                                                handleRatingStatus(index);
                                            }}
                                        />
                                    }
                                    label={status}
                                />
                            ))}
                        </FormGroup>
                    ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
                            {rating_status.map((status, index) => (
                                <div style={{ margin: "5px 10px" }}>
                                    <Chip
                                        label={status}
                                        variant="outlined"
                                        sx={{ borderWidth: "2px" }}
                                        color={`${ratingStatus[index] ? "primary" : "default"}`}
                                        onClick={() => {
                                            handleRatingStatus(index);
                                        }}
                                        onDelete={() => {
                                            handleRatingStatus(index);
                                        }}
                                        deleteIcon={ratingStatus[index] ? null : <AddIcon />}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="_home_sort">
                <div className="_order_099">
                    <div className="_order_100">Sort by</div>
                    <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0" }}>
                        <RadioGroup row name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
                            {sort_status.map((status, index) => (
                                <div style={{ margin: "5px 10px" }}>
                                    <FormControlLabel value={index} control={<Radio />} label={status} />
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(FilterHome);
