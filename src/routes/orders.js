import axios from "axios"

// Customer Http Request
export const handleLoadOrders = async ( _id, url ) => {    
    const { data } = await axios.get(url, {
        params: {
            _id: _id, 
        },
    });
    return data;
};


export const handleNewOrder = async ( id,  url ) => {
    try
    {
        const { data } = await axios.post(url, { id });
        return data;
    }
    catch(error)
    {
        console.error('Request Failed To Add New Order', err.message);
    }
};

// Admin Http Request
export const handleLoadUsersOrders = async ( url ) => {
    try
    {
        const { data } = await axios.get( url );
        return data;
    }
    catch(error)
    {
        console.error('Request Failed To Load Users Orders', error.message);
    }
};