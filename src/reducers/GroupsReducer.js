import _ from 'lodash';

import {CREATE_GROUP_SUCCESS, GET_GROUPS, GET_GROUPS_FAILURE, GET_GROUPS_SUCCESS} from "../actions/types";

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_GROUP_SUCCESS:
            const group = action.payload;
            console.log(group);
            return {...state, [group.id]: group};
        case GET_GROUPS:
            return {...state};
        case GET_GROUPS_SUCCESS:
            const contactsById = _.keyBy(action.payload, 'id');
            return {...state, ...contactsById};
        case GET_GROUPS_FAILURE:
            return {...state};
        default:
            return state;
    }
}