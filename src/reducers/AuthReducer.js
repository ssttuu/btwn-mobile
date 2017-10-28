import {
    PHONE_CHANGED, VERIFICATION_CODE_CHANGED,
    SEND_VERIFICATION_CODE, SEND_VERIFICATION_CODE_SUCCESS, SEND_VERIFICATION_CODE_FAILURE,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
} from "../actions/types";

const INITIAL_STATE = {
    phone: '+16467249483',
    verificationCode: null,
    user: null,
    jwt: null,
    error: null,
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case PHONE_CHANGED:
            return {...state, phone: action.payload};
        case VERIFICATION_CODE_CHANGED:
            return {...state, verificationCode: action.payload};
        case SEND_VERIFICATION_CODE:
            return {...state, loading: true, error: null};
        case SEND_VERIFICATION_CODE_SUCCESS:
            const {verificationCode} = action.payload;
            return {...state, verificationCode, loading: false, error: null};
        case SEND_VERIFICATION_CODE_FAILURE:
            return {...state, loading: false, error: action.payload};
        case LOGIN:
            return {...state, loading: true, error: null};
        case LOGIN_SUCCESS:
            const {user, jwt} = action.payload;
            return {...state, user, jwt, loading: false, error: null};
        case LOGIN_FAILURE:
            return {...state, user: null, loading: false, error: action.payload};
        default:
            return state;
    }
}
