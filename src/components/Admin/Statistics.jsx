import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadUsersOrders } from "../../actions/orderActions";
import PieGraph from "./PieGraph";
import QtyGraph from "./QtyGraph";
import { motion } from 'framer-motion';
import { headContentAnimation } from "../../utils/motion";
import "../../layout/statistics.css";

export default function Statistics() {

    const LOAD_ADMIN_ORDERS_URL = 'http://localhost:3000/admin/customers';
    
    const dispatch = useDispatch();
    
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
        >

            <Typography 
                variant="h2" 
                sx={{textAlign:'center'}} 
                className="statistics_header" 
            >
                Statistics
            </Typography>

            <Box id="statistics_form" component={"div"}>
                <PieGraph />
                <QtyGraph />
            </Box>
        </motion.div>
    );
}
