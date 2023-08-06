import { useEffect } from "react";
import AddressComponent from "./addressComponent"
import NewAddressComponent from "./newAddressComponent"
import AddIcon from '@mui/icons-material/Add';

const AddressComponent1 = ({ savedAddresses, setSelectedAddress, selectedAddress, setSelectedStep, id }) => {
    useEffect(() => {

    }, [selectedAddress])

    return (
        <div className="_check_013">
            <div className="_check_014" style={{
                marginBottom: `${!savedAddresses.length ? '0px' : '10px'}`,
            }}>
                {(savedAddresses.length)
                    ?
                    (savedAddresses.map((address, index) =>
                        <AddressComponent
                            address={address}
                            index={index}
                            id={id}
                            setSelectedAddress={setSelectedAddress}
                            selectedAddress={selectedAddress}
                            // selected={selectedAddress === index}
                            setSelectedStep={setSelectedStep}
                        />
                    ))
                    :
                    (
                        <label className="_check_015" htmlFor={`${id}firstAddress`} style={{
                            // if selected
                            backgroundColor: `${selectedAddress === 0 ? '#f5faff' : 'white' }`
                        }}
                        onClick={()=>{
                            console.log(selectedAddress)
                        }}>
                            <div>
                                <input type="radio" id={`${id}firstAddress`} name="address" checked={selectedAddress === 0} />
                            </div>
                            <div className="_check_016">
                                <NewAddressComponent id={id} index={savedAddresses.length} type="first_address" setSelectedStep={setSelectedStep} />
                            </div>
                        </label>
                    )
                }
            </div>
            {(savedAddresses.length > 0)
                &&
                ((selectedAddress === savedAddresses.length)
                    ?
                    (
                        <label className="_check_015" htmlFor={`${id}newAddress`} style={{
                            // if selected
                            backgroundColor: '#f5faff'
                        }}
                        >
                            <div>
                                <input type="radio" id={`${id}newAddress`} name="address" checked={selectedAddress === savedAddresses.length} />
                            </div>
                            <div className="_check_016">
                                <NewAddressComponent id={id} index={savedAddresses.length} type="new_address" setSelectedAddress={setSelectedAddress} setSelectedStep={setSelectedStep} />
                            </div>
                        </label>
                    )
                    :
                    (
                        <div className="_check_043" onClick={() => {
                            setSelectedAddress(savedAddresses.length)
                        }}>
                            <AddIcon sx={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }} /> Add a new address
                        </div>
                    )
                )
            }
        </div>
    )
}

export default AddressComponent1