import { useSelector } from "react-redux";
import { useEffect, useState,memo } from "react";

import ManageAddressListComponent from "./Components/ManageAddressesListComponent";
import AddressEditComponent from "../../../Cart&CheckParent/Components/CheckOut/Component/Address/Component/AddressEditComponent";

import "../../Styles/manageAddressesStyles.css";

import { Add } from "@mui/icons-material";

const ManageAddresses = () => {
    const savedAddresses = useSelector((state) => state.userState.savedAddresses);

    const [addresses, setAddresses] = useState([]);
    const [newAddOpen, setNewAddOpen] = useState(false);

    useEffect(() => {
        setAddresses(savedAddresses);
    }, [savedAddresses]);

    return (
        <div className="_manageAcc_001">
            <div className="_manageAcc_002" style={{ paddingBottom: "24px" }}>
                <div className="_manageAdd_001">Manage Addresses</div>
                <div>
                    <div className="_manageAdd_002">
                        <div>
                            {newAddOpen ? (
                                <div className="_manageAdd_003">
                                    <AddressEditComponent
                                        id="manage"
                                        type="new_address"
                                        index={addresses.length}
                                        address=""
                                        step=""
                                        setEdit={setNewAddOpen}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="_check_043"
                                    onClick={() => {
                                        setNewAddOpen(true);
                                    }}
                                >
                                    <Add sx={{ margin: "0 22px 0 26px", verticalAlign: "middle" }} /> Add a new address
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="_manageAdd_004">
                        {addresses.map((address, index) => (
                            <ManageAddressListComponent address={address} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ManageAddresses);
