import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../hooks/darkMode";
import './table-model.css';
import { motion } from "framer-motion";
import { headContentAnimation, headTextAnimation } from "../../utils/motion";

function TableModel({
    label,
    labelTwo,
    labelThree,
    labelFour,
    adminTable,
    cellHeight,
    tableWidth = "100%",
}) {
    const { user, users } = useSelector((state) => state.ordersReducer);

    const [darkMode] = useDarkMode();

    const usersWithOrders = users.filter((user) => user.orders.length > 0);

    const renderCustomerTableRow = (order, index) => (
        <TableRow key={index} >
            <TableCell 
                className="tableCell" 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                }}>
                <Box 
                    className="tableImageProduct"
                    component="img"
                    alt={order.title} 
                    src={order.thumbnail} 
                    height={100} 
                    width={100} 
                />
                {order.title}
            </TableCell>
            <TableCell className="tableCell"> {order.quantity} </TableCell>
            <TableCell className="tableCell"> {`$${order.total.toFixed(2)}`} </TableCell>
            <TableCell className="tableCell"> {order.createAt} </TableCell>
        </TableRow>
    );

    const renderAdminTableRow = () => (
        usersWithOrders.map((user, index) => (
            <React.Fragment key={index}>
                <TableRow>
                    <TableCell 
                        className="tableCell" 
                        style={{ height: cellHeight }}
                        sx={{
                            color: darkMode ? 'white' : 'black',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            padding: { xs: '8px', sm: '10px', md: '12px' },
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell 
                        className="tableCell"
                        sx={{
                            color: darkMode ? 'white' : 'black',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            padding: { xs: '8px', sm: '10px', md: '12px' },
                        }}
                    >
                        {user.createAt}
                    </TableCell>
                    <TableCell className="tableCell">
                        <TableContainer component={Paper} className="smallTableContainer" sx={{ bgcolor: darkMode ? 'transparent' : 'white'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell 
                                            sx={{
                                                color: darkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                            className="smallTableHead"
                                        >
                                            Product
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: darkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                            className="smallTableHead"
                                        >
                                            Quantity
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: darkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                            className="smallTableHead"
                                        >
                                            Date
                                        </TableCell>
                                        <TableCell 
                                            sx={{
                                                color: darkMode ? 'white' : 'black',
                                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                padding: { xs: '6px', sm: '8px', md: '10px' },
                                            }} 
                                            className="smallTableHead"
                                        >
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.orders.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="tableCell" >
                                                <Box 
                                                    component="img" 
                                                    alt={order.title} 
                                                    src={order.thumbnail} 
                                                    height={70} 
                                                    width={70} 
                                                />
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight={600}
                                                    sx={{
                                                        color: darkMode ? 'white' : 'black',
                                                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                    }}
                                                >
                                                    {order.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: darkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                }} 
                                                className="smallTableCell"
                                            >
                                                {order.quantity}
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: darkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                }} 
                                                className="tableCell"
                                            >
                                                {order.joinedAt}
                                            </TableCell>
                                            <TableCell 
                                                sx={{
                                                    color: darkMode ? 'white' : 'black',
                                                    fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                                }} 
                                                className="tableCell"
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
        <Box key={user._id} sx={{ mt: 4 }} className='user_table_container' >
            <Typography variant="h6">Orders for {user.firstName} {user.lastName}</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} className="userOrdersTableContainer">
                <Table aria-label="user orders table">
                    <TableHead className="tableHeader">
                        <TableRow>
                            <TableCell className="tableCell">{label}</TableCell>
                            <TableCell className="tableCell">{labelTwo}</TableCell>
                            <TableCell className="tableCell">{labelThree}</TableCell>
                            <TableCell className="tableCell">{labelFour}</TableCell>
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
        <motion.div 
            { ...headContentAnimation }
            style={{ width: tableWidth }} 
        >
            {user?.orders.length > 0 && !adminTable && (
                <TableContainer component={Paper} className="tableContainer">
                    <Table aria-label="simple table">
                        <TableHead className="tableHeader" >
                            <TableRow>
                                <TableCell className="tableCell"> {label} </TableCell>
                                <TableCell className="tableCell"> {labelTwo} </TableCell>
                                <TableCell className="tableCell"> {labelThree} </TableCell>
                                <TableCell className="tableCell"> {labelFour} </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.orders.map((order, index) => renderCustomerTableRow(order, index))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {adminTable && (
                <motion.div 
                    drag={ darkMode ? true : false } 
                    {...headTextAnimation} 
                >
                    <Typography 
                        variant="h1" 
                        height={150}
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            marginBottom: { xs: '10px', sm: '20px', md: '30px' },
                        }}
                    >
                        Orders
                    </Typography>
                    { usersWithOrders.length > 0 ? 
                        <TableContainer 
                            component={Paper} 
                            id="tableContainerAdmin"
                            className="tableContainer" 
                            sx={{ bgcolor: darkMode ? 'transparent' : 'white' }}
                        >
                            <Table aria-label="simple table">
                                <TableHead className="tableHeader">
                                    <TableRow>
                                        <TableCell className="tableCell"> Full Name </TableCell>
                                        <TableCell className="tableCell"> Joined At </TableCell>
                                        <TableCell className="tableCell"> Products </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { renderAdminTableRow() }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    : null }
                </motion.div>
            )}

            {!adminTable && usersWithOrders.map(renderUserOrdersTable) }
        </motion.div>
    );
}

export default React.memo(TableModel);