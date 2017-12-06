import React, {Component} from 'react';
import {Text, View} from "react-native";
import {Route, Switch} from "react-router-native";
import GroupCreate from "./GroupCreate";
import Groups from "./Groups";


class Home extends Component {
    render() {

        return (
            <View style={{height: "100%"}}>

                <Switch>
                    <Route
                        path="/home"
                        component={Groups}
                    />

                    <Route
                        path="/create-group"
                        component={GroupCreate}
                    />

                </Switch>


            </View>
        );
    }
}

export default Home;
