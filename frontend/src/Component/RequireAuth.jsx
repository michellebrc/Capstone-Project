import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({children, redirectTo}) {
    let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);

    return isAuthenticated ? children  : <Navigate to={redirectTo}/>;
    
}
