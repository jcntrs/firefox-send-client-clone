import React, { useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import axiosClient from '../../config/axios';
import {
    FILE_UPLOAD,
    SUCCESSFUL_FILE_UPLOAD,
    WRONG_FILE_UPLOAD,
    SUCCESSFUL_LINK_CREATION,
    WRONG_LINK_CREATION,
    SHOW_ALERT,
    CLEAN_ALERT,
    CLEAN_STATE
} from '../../types';

const AppState = ({ children }) => {
    const initialState = {
        name: null,
        originalName: null,
        downloads: null,
        author: null,
        password: null,
        url: null,
        fileMessage: null,
        loading: false,
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const showAlert = message => {
        dispatch({
            type: SHOW_ALERT,
            payload: message
        });

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            });
        }, 5000);
    }

    const uploadFile = async (formData, filename) => {
        dispatch({
            type: FILE_UPLOAD
        });

        try {
            const response = await axiosClient.post('/api/archivos', formData);
            dispatch({
                type: SUCCESSFUL_FILE_UPLOAD,
                payload: {
                    name: response.data.file,
                    originalName: filename
                }
            });
        } catch (error) {
            dispatch({
                type: WRONG_FILE_UPLOAD,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: CLEAN_ALERT
                });
            }, 5000);
        }
    }

    const createLink = async () => {
        const data = {
            name: state.name,
            originalName: state.originalName,
            downloads: state.downloads,
            author: state.author,
            password: state.password
        }

        try {
            const response = await axiosClient.post('/api/enlaces', data);
            dispatch({
                type: SUCCESSFUL_LINK_CREATION,
                payload: response.data.msg
            });
        } catch (error) {
            console.log(error)
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        });
    }

    return (
        <AppContext.Provider
            value={{
                name: state.name,
                originalName: state.originalName,
                downloads: state.downloads,
                author: state.author,
                password: state.password,
                url: state.url,
                fileMessage: state.fileMessage,
                loading: state.loading,
                showAlert,
                uploadFile,
                createLink,
                cleanState
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppState;