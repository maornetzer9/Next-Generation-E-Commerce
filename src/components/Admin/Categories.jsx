import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, loadProductsAction } from '../../actions/productActions'
import Category from './Category'
import Loader from '../../UI/Loader'
import { useDarkMode } from '../../hooks/darkMode'
import '../../layout/categories.css'

export default function Categories() {
    const { products } = useSelector((state) => state.productsReducer);

    const PRODUCTS_URL_LOAD = "http://localhost:3000/products";
    const CREATE_CATEGORIES_URL = "http://localhost:3000/products/create";

    const dispatch = useDispatch();
    const [ darkMode ] = useDarkMode();
    const [ newCategory, setNewCategory ] = useState('');

    const categoriesProduct = [...new Set(products.map((product) => product.category))];

    const handleOnChange = ( { target: { value } } ) => setNewCategory( value );

    const handleCreateCategory = async () => {

        if( newCategory === "" ) return alert('You Need To Add Category Name');

        await dispatch( createCategoryAction( newCategory, CREATE_CATEGORIES_URL) )
    } 

    useEffect(() => {
        const fetchProducts = async () => {
            await dispatch( loadProductsAction( PRODUCTS_URL_LOAD ) );
        }
        fetchProducts();
    }, [ dispatch, products.length ]);

    if( !categoriesProduct.length ) return <Loader/>

  return (
    <Box 
        component={'div'} 
        className='categories_form'
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
                    padding: '20px 20px', 
                    textAlign:'center',
                    fontWeight: 800, 
                    color: darkMode ? "white" :'black'
            }}
            >
                Categories
            </Typography>            

            {categoriesProduct.map((category, index) => <Category key={index} category={category}/>)}

            <Box 
                component={'div'}
                className='new_category'
            >
                <TextField onChange={handleOnChange} 
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
    </Box>
  )
}
