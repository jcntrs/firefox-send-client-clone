import {
    SUCCESSFUL_REGISTRATION,
    WRONG_REGISTRATION,
    CLEAN_ALERT
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

        default:
            return state;
    }
}