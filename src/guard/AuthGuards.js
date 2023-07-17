import React, { useEffect } from 'react';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const AuthGuard = ({ component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('Y_TOKEN');
        if (!data) {
            navigate('/login');
        }
    }, [component]);

    return <>{component}</>;
};

export default AuthGuard;
