import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { loadOrdersAction } from "../../actions/orderActions";
import { motion } from "framer-motion";
import { headTextAnimation } from "../../utils/motion";
import { ORIGIN } from "../../App";
import TableModel from "../Table-Model/TableModel";

export default function Orders() {

    const CUSTOMERS_URL = `${ORIGIN}/orders`;

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer)

    useEffect(() => {
        try
        {
            const fetchOrders = async () => await dispatch( loadOrdersAction( user._id, CUSTOMERS_URL ) );
            fetchOrders();
        }
        catch(error)
        {
           console.error('Failed To Load Orders On Customer Side', err.message);
            
        }
    }, [ dispatch, user._id ])
    
    return (
        <motion.div {...headTextAnimation} style={{marginTop:50}} >
            <Typography 
                variant="h1"
                height={50}
                sx={{fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }}}
            >
                Orders
            </Typography>

            <TableModel
                label="Product"
                labelTwo="Quantity"
                labelThree="Total"
                labelFour="Date"
                tableHeight="fit-content"
                tableWidth="90%"
                adminTable={false}
                cellHeight={70}
            />
        </motion.div>
    );
}
