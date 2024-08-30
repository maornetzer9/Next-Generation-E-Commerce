import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { loadOrdersAction } from "../../actions/orderActions";
import TableModel from "../Table-Model/TableModel";

export default function Orders() {

    const CUSTOMERS_URL = 'http://localhost:3000/orders';

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer)

    useEffect(() => {
        const fetchOrders = async () => await dispatch( loadOrdersAction( user._id, CUSTOMERS_URL ) );
        fetchOrders();
    }, [ dispatch, user._id ])

    return (
        <Box component={"div"}>
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
        </Box>
    );
}
