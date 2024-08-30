import axios from "axios"

export const handleLoadCart = async ( userId, CART_URL_LOAD ) => {
    try
    {   
        const { data } = await axios.post(CART_URL_LOAD, { userId });
        return data;
    }
    catch(err)
    {
        console.error(' Failed to load cart: ', err.message);
        throw new Error(' Failed to load cart ');        
    }
};


export const handleAddToCart = async ( userId, product, url ) => {
    try
    {
        const { data } = await axios.post(url, { userId, product});
        return data
    }
    catch(err)
    {
        console.error(' Failed to add new product to the cart: ', err.message);
        throw new Error(' Failed to add new product to the cart ');        
    }
};


export const handleRemoveFromCart = async ( userId, product, url ) => {
    try
    {
        const { data } = await axios.delete(url, { data: { userId, product } });
        return data
    }
    catch(err)
    {
        console.error(' Failed to add new product to the cart: ', err.message);
        throw new Error(' Failed to add new product to the cart ');        
    }
};


export const handleDeleteFromCart = async ( id, _id, url ) => {
    try
    {
        const { data } = await axios.delete(url, { data: {id, _id} } );
        return data
    }
    catch(err)
    {
        console.error(' Failed To Delete From Cart: ', err.message);
        throw new Error(' Failed To Delete From Cart: ');        
    }
};