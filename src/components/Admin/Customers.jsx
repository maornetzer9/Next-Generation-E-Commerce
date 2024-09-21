import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TableModel from '../Table-Model/TableModel';
import { loadUsersOrders } from '../../actions/orderActions';
import { ORIGIN } from '../../App';

export default function Customers() {

    const LOAD_ADMIN_ORDERS_URL = `${ORIGIN}/admin/customers`;

    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchUsersOrders = async () => {
            try
            {
            dispatch( loadUsersOrders( LOAD_ADMIN_ORDERS_URL ) )
            }
            catch(error)
            {
                console.error('Failed To Load Users Orders On Admin Panel', error.message);
                
            }
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
