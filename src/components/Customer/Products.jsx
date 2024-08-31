import React, { useMemo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import { headContentAnimation, slideAnimation } from "../../utils/motion";
import { useCartOperations, useLoadData } from "../../services/products";
import { motion } from "framer-motion";
import FilterModel from "../Filter-Model/FilterModel";
import Loader from "../../UI/Loader";
import Product from "./Product";
import Cart from "./Cart";
import "../../layout/products.css";
import { useProductFilter } from "../../hooks/filterModel";


export default function Products() {

  useLoadData();
  const { products, error } = useSelector((state) => state.productsReducer);
  const { cart } = useSelector((state) => state.cartReducer.user);
  const { user } = useSelector((state) => state.userReducer);

  const { quantities, addToCart, removeFromCart } = useCartOperations();

  const {
    categories,
    filteredProducts,
    handlePriceChange,
    handleCategoryChange,
    handleSearchChange,
  } = useProductFilter(products);


  if (!products.length) return <Loader />;
  if (error) return <div> Error: {error} </div>;

  return (
    <motion.div {...headContentAnimation} className="products_form">
      <Box component={'div'}>
        <FilterModel
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearchChange}
        />
      </Box>

        <motion.div {...headContentAnimation}>
            <Typography variant="h2" margin={5}>
              Products
              <Divider />
            </Typography>
        </motion.div>

      {filteredProducts.map((item, index) => (
        item.price  > 0 ? 
            <Box 
                key={index} 
                component="div" 
                className="products_inner_form"
            >
                <Product
                  item={item}
                  index={index}
                  quantity={quantities[index] || 0}
                  addToCart={() => addToCart(item, index)}
                  removeFromCart={() => removeFromCart(item, index)}
                />
              <Divider />
            </Box>
        : null  
      ))}

      {cart.items.length ? (
        <Box component="div">
          <Cart
            user={user}
            addToTheCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Box>
      ) : null}
    </motion.div>
  );
}