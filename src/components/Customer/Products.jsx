import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsAction } from "../../actions/productActions";
import { addToCartAction, loadCartAction, removeFromCartAction } from "../../actions/cartActions";
import { Box, Divider, Typography } from "@mui/material";
import FilterModel from "../Filter-Model/FilterModel";
import Loader from "../../UI/Loader";
import Product from "./Product";
import Cart from "./Cart";
import "../../layout/products.css";

export default function Products() {
    
  const CART_URL_ADD = "http://localhost:3000/cart/add";
  const CART_URL_REMOVE = "http://localhost:3000/cart/remove";
  const CART_URL_LOAD = "http://localhost:3000/cart";
  const PRODUCTS_URL_LOAD = "http://localhost:3000/products";

  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [priceRange, setPriceRange] = useState([0, 8]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  const { user } = useSelector((state) => state.userReducer);
  const { cart } = useSelector((state) => state.cartReducer.user);
  const { products, error } = useSelector((state) => state.productsReducer);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const handleCategoryChange = useCallback((category) => setFilteredCategory(category), []);
  const handlePriceChange    = useCallback((range) => setPriceRange(range), []);
  const handleSearchChange   = useCallback((term) => setSearchTerm(term.toLowerCase()), []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadProductsAction(PRODUCTS_URL_LOAD));
      await dispatch(loadCartAction(user._id, CART_URL_LOAD));
    };
    fetchData();
  }, [dispatch, user._id]);

  const addToCart = useCallback(async (product, index) => {
    const updatedQuantities = {
      ...quantities,
      [index]: (quantities[index] || 0) + 1,
    };
    setQuantities(updatedQuantities);

    const response = await dispatch(addToCartAction(user._id, product, CART_URL_ADD));
    const { code, message } = response;

    if (code !== 200) 
    {
      alert(message);
      setQuantities((prev) => ({ ...prev, [index]: prev[index] - 1 }));
    } 
    else 
    {
      setQuantities({});
      alert("Added to the cart successfully");
    }
  }, [dispatch, quantities, user._id]);


  const removeFromCart = useCallback(async (product, index) => {
    if ((quantities[index] || 1) <= 0)
      return alert("You need to add this product to the cart before removing it.");

    const updatedQuantities = {
      ...quantities,
      [index]: Math.max((quantities[index] || 0) - 1, 0),
    };
    setQuantities(updatedQuantities);

    const response = await dispatch(removeFromCartAction(user._id, product, CART_URL_REMOVE));
    const { code, message } = response;

    if (code !== 200) 
    {
      alert(message);
      setQuantities((prev) => ({ ...prev, [index]: prev[index] }));
    } 
    else 
    {
      alert("Product quantity updated successfully");
    }
  }, [dispatch, quantities, user._id]);


  const filteredProducts = useMemo(() =>
      products.filter((product) => {
        const matchesCategory = filteredCategory
          ? product.category === filteredCategory
          : true;

        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        const matchesSearch = searchTerm
          ? product.title.toLowerCase().includes(searchTerm)
          : true;

        return matchesCategory && matchesPrice && matchesSearch;
      }),
    [products, filteredCategory, priceRange, searchTerm]
  );

  if (!products.length) return <Loader />;
  if (error) return <div> Error: {error} </div>;

  return (
    <Box component="div" className="products_form">
      <Box component={'div'}>
        <FilterModel
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearchChange}
        />
      </Box>

      <Typography variant="h2" margin={5}>
        Products
        <Divider />
      </Typography>

      {filteredProducts.map((item, index) => (
        <Box key={index} component="div" className="products_inner_form">
          <Product
            item={item}
            index={index}
            quantity={quantities[index] || 0}
            addToCart={() => addToCart(item, index)}
            removeFromCart={() => removeFromCart(item, index)}
          />
          <Divider />
        </Box>
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
    </Box>
  );
}