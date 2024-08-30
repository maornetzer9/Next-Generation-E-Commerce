import { initialState } from "./users";
import 
{ 
    ADD_TO_CART,
    ADD_TO_CART_FAILURE, 
    DELETE_FROM_CART, 
    DELETE_FROM_CART_FAILURE, 
    LOAD_CART, REMOVE_FROM_CART, 
    REMOVE_FROM_CART_FAILURE, 
    UPDATE_CART, 
    UPDATE_CART_FAILURE 
} 
from "../actions/cartActions";

export const cartReducer = (state = initialState, action) => {
    switch (action.type) 
    {        
        case LOAD_CART: {
            return {
                ...state,
                user: {
                    ...state.user,
                    cart: {
                        items: action.payload.items,
                        total: action.payload.total
                    }
                },
                error: null
            };
        }
        case ADD_TO_CART: {
            const { newProduct, total } = action.payload; 
            
            const index = state.user.cart.items.findIndex((item) => item.id == newProduct.id);
            
            let updatedItems;
        
            if (index !== -1) 
            {
                updatedItems = state.user.cart.items.map((item, i) => 
                    i == index ? newProduct : item
                );
            } 
            else 
            {
                updatedItems = [...state.user.cart.items, newProduct];
            }
            
            const newState = {
                ...state,
                user: {
                    ...state.user,
                    cart: {
                        items: updatedItems,
                        total: total
                    }
                },
                error: null
            };
            
            return newState;
        }
        case REMOVE_FROM_CART: {
            const { updatedProduct, total } = action.payload;
            
            let updatedItems;
            
            if ( Array.isArray(updatedProduct) )
            {
                updatedItems = updatedProduct;
            } 
            else 
            {
                const index = state.user.cart.items.findIndex((item) => item.id == updatedProduct.id);
                if (index !== -1) 
                {
                    updatedItems = state.user.cart.items.map((item, i) =>
                        i === index ? updatedProduct : item
                    );
                } 
                else 
                {
                    updatedItems = [...state.user.cart.items];
                }
            }
            
            return {
                ...state,
                user: {
                    ...state.user,
                    cart: {
                        items: updatedItems,
                        total,
                    }
                },
                error: null
            };
        }
        case DELETE_FROM_CART: {
            const { cart, total } = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    cart: {
                        items: cart,
                        total
                    }
                },
                error: null
            };
        }
        case UPDATE_CART: {
            return {
                ...state,  
                user: {
                    ...state.user,  
                    cart: {
                        ...state.user.cart,  
                        items: action.payload.items, 
                        total: action.payload.total  
                    },
                    error: null 
                }
            };
        }
        case UPDATE_CART_FAILURE:
        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:
        case DELETE_FROM_CART_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
