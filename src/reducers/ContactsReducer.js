import _ from 'lodash';

import {
    GET_CONTACTS, GET_CONTACTS_FAILURE, GET_CONTACTS_SUCCESS, GET_LOCAL_CONTACTS, GET_LOCAL_CONTACTS_FAILURE,
    GET_LOCAL_CONTACTS_SUCCESS, UPLOAD_CONTACTS, UPLOAD_CONTACTS_FAILURE, UPLOAD_CONTACTS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    local: [],
    synced: {
        '+16467249483': {
            id: '+16467249483',
            first_name: 'Stu',
            last_name: 'Schwartz',
            phone_number: '+16467249483',
            email: 'stupschwartz@gmail.com',
            joined: true,
        },
        '+13398327041': {
            id: '+13398327041',
            first_name: 'Rebecca',
            last_name: 'Tiernan',
            phone_number: '+13398327041',
            email: 'rebeccatiernan@gmail.com',
            joined: false,
        },
        '+13479932598': {
            id: '+13479932598',
            first_name: 'Alex',
            last_name: 'Harding',
            phone_number: '+13479932598',
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
            console.log('GET_CONTACTS_SUCCESS');
            console.log(action.payload);
            return {...state, synced: _.keyBy(action.payload.contacts, 'id')};
        case GET_CONTACTS_FAILURE:
            return {...state};
        case UPLOAD_CONTACTS:
            return {...state};
        case UPLOAD_CONTACTS_SUCCESS:
            console.log('UPLOAD_CONTACTS_SUCCESS');
            console.log(action.payload);
            return {...state, synced: _.keyBy(action.payload.contacts, 'id')};
        case UPLOAD_CONTACTS_FAILURE:
            return {...state};

        default:
            return state;
    }
}