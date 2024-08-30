import React, { useEffect } from "react";
import QtyGraph from "./QtyGraph";
import PieGraph from "./PieGraph";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadUsersOrders } from "../../actions/orderActions";
import "../../layout/statistics.css";

export default function Statistics() {

    const LOAD_ADMIN_ORDERS_URL = 'http://localhost:3000/admin/customers';
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchUsersOrders = async () => {
            dispatch( loadUsersOrders( LOAD_ADMIN_ORDERS_URL ) )
        }
        fetchUsersOrders()
    }, [])

    return (
        <Box component={'div'} className="statistics_container">

            <Typography  className="statistics_header" variant="h2" sx={{textAlign:'center'}} >Statistics</Typography>

            <Box id="statistics_form" component={"div"}>
                <PieGraph />
                <QtyGraph />
            </Box>
        </Box>
    );
}
