import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authAction } from '../actions/userActions';
import { AnimatePresence, motion } from 'framer-motion'
import { pageTransition } from '../utils/motion';
import Loader from '../UI/Loader';

const ProtectedRoute = ({ allowedRoles }) => {

    const AUTH_URL = 'http://localhost:3000/customers/auth';

    const user = JSON.parse(localStorage.getItem('user'));
    

    const { role, token } = user;

    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user || !token) 
        {
            setLoading(false);
            setIsAuthenticated(false);
            return;
        }

        const handleAuthentication = async () => {
            try 
            {
                const response = await dispatch( authAction(token, AUTH_URL) );
                const { isAuthenticated } = response;

                if (isAuthenticated) 
                {
                    setIsAuthenticated(true);
                } 
                else 
                {
                    alert('Authentication failed');
                    setIsAuthenticated(false);
                }
            } 
            catch(error) 
            {
                console.error('Authentication failed:', error);
                setIsAuthenticated(false);
            } 
            finally 
            {
                setLoading(false);
            }
        };

        handleAuthentication();
    }, [token]);

    if (loading) return <Loader />;

    return (
        <AnimatePresence mode="wait">
          {isAuthenticated && allowedRoles.includes(role) ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Outlet />
            </motion.div>
          ) : (
            <Navigate to="/" />
          )}
        </AnimatePresence>
      );
    };

export default ProtectedRoute;