import {
    SUCCESSFUL_REGISTRATION,
    WRONG_REGISTRATION,
    SUCCESSFUL_LOGIN,
    WRONG_LOGIN,
    CLEAN_ALERT,
    SET_AUTHENTICATED_USER,
    LOG_OUT
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_REGISTRATION:
            return {
                ...state,
                message: action.payload,
                messageType: true
            }
        case WRONG_REGISTRATION:
        case WRONG_LOGIN:
            return {
                ...state,
                message: action.payload,
                messageType: false
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null,
                messageType: null
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticated: null,
                user: null
            }

        default:
            return state;
    }
}