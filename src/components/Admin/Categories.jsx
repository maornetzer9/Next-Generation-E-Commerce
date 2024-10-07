import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, loadProductsAction } from '../../actions/productActions';
import { useDarkMode } from '../../hooks/darkMode';
import { headTextAnimation } from '../../utils/motion';
import { motion } from 'framer-motion';
import { ORIGIN } from '../../App';
import ErrorIcon from '@mui/icons-material/Error';
import Category from './Category';
import Loader from '../../UI/Loader';
import '../../css/categories.css';

export default function Categories() {
    const { products } = useSelector((state) => state.productsReducer);

    const PRODUCTS_URL_LOAD = `${ORIGIN}/products`;
    const CREATE_CATEGORIES_URL = `${ORIGIN}/products/create`;

    const dispatch = useDispatch();
    const [darkMode] = useDarkMode();
    const [ error, setError ] = useState('');
    const [newCategory, setNewCategory] = useState('');

    // Memoize the categories array to avoid recalculating it on every render
    const categoriesProduct = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);

    // Memoize the onChange handler to avoid unnecessary re-renders
    const handleOnChange = useCallback(({ target: { value } }) => setNewCategory(value) || setError(''), []);

    // Memoize the create category handler to avoid unnecessary re-renders
    const handleCreateCategory = useCallback(async () => {
        try 
        {
            if (newCategory === "") return setError('Please Add Category Name');
            await dispatch( createCategoryAction( newCategory, CREATE_CATEGORIES_URL ) );
            setNewCategory(''); // Clear the input after category creation
        } 
        catch(error) 
        {
            console.error('Failed To Create New Category', error.message);
        }
    }, [newCategory, dispatch]);

    
    useEffect(() => {
        const fetchProducts = async () => {
            try 
            {
                await dispatch(loadProductsAction(PRODUCTS_URL_LOAD));
            } 
            catch(error) 
            {
                console.error('Failed To Load Products Category', error.message);
            }
        };
        fetchProducts();
    }, [dispatch]);

    if (!categoriesProduct.length) return <Loader />;

    return (
        <motion.div
            {...headTextAnimation}
            className='categories_form'
            drag={darkMode ? true : false}
        >
            <Box
                component={'div'}
                className='categories_inner_form'
                sx={{
                    bgcolor: darkMode ? 'transparent' : 'transparent',
                    boxShadow: darkMode ? '1px 1px 2px 1px white' : '1px 1px 2px 1px black'
                }}
            >
                <Typography
                    variant='h2'
                    className="categories_header"
                    sx={{
                        fontWeight: 800,
                        padding: '20px 20px',
                        textAlign: 'center',
                        color: darkMode ? "white" : 'black'
                    }}
                >
                    Categories
                </Typography>

                { categoriesProduct.map((category, index) => <Category key={index} category={category} />) }

                { error ? 
                    <Alert 
                        variant='standard'
                        severity="error"
                        icon={<ErrorIcon/>} 
                    >
                      {error}
                    </Alert>
                : null }

                <Box
                    component={'div'}
                    className='new_category'
                >
                  

                    <TextField value={newCategory} onChange={handleOnChange}
                        sx={{
                            width: '80%',
                            bgcolor: darkMode ? 'white' : ''
                        }}
                        variant='outlined'
                        placeholder='Enter new category'
                    />
                    <Button onClick={handleCreateCategory} variant='contained'> Add </Button>
                </Box>
            </Box>
        </motion.div>
    );
}