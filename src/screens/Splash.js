import React, {Component} from 'react';
import {View} from "react-native";
import {FormLabel} from "react-native-elements";
import {Switch} from "react-router-native";
import {getJwt} from "../api/local";

const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

/*
    Check if the user is currently logged in.
     - if so, go to home
     - if not, go to login sequence
 */
class Splash extends Component {
    async componentWillMount() {
        let {jwt} = await getJwt();
        console.log({jwt});
        let claims = parseJwt(jwt);
        let now = Date.now();

        console.log(now);

        if (claims.sub === undefined || claims.exp > now ) {
            this.props.history.push("/enter-phone-number");
        } else {
            // go to groups view
            console.log('go to home screen');
            this.props.history.push({
                pathname: `/users/${claims.sub}/groups`,
            });
        }
    }

    render() {
        return (
            <View>
                <FormLabel>Splash!</FormLabel>
            </View>
        );
    }
}


export default Splash;
