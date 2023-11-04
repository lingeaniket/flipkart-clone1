import { useState, memo } from "react";

import AddressMenuItem from "./MenuItem";
import AddressEditComponent from "../../../../Cart&CheckParent/Components/CheckOut/Component/Address/Component/AddressEditComponent";

const ManageAddressListComponent = ({ index, address }) => {
    const [edit, setEdit] = useState(false);

    return (
        <div className="_manageAdd_005">
            {edit ? (
                <div className="_manageAdd_003">
                    <AddressEditComponent id="manage" index={index} address={{ address }} step="" setEdit={setEdit} />
                </div>
            ) : (
                <div className="_manageAdd_006">
                    <div>
                        <AddressMenuItem setEdit={setEdit} index={index} />
                    </div>
                    <div>
                        <span className="_check_021" style={{ margin: 0 }}>
                            {address.res_type}
                        </span>
                    </div>
                    <p style={{}}>
                        <span>{address.name}</span>
                        <span style={{ marginLeft: "15px" }}>+91 {address.phone}</span>
                    </p>
                    <span>
                        {address.address}, {address.locality}, {`${address.landmark && `${address.landmark},`}`} {address.area},{" "}
                        {address.state} -<span style={{ fontWeight: 500 }}> {address.pincode}</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default memo(ManageAddressListComponent);
