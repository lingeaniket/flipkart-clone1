export const handleEditFunc = (index, editState, setEditState, userData, setCurrentUserdata) =>{
    editState[index] = !editState[index]
        setEditState((lastState) => ([...lastState]))
        if (index === 0) {
            setCurrentUserdata((prevState) => ({ ...prevState, firstName: userData.firstName, lastName: userData.lastName, gender: userData.gender }))
        } else if (index === 1) {
            setCurrentUserdata((prevState) => ({ ...prevState, email: userData.email }))
        } else {
            setCurrentUserdata((prevState) => ({ ...prevState, mobileNumber: userData.mobileNumber }))
        }
}