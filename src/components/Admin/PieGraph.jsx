import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../../hooks/darkMode';
import '../../css/pie-graph.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieGraph() {

    const { users } = useSelector((state) => state.ordersReducer);

    const categoryQuantities = users.reduce((acc, user) => {
        user.orders.forEach(order => {
            const { category } = order; 
            
            if (acc[category]) {
                acc[category] += order.quantity;
            } else {
                acc[category] = order.quantity;
            }
        });
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categoryQuantities),
        datasets: [
            {
                label: 'Total Quantity',
                data: Object.values(categoryQuantities),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 
                    'rgba(54, 162, 235, 0.8)', 
                    'rgba(255, 206, 86, 0.8)', 
                    'rgba(75, 192, 192, 0.8)', 
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)', 
                    'rgba(0, 255, 0, 0.8)',    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 255, 0, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const [ darkMode ] = useDarkMode();

    const options = {
        responsive: true,
        maintainAspectRatio: false,  
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20, 
                },
            },
            title: {
                display: true,
                text: 'Categories',
                padding: {
                    top: 20,
                    bottom: 40, 
                },
            },
        },
        css: {
            padding: {
                top: 10,
                bottom: 50,
                left: 20,
                right: 20,
            },
        },
        elements: {
            arc: {
                borderWidth: 2,
                borderRadius: 5,
                spacing: 5,
            },
        },
        cutout: '20%', 
    };
    
    return (
        <Box 
            id='pie_form'
            component={'div'}
            sx={{
                color: darkMode ? 'white' : '',
                bgcolor: darkMode ? 'transparent' : 'transparent',
                boxShadow: darkMode ? '1px 1px 1px 1px gray' : '1px 1px 2px black',
                padding: { xs: '15px', sm: '20px', md: '30px' }, 
            }}
        > 
            <Typography 
                sx={{
                    padding: '20px',
                    color: darkMode ? 'white' : 'black',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    textAlign: 'center',
                }}
                variant='h3'
            >
                Total Sold Products
            </Typography>

            <Divider sx={{ width: "100%", bgcolor: darkMode ? 'gray' : 'gray', marginBottom: '20px' }} />
            
            <Box 
                component={'div'}
                className='pie_container'
                sx={{ height: { xs: '400px', sm: '500px', md: '500px' } }}
            > 
                <Pie data={data} options={options} />
            </Box>
        </Box>
    );
}
