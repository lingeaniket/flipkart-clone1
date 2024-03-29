import { useEffect, useState, memo } from "react";

import AddressEditComponent from "./AddressEditComponent";

const AddressComponent = (props) => {
    const {
        id,
        index,
        step,
        step: { setSelectedStep },
        address: { address, selectedAddress, setSelectedAddress },
    } = props;

    const [edit, setEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(selectedAddress === index);

    const handleEditing = () => {
        setEdit(true);
    };

    useEffect(() => {
        setIsChecked(selectedAddress === index);
        if (edit || selectedAddress !== index) {
            setEdit(false);
        }
        // eslint-disable-next-line
    }, [selectedAddress]);

    return (
        <label
            className="_check_015"
            htmlFor={`${id}-${index}`}
            style={{
                backgroundColor: `${selectedAddress === index ? "#f5faff" : "white"}`,
            }}
        >
            <div>
                <input
                    type="radio"
                    id={`${id}-${index}`}
                    name={`address-${id}`}
                    checked={isChecked}
                    onChange={() => {
                        setSelectedAddress(index);
                    }}
                />
            </div>
            <div className="_check_016">
                {edit ? (
                    <AddressEditComponent id={id} index={index} setEdit={setEdit} address={{ address, selectedAddress }} step={step} />
                ) : (
                    <div className="_check_017">
                        <div className="_check_018">
                            <p className="_check_019">
                                <span className="_check_020">{address.name}</span>
                                <span className="_check_021">{address.res_type}</span>
                                <span className="_check_022">{address.phone}</span>
                            </p>
                            <span className="_check_023">
                                {address.address}, {address.locality}, {address.area}, {address.state} -
                                <span className="_check_024">{address.pincode}</span>
                            </span>
                            {selectedAddress === index && (
                                <button
                                    className="_check_025"
                                    onClick={() => {
                                        setSelectedStep(3);
                                    }}
                                >
                                    Deliver Here
                                </button>
                            )}
                        </div>

                        {selectedAddress === index && (
                            <div className="_check_026">
                                <button className="_check_027" onClick={handleEditing}>
                                    EDIT
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </label>
    );
};

export default memo(AddressComponent);
