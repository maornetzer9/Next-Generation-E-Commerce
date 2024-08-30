import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TableModel from '../Table-Model/TableModel';
import { loadUsersOrders } from '../../actions/orderActions';

export default function Customers() {

    const LOAD_ADMIN_ORDERS_URL = 'http://localhost:3000/admin/customers';

    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchUsersOrders = async () => {
            dispatch( loadUsersOrders( LOAD_ADMIN_ORDERS_URL ) )
        }
        fetchUsersOrders()
    }, [])

  return (
    <Box component={'div'}>
            <TableModel
                label="Full Name"
                labelTwo="Joined At"
                labelThree="Products"
                tableHeight="auto"
                tableWidth="90%"
                adminTable={true}
                cellHeight={200}
            />
    </Box>
  )
}
