import { handleAuth, handleCustomerUpdate, handleDisconnect, handleLogin, handleRegister } from "../routes/users";

export const LOADING = 'LOADING';

export const AUTH = 'AUTH';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const USER_DETAILS_UPDATE = 'USER_DETAILS_UPDATE';
export const USER_DETAILS_UPDATE_FAILURE = 'USER_DETAILS_UPDATE_FAILURE';

export const USER_DISCONNECT = 'USER_DETAILS_UPDATE';
export const USER_DISCONNECT_FAILURE = 'USER_DISCONNECT_FAILURE';


export const authAction = ( token, url ) => async (dispatch) => {
    try
    {
        const response = await handleAuth( token, url );
        const { code, message, isAuth, user } = response;

        if(code !== 200 || !user || !isAuth)
        {
            localStorage.clear();
            dispatch({type: AUTH_FAILURE, payload: message });
            return { code, message };
        }

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(user.token));
        dispatch({type: AUTH, payload: user});
        return { code: 200, isAuth, user };
    }
    catch(err)
    {
        dispatch({type: AUTH_FAILURE, payload: err.message });
        return { code: 3, message: err.message };
    }
};

export const loginAction = (username, password, url) => async (dispatch) => {
    try 
    {
        const response = await handleLogin(username, password, url);
        const { code, message, user } = response;
        
        if (code !== 200 || !user ) 
        {
            localStorage.clear();
            dispatch({ type: LOGIN_FAILURE, payload: message });
            return { code, message };
        }
        const { role, token } = user;

        localStorage.setItem('user', JSON.stringify({ role, token }));
        dispatch({ type: LOGIN, payload: user });
        return { code: 200, user, role };
    } 
    catch(error) 
    {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return { code: 2, message: error.message };
    }
};

export const registerAction = (user, url) => async (dispatch) => {
    try {
        const response = await handleRegister(user, url);

        const { code, message } = response

        if (response.code !== 200) 
        {
            dispatch({ type: REGISTER_FAILURE, payload: message });
            return { code, message };
        }

        dispatch({ type: REGISTER, payload: user });
        return { code, message };
    } 
    catch(err) 
    {
        dispatch({ type: REGISTER_FAILURE, payload: err.message });
        return { code: 1, message: err.message };
    }
};

export const customerUpdateAction = ( form, url ) => async (dispatch) => {
    try
    {
        const response = await handleCustomerUpdate( form, url );
        const { code, message, user } = response;

        if( code !== 200 || !user ) 
        {
            dispatch({ type: USER_DETAILS_UPDATE_FAILURE, payload: message });
            return { code, message };
        }

        dispatch({ type: USER_DETAILS_UPDATE, payload: user });
        return { code, message };
    }
    catch(error)
    {
        console.error('Failed To Update Customer Details', error.message);
        dispatch({ type: USER_DETAILS_UPDATE_FAILURE, payload: error.message });
    }
};

export const disconnectAction = ( token, url ) => async (dispatch) => {
    try
    {
        const response = await handleDisconnect( token, url );
        const { code, message } = response;
        
        if( code !== 200 )
        {
            dispatch({ type: USER_DISCONNECT_FAILURE, payload: message });
            return { code, message };
        }

        localStorage.clear()
        dispatch({ type: USER_DISCONNECT, payload: message });
        return { code, message };
    }
    catch(error)
    {
        console.error('Failed To Disconnect User', error.message);
        
    }
};