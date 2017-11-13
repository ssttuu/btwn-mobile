import {CONTACT_PRESSED, CREATE_GROUP, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS, SEARCH_TEXT_CHANGED} from "./types";
import * as Groups from '../api/Groups';
import {getCurrentUser} from "./AuthActions";
import {Actions} from "react-native-router-flux";

export const contactPressed = ({contactId}) => {
    return {
        type: CONTACT_PRESSED,
        payload: {contactId}
    };
};

export const searchTextChanged = ({searchText}) => {
    return {
        type: SEARCH_TEXT_CHANGED,
        payload: {searchText}
    };
};

export const createGroupPressed = (selected) => async (dispatch) => {
    dispatch({
        type: CREATE_GROUP,
        payload: selected
    });

    let {user, jwt} = await getCurrentUser();
    console.log(user);
    console.log(jwt);

    Groups.create({jwt, userId: user.id, memberIds: selected})
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: CREATE_GROUP_SUCCESS, payload: response});
        })
        .catch((err) => {
            dispatch({type: CREATE_GROUP_FAILURE, payload: err});
        });
};
