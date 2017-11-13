import {combineReducers} from "redux";
import AuthReducer from './AuthReducer';
import GroupsReducer from "./GroupsReducer";
import NewGroupReducer from "./NewGroupReducer";
import ContactsReducer from "./ContactsReducer";
import CurrentGroupReducer from "./CurrentGroupReducer";

export default combineReducers({
    auth: AuthReducer,
    contacts: ContactsReducer,
    newGroup: NewGroupReducer,
    groups: GroupsReducer,
    currentGroup: CurrentGroupReducer,
});
