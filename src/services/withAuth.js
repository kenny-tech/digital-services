import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {

    const Wrapper = (props) => {
        const navigate = useNavigate();
        const isAuthenticated = sessionStorage.getItem('isLoggedIn');

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login')
            }
        }, [isAuthenticated]);

        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };

    return Wrapper;
};

export default WithAuth;
