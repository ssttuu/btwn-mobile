

import {CREATE_GROUP_SUCCESS} from "../actions/types";

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_GROUP_SUCCESS:
            const group = action.payload;
            return {...state, [group.id]: group};
        default:
            return state;
    }
}