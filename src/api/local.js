
import {AsyncStorage} from "react-native";

export const getJwt = async () => {
    let currentUser = await AsyncStorage.getItem('current_user');
    console.log('currentUser', currentUser);
    if (currentUser !== null) {
        return JSON.parse(currentUser);
    }
    return {
        user: null,
        jwt: null
    }
};
