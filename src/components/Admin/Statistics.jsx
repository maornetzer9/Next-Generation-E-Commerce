import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadUsersOrders } from "../../actions/orderActions";
import PieGraph from "./PieGraph";
import QtyGraph from "./QtyGraph";
import { motion } from 'framer-motion';
import { headContentAnimation } from "../../utils/motion";
import { ORIGIN } from "../../App";
import "../../css/statistics.css";
import { useDarkMode } from "../../hooks/darkMode";

export default function Statistics() {

    const LOAD_ADMIN_ORDERS_URL = `${ORIGIN}/admin/customers`;
    
    const dispatch = useDispatch();

    const { darkMode } = useDarkMode();
    
    useEffect(() => {
        const fetchUsersOrders = async () => {
            try
            {
                await dispatch( loadUsersOrders( LOAD_ADMIN_ORDERS_URL ) )
            }
            catch(error)
            {
                console.error('Failed To Load Users Orders On The Statistics Page', error.message);
            }
        }
        fetchUsersOrders()
    }, [])

    return (
        <motion.div 
            {...headContentAnimation} 
            className="statistics_container"
            style={{marginTop: '42px'}}
        >

            <Typography 
                variant="h2" 
                sx={{textAlign:'center'}} 
                className="statistics_header" 
            >
                Statistics
            </Typography>

            <Divider sx={{mb: 5, width: '96%', bgcolor: darkMode ? 'white' : 'gray'}}/>

            <Box 
                component={"div"}
                id="statistics_form" 
            >
                <PieGraph />
                <QtyGraph />
            </Box>
        </motion.div>
    );
}
