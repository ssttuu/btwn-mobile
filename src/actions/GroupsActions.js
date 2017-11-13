import {
    CONTACT_PRESSED, CREATE_GROUP, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS, GET_GROUPS, GET_GROUPS_FAILURE,
    GET_GROUPS_SUCCESS, GROUP_SELECTED,
    SEARCH_TEXT_CHANGED
} from "./types";
import * as Groups from '../api/Groups';
import {getCurrentUser} from "./AuthActions";
import {Actions} from "react-native-router-flux";


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
            Actions.pop();
        })
        .catch((err) => {
            dispatch({type: CREATE_GROUP_FAILURE, payload: err});
        });
};

export const getGroups = () => async (dispatch) => {
    dispatch({type: GET_GROUPS});
    let {user, jwt} = await getCurrentUser();

    Groups.list({jwt, userId: user.id})
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: GET_GROUPS_SUCCESS, payload: response});
        })
        .catch((err) => {
            dispatch({type: GET_GROUPS_FAILURE, payload: err});
        });
};

export const groupSelected = ({groupId}) => async (dispatch) => {
    dispatch({type: GROUP_SELECTED, payload: groupId})
};
