import React, { useEffect } from 'react';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

const UnAuthGuard = ({ component }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem('Y_TOKEN');
        if (!data) {
            navigate('/login');
        }
    }, []);

    return <>{component}</>;
};

export default UnAuthGuard;
