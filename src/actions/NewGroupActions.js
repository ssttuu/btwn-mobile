import {CONTACT_PRESSED, CREATE_GROUP, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS, SEARCH_TEXT_CHANGED} from "./types";
import * as Groups from '../api/Groups';
import {getCurrentUser} from "./AuthActions";

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

    let response = null;
    try {
        response = await Groups.create({jwt, userId: user.id, memberIds: selected})
    } catch (e) {
        dispatch({type: CREATE_GROUP_FAILURE})
    }


    let group = await response.json();
    dispatch({type: CREATE_GROUP_SUCCESS, payload: group})
};
