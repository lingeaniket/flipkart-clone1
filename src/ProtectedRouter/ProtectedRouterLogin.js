import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRouterLogin ({ children }) {
    const isAuthenticated = useSelector(state => state.userState.userLoggedIn)/* Implement your authentication check logic here */;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default ProtectedRouterLogin