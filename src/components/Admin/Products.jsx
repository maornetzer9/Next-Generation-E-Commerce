import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsAction, modifyProductsAction } from "../../actions/productActions";
import { FcAddRow } from "react-icons/fc";
import { useDarkMode } from "../../hooks/darkMode";
import { motion } from 'framer-motion';
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { headContentAnimation } from "../../utils/motion";
import { useProductFilter } from "../../hooks/filterModel";
import FilterModel from "../Filter-Model/FilterModel";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import EditIcon from "@mui/icons-material/Edit";
import Product from "./Product";  // Import the Product component
import Loader from "../../UI/Loader";
import _ from 'lodash';
import '../../css/admin-products.css';  // Import the CSS file
import { ORIGIN } from "../../App";

export default function Products() {

    const PRODUCTS_URL_LOAD = `${ORIGIN}/products`;
    const MODIFY_PRODUCT_URL = `${ORIGIN}/products/modify`;

    const { products = [] } = useSelector((state) => state.productsReducer);

    const dispatch = useDispatch();
    const [ darkMode ] = useDarkMode();
    const [isEditing, setIsEditing] = useState(false);
    const [ editData, setEditData ] = useState({});
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();
    
     const {
        categoriesAdmin,
        filteredProducts,
        handlePriceChange,
        handleCategoryChange,
        handleSearchChange,
    } = useProductFilter(products);

    
    const handleEditClick = useCallback((product) => {
        setEditData(product);
        setIsEditing(true);
    }, []);    

    
    const modifyProducts = useCallback(async (product) => {
    try
    { 
        if (_.isEqual(editData, product) && _.isEqual(editData.purchases, product.purchases)) 
        {
            return setIsEditing(false);
        }

        await dispatch(modifyProductsAction(editData, MODIFY_PRODUCT_URL));
        setIsEditing(false);
    }
    catch(error)
    {
        console.error('Failed to modify product.', err.message);
    }

    }, [dispatch, editData]);


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

    const scrollToTop= () => window.scrollTo({ top: 0, behavior: 'smooth'})

    if( loading ) return <Loader />

    return (
        <motion.div
            {...headContentAnimation}
            className="products-container"
        >
            <Typography 
                variant="h2"
                className="product-header"
            >
                Products
            </Typography>

             <FilterModel
                  categories={categoriesAdmin}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onSearch={handleSearchChange}
                />
           
            <Divider sx={{bgcolor: darkMode ? 'white' : 'gray', mt: 5}}/>

            {filteredProducts.map((product, index) => {
                return (
                    <Box 
                        key={index}
                        component={'div'}
                        className="product-box"
                    >
                        <Product 
                            product={product} 
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            editData={editData}
                            setEditData={setEditData}
                        />
                    {isEditing ? (
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<SaveAltIcon />}
                            onClick={ () => modifyProducts(product, index)}
                            className="save-button"
                        >
                            Save
                        </Button>
                            ) : (
                        <Button
                            endIcon={<EditIcon />}
                            variant="contained"
                            onClick={ () => handleEditClick(product, index)}
                            className="save-button"
                        >
                            Edit
                        </Button>
                    )}

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