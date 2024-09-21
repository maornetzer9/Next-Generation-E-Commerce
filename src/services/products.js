import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsAction } from "../actions/productActions";
import { loadCartAction, addToCartAction, removeFromCartAction } from "../actions/cartActions";


const CART_URL_LOAD = `${import.meta.env.VITE_ORIGIN}/cart`;
const PRODUCTS_URL_LOAD = `${import.meta.env.VITE_ORIGIN}/products`;

export const useLoadData = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
        try
        {
            await dispatch(loadProductsAction(PRODUCTS_URL_LOAD));
            await dispatch(loadCartAction(user._id, CART_URL_LOAD));
        }
        catch(error)
        {
            console.error('Failed To Load Product Or Cart', error.message);
        }
    };
    fetchData();
  }, [dispatch, user._id]);
};


const CART_URL_ADD = `${import.meta.env.VITE_ORIGIN}/cart/add`;
const CART_URL_REMOVE = `${import.meta.env.VITE_ORIGIN}/cart/remove`;

// Custom Hook To Handle The Request Logic
export const useCartOperations = () => {
    
    const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const { user } = useSelector((state) => state.userReducer);

// Add New Product To The Cart Handle The Logic Of Cart Component And Product Component
  const addToCart = useCallback(async (product, index) => {
    try
    {
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
    }
    catch(error)
    {
        console.error('Failed To Add New Product To Cart', error.message);
        
    }
  }, [dispatch, quantities, user._id]);


// Remove Product Quantity Handle The Logic Of Cart Component And Product Component.
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
    } else {
      alert("Product quantity updated successfully");
    }
  }, [dispatch, quantities, user._id]);

  return { quantities, addToCart, removeFromCart };
};
