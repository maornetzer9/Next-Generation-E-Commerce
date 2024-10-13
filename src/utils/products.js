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
                console.error("Failed To Load Product Or Cart", error.message);
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
    const [messages, setMessages] = useState({});
    const { user } = useSelector((state) => state.userReducer);

    // Memoize the addToCart function with useCallback
    const addToCart = useCallback(
        async (product, index) => {
            try 
            {
                const updatedQuantities = {
                    ...quantities,
                    [index]: (quantities[index] || 0) + 1,
                };
                setQuantities(updatedQuantities);

                const { code, message } = await dispatch( addToCartAction(user._id, product, CART_URL_ADD));

                if (code !== 200) 
                {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [index]: {
                            successMessage: "",
                            error: message
                        },
                    }));
                    setQuantities((prev) => ({
                        ...prev,
                        [index]: prev[index] - 1,
                    }));
                } 
                else 
                {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [index]: { successMessage: message, error: "" },
                    }));
                    setQuantities({});
                }
            } 
            catch(error) 
            {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [index]: {
                        successMessage: "",
                        error: messages
                    },
                }));
            }
        },
        [dispatch, quantities, user._id]
    );

    // Memoize the removeFromCart function with useCallback
    const removeFromCart = useCallback(
        async (product, index) => {
            if ((quantities[index] || 1) <= 0)
                return alert("You need to add this product to the cart before removing it.");

            const updatedQuantities = {
                ...quantities,
                [index]: Math.max((quantities[index] || 0) - 1, 0),
            };
            setQuantities(updatedQuantities);

            const { code, message } = await dispatch(
                removeFromCartAction(user._id, product, CART_URL_REMOVE)
            );

            if (code !== 200) 
            {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [index]: { successMessage: "", error: message },
                }));
            } 
            else 
            {
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [index]: {
                        successMessage: "Product quantity updated successfully",
                        error: "",
                    },
                }));
            }
        },
        [dispatch, quantities, user._id]
    ); 


    useEffect(() => {
        if (Object.keys(messages).length > 0) 
        {
            const timeout = setTimeout(() => {
                setMessages({});
            }, 3000);
    
            return () => clearTimeout(timeout); // Clean up the timeout on unmount or when messages change
        }
    }, [messages]);

    return { quantities, messages, addToCart, removeFromCart };
};