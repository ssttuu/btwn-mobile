import _ from 'lodash';

import {
    CREATE_GROUP, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS, GET_GROUPS, GET_GROUPS_FAILURE,
    GET_GROUPS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return {...state};
        case CREATE_GROUP_SUCCESS:
            const group = action.payload;
            return {...state, [group.phone_number]: group};
        case CREATE_GROUP_FAILURE:
            return {...state};
        case GET_GROUPS:
            return {...state};
        case GET_GROUPS_SUCCESS:
            const contactsByPhoneNumber = _.keyBy(action.payload.groups, 'phone_number');
            return {...state, ...contactsByPhoneNumber};
        case GET_GROUPS_FAILURE:
            return {...state};
        default:
            return state;
    }
}