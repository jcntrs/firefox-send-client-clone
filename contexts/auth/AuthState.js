import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axiosClient from '../../config/axios';
import authToken from '../../config/authToken';
import {
    SUCCESSFUL_REGISTRATION,
    WRONG_REGISTRATION,
    SUCCESSFUL_LOGIN,
    WRONG_LOGIN,
    CLEAN_ALERT,
    SET_AUTHENTICATED_USER,
    LOG_OUT
} from '../../types';

const AuthState = ({ children }) => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
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

    const authenticateUser = async data => {
        try {
            const response = await axiosClient.post('api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data.token
            });
        } catch (error) {
            dispatch({
                type: WRONG_LOGIN,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 5000);
    }

    const getAuthenticatedUser = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            authToken(token);
        }
        
        try {
            const response = await axiosClient.get('/api/auth');
            console.log(response)
            dispatch({
                type: SET_AUTHENTICATED_USER,
                payload: response.data.user
            });
        } catch (error) {
            dispatch({
                type: WRONG_LOGIN,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: CLEAN_ALERT
                });
            }, 5000);
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                messageType: state.messageType,
                createUser,
                authenticateUser,
                getAuthenticatedUser,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthState;