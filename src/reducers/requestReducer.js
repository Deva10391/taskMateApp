import { ACTION, AUTH_TRUE, AUTH_FALSE, LOAD_FALSE, LOAD_TRUE } from "../actions/types";

const initialState = {
    userData: false,
    load: true,
}

const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION:
            return {
                ...state,
            }
        case AUTH_TRUE:
            return {
                ...state,
                userData: true,
            }
        case AUTH_FALSE:
            return {
                ...state,
                userData: false,
            }
        case LOAD_TRUE:
            return {
                ...state,
                load: true,
            }
        case LOAD_FALSE:
            return {
                ...state,
                load: false,
            }
        default:
            return state;
    }
}

export default requestReducer;