import {
    PHONE_CHANGED, VERIFICATION_CODE_CHANGED,
    SEND_VERIFICATION_CODE, SEND_VERIFICATION_CODE_FAILURE, SEND_VERIFICATION_CODE_SUCCESS, LOGIN, LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from "./types";
import * as Users from "../api/Users";
import {Actions} from "react-native-router-flux";
import {ENTER_VERIFICATION_CODE_SCREEN, MAIN_SCREEN} from "../RouterTypes";
import {AsyncStorage} from "react-native";

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    };
};

export const verificationCodeChanged = (text) => {
    return {
        type: VERIFICATION_CODE_CHANGED,
        payload: text,
    };
};

export const getCurrentUser = async () => {
    let currentUser = await AsyncStorage.getItem('current_user');
    return JSON.parse(currentUser);
};

export const checkCurrentUser = () => async (dispatch) => {
    let {user, jwt} = await getCurrentUser();
    if (user && jwt) {
        dispatch({type: LOGIN_SUCCESS, payload: {user, jwt} });
        Actions.replace(MAIN_SCREEN);
        Actions.drawerOpen();
    }
};

export const sendVerificationCode = ({phoneNumber}) => {
    return (dispatch) => {
        dispatch({
            type: SEND_VERIFICATION_CODE,
            payload: phoneNumber,
        });

        Users.sendVerificationCode({phoneNumber})
            .then((response) => {
                // TODO: this should only be for development and test envs
                const verificationCode = response.headers.get('grpc-metadata-verification-code');
                dispatch({type: SEND_VERIFICATION_CODE_SUCCESS, payload: {verificationCode}});
                Actions.push(ENTER_VERIFICATION_CODE_SCREEN);
            })
            .catch(error => {
                dispatch({type: SEND_VERIFICATION_CODE_FAILURE, payload: error});
            })
    };
};

export const login = ({phoneNumber, code}) => async (dispatch) => {
    dispatch({
        type: LOGIN,
        payload: {phoneNumber, code},
    });

    let response = null;
    try {
        response = await Users.login({phoneNumber, code});
    } catch (error) {
        dispatch({type: LOGIN_FAILURE, payload: error});
        return;
    }

    let {user, jwt} = await response.json();
    await AsyncStorage.setItem('current_user', JSON.stringify({user, jwt}));
    dispatch({type: LOGIN_SUCCESS, payload: {user, jwt}});
    Actions.replace(MAIN_SCREEN);
    Actions.drawerOpen();

};
