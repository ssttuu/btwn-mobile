import React, {Component} from 'react';
import {Text, View} from "react-native";
import GroupChat from "../components/GroupChat";
import GroupMembers from "../components/GroupMembers";
import GroupMapView from "../components/GroupMapView";
import GroupPlaces from "../components/GroupPlaces";

class GroupDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Group Detail`,

    });


    render() {
        return (
            <View style={{flex: 1}}>
                <GroupMembers/>
                <GroupMapView/>
                <GroupPlaces/>
                <GroupChat/>
            </View>
        );
    }
}

export default GroupDetail;
