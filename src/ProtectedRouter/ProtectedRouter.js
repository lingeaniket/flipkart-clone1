import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRouter ({ children }) {
    const isAuthenticated = useSelector(state => state.userState.userLoggedIn)/* Implement your authentication check logic here */;

    console.log("i am called")
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default ProtectedRouter;