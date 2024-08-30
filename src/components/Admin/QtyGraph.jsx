import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../../hooks/darkMode';
import '../../layout/qty-graph.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function QtyGraph() {

    const { users } = useSelector((state) => state.ordersReducer);

    // Filter users who have at least one order
    const orders = users.filter(user => user.orders.length > 0);

    // Get all unique categories
    const categories = [...new Set(orders.flatMap(user => user.orders.map(order => order.category)))];

    // Organize data by user
    const datasets = orders.map(user => {
        const userCategoryQuantities = categories.map(category => {

            return user.orders
                .filter(order => order.category === category)
                .reduce((sum, order) => sum + order.quantity, 0);
        });

        return {
            label: user.firstName + " " + user.lastName,
            data: userCategoryQuantities,
            backgroundColor: 
                `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                ${Math.floor(Math.random() * 100 + 155)}, 
                ${Math.floor(Math.random() * 100 + 155)}, 0.7)`,  
            borderColor: 
                `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                ${Math.floor(Math.random() * 100 + 155)}, 
                ${Math.floor(Math.random() * 100 + 155)}, 1)`,
            borderWidth: 2,
        };
    });

    const [ darkMode ] = useDarkMode();

    const data = {
        labels: categories,
        datasets: datasets, 
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Customers',
            },
        },
    };

    return (
        <Box 
            id='qty_form' 
            component={'div'}
            sx={{
                color: darkMode ? 'white' : '',
                bgcolor: darkMode ? 'transparent' : 'transparent',
                boxShadow: darkMode ? '1px 1px 2px 1px white' : '1px 1px 2px black',
            }}
        >
            <Typography 
                variant='h4' 
                className='qtyGraph_header'
                sx={{
                    padding:'30px', 
                    color: darkMode ? 'white' : 'black',
                    
                }}>
                Products Quantity Per Customer
            </Typography>

            <Divider sx={{width:"100%", bgcolor: darkMode ? 'white' : 'gray'}} style={{marginBottom: 50}} />

            <Bar style={{marginTop: '20%'}} data={data} options={options} />
        </Box>
    );
}
