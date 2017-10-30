import LocalContacts from './ContactsLocal.json';
import {GET_LOCAL_CONTACTS, GET_LOCAL_CONTACTS_SUCCESS} from "./types";

var Contacts = require('react-native-contacts');

export const getLocalContacts = () => {
    console.log('Contacts:', Contacts);

    return (dispatch) => {
        dispatch({type: GET_LOCAL_CONTACTS});


        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                console.error(err);
                return;
            }

            console.log(contacts);

        });

        setTimeout(() => {
            dispatch({type: GET_LOCAL_CONTACTS_SUCCESS, payload: LocalContacts})
        }, 1000);
    };
};