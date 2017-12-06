import _ from 'lodash';

import {} from "../actions/types";
import {LOCATION_UPDATED} from "../actions/types";

const INITIAL_STATE = {
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_UPDATED:
            const {coords} = action.payload;
            const region = {...state.region, latitude: coords.latitude, longitude: coords.longitude};
            return {...state, region};
        default:
            return state;
    }
}