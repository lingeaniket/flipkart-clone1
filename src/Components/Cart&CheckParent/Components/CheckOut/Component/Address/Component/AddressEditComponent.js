import { useState, memo } from "react";
import { useDispatch } from "react-redux";

import { textFields } from "../../../../../Functions/chechoutFunctions";

import { addNewAddress, updateSavedAddress } from "../../../../../../Features/User/userSlice";

import { TextField } from "@mui/material";

const AddressEditComponent = (props) => {
    const {
        index,
        setEdit,
        type,
        id,
        address: { setSelectedAddress, address },
        step: { setSelectedStep },
    } = props;

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(
        address || {
            name: "",
            phone: "",
            pincode: "",
            locality: "",
            address: "",
            area: "",
            state: "",
            landmark: "",
            alt_phone: "",
            res_type: "",
        }
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddress = (e) => {
        e.preventDefault();
        if (type === "new_address" || type === "first_address") {
            dispatch(addNewAddress(formData));
        } else {
            dispatch(updateSavedAddress({ index, formData }));
            setEdit(false);
        }
        if (id !== "manage") {
            setSelectedStep(3);
        } else {
            setEdit(false);
        }
    };

    return (
        <div className="_check_028">
            <form onSubmit={handleAddress}>
                <span className="_check_029">{type === "new_address" || type === "first_address" ? "ADD A" : "EDIT"} ADDRESS</span>
                <div className="_check_030">
                    {textFields.map((field, index) => (
                        <div className="_check_031" key={index}>
                            {field.map((item, idx) => (
                                <div className={`_check_0${item.className}`} key={idx}>
                                    <TextField
                                        required={item.required}
                                        id="outlined-required"
                                        label={item.label}
                                        value={formData[item.name]}
                                        name={item.name}
                                        multiline={item.multiline}
                                        rows={item.rows}
                                        autoComplete="off"
                                        sx={{
                                            backgroundColor: "white",
                                            width: "100%",
                                        }}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="_check_034">
                        <p className="_check_035">Address Type</p>
                        <div className="_check_036">
                            <div className="_check_037">
                                <label className="_check_038" htmlFor={`${id}-${index}_res_type_1`} style={{ width: "50%" }}>
                                    <div>
                                        <input
                                            type="radio"
                                            value="home"
                                            checked={formData.res_type === "home"}
                                            name={`res_type`}
                                            id={`${id}-${index}_res_type_1`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="_check_039">
                                        <span>Home (All day delivery)</span>
                                    </div>
                                </label>
                                <label className="_check_038" htmlFor={`${id}-${index}_res_type_2`} style={{ width: "50%" }}>
                                    <div>
                                        <input
                                            type="radio"
                                            value="office"
                                            checked={formData.res_type === "office"}
                                            name={`res_type`}
                                            id={`${id}-${index}_res_type_2`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="_check_039">
                                        <span>Work (Delivery between 10 AM - 6 PM)</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="_check_040">
                        {id === "manage" ? (
                            <button className="_check_041" type="submit">
                                save
                            </button>
                        ) : (
                            <button className="_check_041" type="submit">
                                save and Deliver Here
                            </button>
                        )}
                        {type !== "first_address" && (
                            <button
                                className="_check_042"
                                onClick={() => {
                                    if (type === "new_address") {
                                        if (id === "manage") {
                                            setEdit(false);
                                        } else {
                                            setSelectedAddress(0);
                                        }
                                    } else {
                                        setEdit(false);
                                    }
                                }}
                            >
                                CANCEL
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default memo(AddressEditComponent);
