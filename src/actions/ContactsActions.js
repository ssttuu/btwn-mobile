import LocalContacts from './ContactsLocal.json';
import {
    GET_CONTACTS, GET_CONTACTS_FAILURE, GET_CONTACTS_SUCCESS, GET_LOCAL_CONTACTS, GET_LOCAL_CONTACTS_FAILURE,
    GET_LOCAL_CONTACTS_SUCCESS, UPLOAD_CONTACTS, UPLOAD_CONTACTS_FAILURE, UPLOAD_CONTACTS_SUCCESS
} from "./types";
import * as Users from '../api/Users';
import {getCurrentUser} from "./AuthActions";

const Contacts = require('react-native-contacts');

const getLocalContacts = (dispatch, callback) => {
    dispatch({type: GET_LOCAL_CONTACTS});

    Contacts.getAll(async (err, contacts) => {
        if (err === 'denied') {
            console.error(err);
            return dispatch({type: GET_LOCAL_CONTACTS_FAILURE, payload: err});
        }

        console.log('TheContacts', contacts);
        dispatch({type: GET_LOCAL_CONTACTS_SUCCESS, payload: contacts});

        if (callback !== undefined) {
            callback(contacts);
        }
    });
};

export const uploadContacts = () => async (dispatch) => {
    let {user, jwt} = await getCurrentUser();

    console.log('uploadContactsss');

    getLocalContacts(dispatch, (contacts) => {
        dispatch({type: UPLOAD_CONTACTS});
        Users.uploadContacts({jwt, userId: user.id, contacts})
            .then((response) => response.json())
            .then((body) => {
                dispatch({type: UPLOAD_CONTACTS_SUCCESS, payload: body});
            })
            .catch((err) => {
                dispatch({type: UPLOAD_CONTACTS_FAILURE, payload: err});
            });
    });
};

export const getContacts = () => async (dispatch) => {
    dispatch({type: GET_CONTACTS});

    let {user, jwt} = await getCurrentUser();
    Users.getContacts({jwt, userId: user.id})
        .then((response) => response.json())
        .then((body) => {
            dispatch({type: GET_CONTACTS_SUCCESS, payload: body});
        })
        .catch((err) => {
            dispatch({type: GET_CONTACTS_FAILURE, payload: err})
        });
};
