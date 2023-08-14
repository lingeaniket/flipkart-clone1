import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRouterLogin ({ children }) {
    const isAuthenticated = useSelector(state => state.userState.userLoggedIn)

    if (!isAuthenticated) {
        return Navigate('/');
    }

    return <>{children}</>;
}

export default ProtectedRouterLogin