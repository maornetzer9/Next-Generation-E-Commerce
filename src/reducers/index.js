import { combineReducers } from 'redux';
import { userReducer } from './users';
import { productsReducer } from './products';
import { ordersReducer } from './orders';
import { cartReducer } from './cart';

export const rootReducer = combineReducers({
    userReducer,
    cartReducer,
    ordersReducer,
    productsReducer
});