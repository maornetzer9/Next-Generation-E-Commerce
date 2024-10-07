import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider, useTheme } from "@mui/material";
import { headContentAnimation, headTextAnimation } from "../../utils/motion";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import './table-model.css';

function TableModel({ label, labelTwo, labelThree, labelFour, adminTable, tableWidth = "100%" }) {
    const { user, users } = useSelector((state) => state.ordersReducer);
    const usersWithOrders = users.filter((user) => user.orders.length > 0);
    const theme = useTheme(); // Access the current theme

    // Use theme.palette.mode to determine dark or light mode
    const isDarkMode = theme.palette.mode === 'dark';

    const renderCustomerTableRow = (order, index) => (
        <TableRow key={index}>
            <TableCell 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    padding: { xs: '5px', sm: '8px', md: '12px' },
                }}>
                <Box 
                    component="img"
                    alt={order.title} 
                    src={order.thumbnail} 
                    height={{ xs: 70, sm: 100 }} 
                    width={{ xs: 70, sm: 100 }} 
                />
                <Typography 
                    variant="body2" 
                    sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
                >
                    {order.title}
                </Typography>
            </TableCell>
            <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>{order.quantity}</TableCell>
            <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>{`$${order.total.toFixed(2)}`}</TableCell>
            <TableCell sx={{ fontSize: { xs: '12px', sm: '14px' } }}>{order.createAt}</TableCell>
        </TableRow>
    );

    const renderAdminTableRow = () => (
        usersWithOrders.map((user, index) => (
            <React.Fragment key={index}>
                <TableRow>
                    <TableCell 
                        sx={{
                            color: isDarkMode ? 'white' : 'black',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            padding: { xs: '8px', sm: '10px', md: '12px' },
                            textAlign:'center'
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell 
                        sx={{
                            color: isDarkMode ? 'white' : 'black',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            padding: { xs: '8px', sm: '10px', md: '12px' },
                        }}
                    >
                        {user.createAt}
                    </TableCell>
                    <TableCell>
                        <TableContainer 
                            component={Paper} 
                            sx={{ 
                                bgcolor: isDarkMode ? 'transparent' : 'white', 
                                maxWidth: '100%', 
                                overflow: 'auto', 
                                height:'260px',
                                boxShadow:'1px 1px 2px 1px gray'
                            }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell 
                                            sx={{
                                                color: isDarkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                                textAlign:'center'
                                            }} 
                                        >
                                            Product
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: isDarkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                        >
                                            Quantity
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: isDarkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                        >
                                            Date
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: isDarkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                        >
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.orders.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{overflow: 'hidden', textAlign:'center'}} >
                                                <Box 
                                                    component="img" 
                                                    alt={order.title} 
                                                    src={order.thumbnail} 
                                                    height={{ xs: 50, sm: 70 }} 
                                                    width={{ xs: 50, sm: 70 }} 
                                                />
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight={600}
                                                    sx={{
                                                        color: isDarkMode ? 'white' : 'black',
                                                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                    }}
                                                >
                                                    {order.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: isDarkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                    padding: { xs: 2.5, sm: 3, md:4 },
                                                }} 
                                            >
                                                {order.quantity}
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: isDarkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                }} 
                                            >
                                                {order.joinedAt}
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: isDarkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                }} 
                                            >
                                                {order?.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        ))
    );

    const renderUserOrdersTable = (user) => (
        <Box key={user._id} sx={{ mt: 4 }}>
            <Typography variant="h6">Orders for {user.firstName} {user.lastName}</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer 
                component={Paper} 
                sx={{ 
                    maxWidth: '100%', 
                    overflowX: 'auto', 
                    height:'500px'
                }}>
                <Table aria-label="user orders table">
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{textAlign:'center'}}>{label}</TableCell>
                            <TableCell>{labelTwo}</TableCell>
                            <TableCell>{labelThree}</TableCell>
                            <TableCell>{labelFour}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.orders.map(renderCustomerTableRow)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    return (
        <motion.div {...headContentAnimation} style={{ width: tableWidth, marginTop:100}}>
            {user?.orders.length > 0 && !adminTable && (
                <TableContainer 
                    component={Paper} 
                    sx={{ maxWidth: '100%', overflowX: 'auto', height:'500px' }}
                >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign:'center'}}>{label}</TableCell>
                                <TableCell>{labelTwo}</TableCell>
                                <TableCell>{labelThree}</TableCell>
                                <TableCell>{labelFour}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.orders.map((order, index) => renderCustomerTableRow(order, index))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {adminTable && (
                <motion.div drag={isDarkMode ? true : false} {...headTextAnimation}>
                    <Typography 
                        variant="h1" 
                        height={80}
                        sx={{ fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' } }}
                    >
                        Orders
                    </Typography>
                    {usersWithOrders.length > 0 ? (
                        <TableContainer 
                            component={Paper} 
                            sx={{ 
                                bgcolor: isDarkMode ? 'transparent' : 'white', 
                                boxShadow: isDarkMode ? '1px 1px 2px 1px white' : '1px 1px 2px 1px gray', 
                                maxWidth: '100%', 
                                overflowX: 'auto',
                                ml: '10px'
                             }}
                        >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{color: isDarkMode ? 'white' : 'black', textAlign:'center'}}>Full Name</TableCell>
                                        <TableCell sx={{color: isDarkMode ? 'white' : 'black', textAlign:'center'}}>Joined At</TableCell>
                                        <TableCell sx={{color: isDarkMode ? 'white' : 'black', textAlign:'center'}}>Products</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderAdminTableRow()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : null}
                </motion.div>
            )}

            {!adminTable && usersWithOrders.map(renderUserOrdersTable)}
        </motion.div>
    );
}

export default React.memo(TableModel);
