import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authAction } from '../actions/userActions';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from '../utils/motion';
import Loader from '../UI/Loader';
import { ORIGIN } from '../App';

const ProtectedRoute = ({ allowedRoles }) => {
    const AUTH_URL = `${ORIGIN}/user/auth`;
    const user = JSON.parse(localStorage.getItem('user'));

    // Using optional chaining to safely access the token
    const token = user?.token;

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isAuthorize, setIsAuthorize] = useState(false);

    useEffect(() => {
        // Check for the token immediately
        if (!token) 
        {
            setLoading(false);
            setIsAuthorize(false);
            return;
        }
        
        const handleAuthentication = async () => {
            try 
            {
                const { isAuth, user } = await dispatch(authAction(token, AUTH_URL));

                // Check valid auth and role 
                if (isAuth && allowedRoles.includes(user.role)) 
                {
                    setIsAuthorize(true);
                } 
                else 
                {
                    setIsAuthorize(false);
                }
            } 
            catch(error) 
            {
                console.error('Authentication failed:', error);
                setIsAuthorize(false);
            } 
            finally 
            {
                setLoading(false);
            }
        };

        handleAuthentication();
    }, [token, dispatch, allowedRoles]);

    if (loading) return <Loader />;

    // Redirect to login page if the user not authorize.
    return isAuthorize ? 
        <AnimatePresence mode="wait">
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    : <Navigate to="/" /> 
    
};

export default ProtectedRoute;