import _ from 'lodash';

import {
    GET_CONTACTS, GET_CONTACTS_FAILURE, GET_CONTACTS_SUCCESS, GET_LOCAL_CONTACTS, GET_LOCAL_CONTACTS_FAILURE,
    GET_LOCAL_CONTACTS_SUCCESS, UPLOAD_CONTACTS, UPLOAD_CONTACTS_FAILURE, UPLOAD_CONTACTS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    local: [],
    synced: {
        '+16467249483': {
            phone_number: '+16467249483',
            first_name: 'Stu',
            last_name: 'Schwartz',
            email: 'stupschwartz@gmail.com',
            joined: true,
        },
        '+13398327041': {
            phone_number: '+13398327041',
            first_name: 'Rebecca',
            last_name: 'Tiernan',
            email: 'rebeccatiernan@gmail.com',
            joined: false,
        },
        '+13479932598': {
            phone_number: '+13479932598',
            first_name: 'Alex',
            last_name: 'Harding',
            email: 'alexander.harding@gmail.com',
            joined: true,
        },
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOCAL_CONTACTS:
            return {...state};
        case GET_LOCAL_CONTACTS_SUCCESS:
            return {...state, local: action.payload};
        case GET_LOCAL_CONTACTS_FAILURE:
            return {...state};
        case GET_CONTACTS:
            return {...state};
        case GET_CONTACTS_SUCCESS:
            return {...state, synced: _.keyBy(action.payload.contacts, 'phone_number')};
        case GET_CONTACTS_FAILURE:
            return {...state};
        case UPLOAD_CONTACTS:
            return {...state};
        case UPLOAD_CONTACTS_SUCCESS:
            return {...state, synced: _.keyBy(action.payload.contacts, 'phone_number')};
        case UPLOAD_CONTACTS_FAILURE:
            return {...state};

        default:
            return state;
    }
}