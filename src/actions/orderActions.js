import { handleLoadUsersOrders, handleLoadOrders, handleNewOrder } from "../routes/orders";
import { UPDATE_CART, UPDATE_CART_FAILURE } from "./cartActions";
import { UPDATE_PRODUCT, UPDATE_PRODUCT_FAILURE } from "./productActions";

export const NEW_ORDER = 'NEW_ORDER';
export const NEW_ORDER_FAILURE = 'NEW_ORDER_FAILURE';

export const LOAD_ORDERS = 'LOAD_ORDERS'
export const LOAD_ORDERS_FAILURE = 'LOAD_ORDERS_FAILURE'

export const LOAD_ADMIN_ORDERS = 'LOAD_ADMIN_ORDERS'
export const LOAD_ADMIN_ORDERS_FAILURE = 'LOAD_ADMIN_ORDERS_FAILURE'


// Customer Actions
export const loadOrdersAction = ( _id, url ) => async (dispatch) => {
    try
    {
        const response = await handleLoadOrders( _id, url );
        const { code, message, user, users } = response;

        if( code !== 200 || !user || !users )
        {
            dispatch({ type: LOAD_ORDERS_FAILURE, payload: message });
            return { code, message };
        }

        dispatch({ type: LOAD_ORDERS, payload: { user, users } });
        return { code, message };
    }
    catch(error)
    {
        console.error('Failed To Load Users', error.message);
        dispatch({ type: LOAD_ORDERS_FAILURE, payload: error.message });
    }
};


export const newOrderAction = ( id, url ) => async (dispatch) => {
    try
    {
        const response = await handleNewOrder( id, url );
        const { code, message, orders, cart, newOrder } = response;
            
        if( code !== 200 || !orders || !cart || !newOrder)
        {
            dispatch({ type:  NEW_ORDER_FAILURE,      payload: message })
            dispatch({ type:  UPDATE_CART_FAILURE,    payload: message })
            dispatch({ type:  UPDATE_PRODUCT_FAILURE, payload: message });
            return { code, message };
        }
        
        dispatch({ type: NEW_ORDER,      payload: orders })
        dispatch({ type: UPDATE_CART,    payload: cart })
        dispatch({ type: UPDATE_PRODUCT, payload: newOrder });
        return { code, message };
    }
    catch(error)
    {
        console.error('Failed To Add New Order', error.message);
        dispatch({ type: NEW_ORDER_FAILURE,      payload: error.message });
        dispatch({ type: UPDATE_CART_FAILURE,    payload: error.message });
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message});
    }
    
}

// ----------------------------------------------------------------------- // 

//  Admin Actions 
export const loadUsersOrders = (url) => async (dispatch) => {
    try
    {
        const response = await handleLoadUsersOrders( url );
        const { code, message, users } = response;

        if( code !== 200 || !users )
        {
            dispatch({ type: LOAD_ADMIN_ORDERS_FAILURE, payload: error.message });
            return { code, message };
        }
        
        dispatch({ type: LOAD_ADMIN_ORDERS, payload: users });
        return { code, message };

    }
    catch(error)
    {
        console.error('Failed To Load Users Orders', error.message);
        dispatch({ type: LOAD_ADMIN_ORDERS_FAILURE, payload: error.message });
        
    }
};