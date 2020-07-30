import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axiosClient from '../../config/axios';
import {
    SUCCESSFUL_REGISTRATION,
    WRONG_REGISTRATION,
    CLEAN_ALERT
} from '../../types';

const AuthState = ({ children }) => {
    const initialState = {
        token: '',
        authenticated: null,
        user: null,
        message: null,
        messageType: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const createUser = async data => {
        try {
            const response = await axiosClient.post('/api/usuarios', data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: WRONG_REGISTRATION,
                payload: error.response.data.msg
            });
        }
        
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 5000);
    }

    /* const authenticatedUser = name => {
        dispatch({
            type: AUTHENTICATED_USER,
            payload: name
        });
    } */

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                messageType: state.messageType,
                createUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthState;