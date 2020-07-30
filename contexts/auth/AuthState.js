import React, { useReducer } from 'react';
import { AUTHENTICATED_USER } from '../../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

const AuthState = ({ children }) => {
    const initialState = {
        token: '',
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const createUser = data => {
        console.log('From create user', data)
    }

    const authenticatedUser = name => {
        dispatch({
            type: AUTHENTICATED_USER,
            payload: name
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                createUser,
                authenticatedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthState;