import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { loadOrdersAction } from "../../actions/orderActions";
import TableModel from "../Table-Model/TableModel";
import { motion } from "framer-motion";
import { headTextAnimation } from "../../utils/motion";

export default function Orders() {

    const CUSTOMERS_URL = 'http://localhost:3000/orders';

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
        <motion.div {...headTextAnimation} >
            <Typography 
                variant="h1"
                height={150}
            >
                Orders
            </Typography>
            {/* Customer Table */}
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
