import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRouterLogin({ children }) {
    const isAuthenticated = useSelector((state) => state.userState.userLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/");
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    return <>{children}</>;
}

export default React.memo(ProtectedRouterLogin);
