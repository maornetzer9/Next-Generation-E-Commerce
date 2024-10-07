import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Typography } from "@mui/material";
import { headContentAnimation } from "../../utils/motion";
import { useCartOperations, useLoadData } from "../../utils/products";
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { useProductFilter } from "../../hooks/filterModel";
import { motion } from "framer-motion";
import FilterModel from "../Filter-Model/FilterModel";
import Loader from "../../UI/Loader";
import Product from "./Product";
import Cart from "./Cart";
import "../../css/products.css";

export default function Products() {

  useLoadData();
  const { products } = useSelector((state) => state.productsReducer);
  const { cart } = useSelector((state) => state.cartReducer.user);
  const { user } = useSelector((state) => state.userReducer);

  const { quantities, messages, addToCart, removeFromCart } = useCartOperations();

  // Memoize scrollToTop function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const {
    categories,
    filteredProducts,
    handlePriceChange,
    handleCategoryChange,
    handleSearchChange,
  } = useProductFilter(products);

  if (!products.length) return <Loader />;


  return (
    <Box component={'div'} className="products_form">
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
        item.price > 0 && (
          <motion.div key={index} className="products_inner_form" {...headContentAnimation}>
            <Product
              item={item}
              index={index}
              quantity={quantities[index] || 0}
              addToCart={() => addToCart(item, index)}
              removeFromCart={() => removeFromCart(item, index)}
              successMessage={messages[index]?.successMessage || ''}
              error={messages[index]?.error || ''}
            />
            <Divider />
          </motion.div>
        )
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

      <Button
        color="inherit"
        variant="text"
        onClick={scrollToTop}  
        startIcon={<MdOutlineArrowCircleUp size={50} />}
        sx={{
          position: 'fixed',
          zIndex: 1,
          top: '94%',
          right: 0,
          outline: 'none !important',
        }}
      >
      </Button>
    </Box>
  );
}