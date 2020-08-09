import {
    FILE_UPLOAD,
    SUCCESSFUL_FILE_UPLOAD,
    WRONG_FILE_UPLOAD,
    SUCCESSFUL_LINK_CREATION,
    WRONG_LINK_CREATION,
    SHOW_ALERT,
    CLEAN_ALERT,
    CLEAN_STATE,
    SET_PASSWORD,
    SET_DOWNLOADS
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                fileMessage: action.payload
            }
        case CLEAN_ALERT:
            return {
                ...state,
                fileMessage: null
            }
        case FILE_UPLOAD:
            return {
                ...state,
                loading: true
            }
        case SUCCESSFUL_FILE_UPLOAD:
            return {
                ...state,
                name: action.payload.name,
                originalName: action.payload.originalName,
                loading: false
            }
        case WRONG_FILE_UPLOAD:
            return {
                ...state,
                fileMessage: action.payload,
                loading: false
            }
        case SUCCESSFUL_LINK_CREATION:
            return {
                ...state,
                url: action.payload
            }
        case CLEAN_STATE:
            return {
                name: null,
                originalName: null,
                downloads: null,
                author: null,
                password: null,
                url: null,
                fileMessage: null,
                loading: false,
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case SET_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }

        default:
            return state;
    }
}