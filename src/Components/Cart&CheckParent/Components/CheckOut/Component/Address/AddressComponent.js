import { useEffect, useState, memo } from "react";

import LoadingStep from "../loadingSteps";
import AddressSkeleton from "../Skeleton/addressSkeleton";
import AddressListComponent from "./Component/AddressListComponent";
import AddressEditComponent from "./Component/AddressEditComponent";

import AddIcon from "@mui/icons-material/Add";

const AddressComponent = (props) => {
    const {
        step,
        id,
        address: { savedAddresses, selectedAddress, setSelectedAddress },
    } = props;

    const [loader, setLoader] = useState(true);
    const [firstLoading, setFirstLoading] = useState(true);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setFirstLoading(false);
            setLoader(false);
        }, 2000);
    }, [selectedAddress]);

    return (
        <div className="_check_013">
            {firstLoading ? (
                <AddressSkeleton />
            ) : (
                <div style={{ position: "relative" }}>
                    {loader && <LoadingStep />}
                    <div
                        className="_check_014"
                        style={{
                            marginBottom: `${!savedAddresses.length ? "0px" : "10px"}`,
                            position: "relative",
                        }}
                    >
                        {savedAddresses.length ? (
                            savedAddresses.map((address, index) => (
                                <AddressListComponent
                                    id={id}
                                    step={step}
                                    index={index}
                                    address={{ address, selectedAddress, setSelectedAddress }}
                                />
                            ))
                        ) : (
                            <label
                                className="_check_015"
                                htmlFor={`${id}firstAddress`}
                                style={{
                                    backgroundColor: `${selectedAddress === 0 ? "#f5faff" : "white"}`,
                                }}
                            >
                                <div>
                                    <input
                                        type="radio"
                                        id={`${id}firstAddress`}
                                        autoComplete="off"
                                        name={`address-${id}`}
                                        checked={selectedAddress === 0}
                                    />
                                </div>
                                <div className="_check_016">
                                    <AddressEditComponent
                                        id={id}
                                        step={step}
                                        type="first_address"
                                        address={{ setSelectedAddress }}
                                        index={savedAddresses.length}
                                    />
                                </div>
                            </label>
                        )}
                    </div>
                    {savedAddresses.length > 0 &&
                        (selectedAddress === savedAddresses.length ? (
                            <label className="_check_015" htmlFor={`${id}newAddress`} style={{ backgroundColor: "#f5faff" }}>
                                <div>
                                    <input
                                        type="radio"
                                        id={`${id}newAddress`}
                                        name={`address-${id}`}
                                        checked={selectedAddress === savedAddresses.length}
                                    />
                                </div>
                                <div className="_check_016">
                                    <AddressEditComponent
                                        id={id}
                                        step={step}
                                        type="new_address"
                                        index={savedAddresses.length}
                                        address={{ setSelectedAddress }}
                                    />
                                </div>
                            </label>
                        ) : (
                            <div
                                className="_check_043"
                                onClick={() => {
                                    setSelectedAddress(savedAddresses.length);
                                }}
                            >
                                <AddIcon sx={{ margin: "0 22px 0 26px", verticalAlign: "middle" }} /> Add a new address
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default memo(AddressComponent);
