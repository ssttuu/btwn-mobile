import {
    CONTACT_PRESSED, CREATE_GROUP, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS,
    SEARCH_TEXT_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    selected: [],
    members: [],
    searchText: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONTACT_PRESSED:
            const {selected} = state;
            const {contactId} = action.payload;

            console.log('ContactId', contactId);
            let indexOf = selected.indexOf(contactId);
            let newSelection = [...selected];
            if (indexOf >= 0) {
                newSelection.splice(indexOf, 1);
            } else {
                newSelection.push(contactId);
            }
            return {...state, selected: newSelection};
        case SEARCH_TEXT_CHANGED:
            const {searchText} = action.payload;
            return {...state, searchText};
        case CREATE_GROUP:
            return {...state, ...INITIAL_STATE};
        case CREATE_GROUP_SUCCESS:
            return {...state};
        case CREATE_GROUP_FAILURE:
            return {...state};
        default:
            return state;
    }
}
