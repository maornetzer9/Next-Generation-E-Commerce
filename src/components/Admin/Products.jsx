import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsAction, modifyProductsAction } from "../../actions/productActions";
import { FcAddRow } from "react-icons/fc";
import Product from "./Product";  // Import the Product component
import Loader from "../../UI/Loader";
import { useDarkMode } from "../../hooks/darkMode";
import { motion } from 'framer-motion';
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { headContentAnimation } from "../../utils/motion";
import '../../layout/admin-products.css';  // Import the CSS file
import { useProductFilter } from "../../hooks/filterModel";
import FilterModel from "../Filter-Model/FilterModel";

export default function Products() {

    const PRODUCTS_URL_LOAD = "http://localhost:3000/products";
    const MODIFY_PRODUCT_URL = "http://localhost:3000/products/modify";

    const { products = [] } = useSelector((state) => state.productsReducer);

    const [ darkMode ] = useDarkMode();
    const [ loading, setLoading ] = useState();
    
     const {
        categories,
        filteredProducts,
        categoriesAdmin,
        handlePriceChange,
        handleCategoryChange,
        handleSearchChange,
    } = useProductFilter(products);

    const dispatch = useDispatch();

    
    
    const scrollToTop= () => window.scrollTo({ top: 0, behavior: 'smooth'})

    useEffect(() => {
        const fetchProducts = async () => {
            try
            {
                setLoading(true);
                const response = await dispatch( loadProductsAction( PRODUCTS_URL_LOAD ) );
                const { code, message } = response;
                if( code !== 200 ) return <div> Error: { message } </div>
            }
            catch(error)
            {
                console.error('Failed To Dispatch Products For Admin');
            }
            finally
            {
                setLoading(false);
            }
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

    if( loading ) return <Loader />

    return (
        <motion.div
            {...headContentAnimation}
            className="products-container"
        >
             <FilterModel
                  categories={categoriesAdmin}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onSearch={handleSearchChange}
                />
            <Typography 
                variant="h2"
                className="product-header"
            >
                Products
            </Typography>
            <Divider sx={{bgcolor: darkMode ? 'white' : 'gray'}}/>

            {filteredProducts.map((product, index) => {
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
            
                <Button
                    color="inherit"
                    variant="text"
                    onClick={scrollToTop}
                    startIcon={<MdOutlineArrowCircleUp size={50} />}
                    sx={{
                        position:'fixed',
                        zIndex: 1,
                        top: '94%',
                        right: 0,   
                        outline:'none !important'   
                    }}
                >
                </Button>
        </motion.div>
    );
}
