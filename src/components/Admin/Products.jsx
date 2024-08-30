import React, { useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsAction, modifyProductsAction } from "../../actions/productActions";
import { FcAddRow } from "react-icons/fc";
import Product from "./Product";  // Import the Product component
import Loader from "../../UI/Loader";
import { useDarkMode } from "../../hooks/darkMode";
import '../../layout/admin-products.css';  // Import the CSS file

export default function Products() {

    const PRODUCTS_URL_LOAD = "http://localhost:3000/products";
    const MODIFY_PRODUCT_URL = "http://localhost:3000/products/modify";

    const [ darkMode ] = useDarkMode();
    
    const { products = [] } = useSelector((state) => state.productsReducer);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchProducts = async () => {
            await dispatch( loadProductsAction( PRODUCTS_URL_LOAD ) );
        }
        fetchProducts();
    }, [ dispatch, products.length ]);

    const handleAddNewProduct = async () => {
        const newProduct = { 
            title: '',
            category: 'Add Category Name',
            description: 'Add Description',
            price: 0,
            thumbnail: 'Add Link To Product Image',
            purchases: [],
            bought: 0,
            rating: 0,
            stock: 0,
            total: []
        }
        await dispatch( modifyProductsAction( newProduct ,MODIFY_PRODUCT_URL ) );
    }


    if( !products.length > 0 ) return <Loader />

    return (
        <Box
            component={'div'}
            className="products-container"
        >
            <Typography 
                variant="h2"
                className="product-header"
            >
                Products
            </Typography>
            <Divider sx={{bgcolor: darkMode ? 'white' : 'gray'}}/>

            {products.map((product, index) => {
                return (
                    <Box 
                        key={index}
                        component={'div'}
                    >
                        <Product product={product} />
                        <Divider sx={{bgcolor: darkMode ? 'white' : 'gray'}}/>
                    </Box>
                )
            })}
            <Box 
                component={'div'} 
                className="add-product-button-container"
            >
                <Button
                    onClick={handleAddNewProduct}
                    variant="contained"
                    endIcon={<FcAddRow size={30} />}
                    className="add-product-button"
                >
                    Add New Product
                </Button>
            </Box>
        </Box>
    );
}
