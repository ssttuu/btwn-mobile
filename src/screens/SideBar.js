import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import CurrentUser from "../components/CurrentUser";
import GroupsList from "../components/GroupsList";
import {Icon} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import {CREATE_GROUP_SCREEN} from "../RouterTypes";

/*
    CurrentUserComponent
    GroupsListComponent
 */
class SideBar extends Component {

    async componentWillMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                console.log('position', position);
                this.props.updateLocation({location: position})
            },
            (error) => {
                console.log('position:error:', error)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10,
            }
        );

        // const ws = new WebSocket(`${WEBSOCKET_BASE_URL}/ws`);
        // ws.onopen = () => {
        //     ws.send(JSON.stringify({
        //         user_id: user.phone_number,
        //         jwt: jwt,
        //     }))
        // };
        //
        // ws.onmessage = (e) => {
        //     // a message was received
        //     console.log('ws:received', e.data);
        // };
        //
        // ws.onerror = (e) => {
        //     // an error occurred
        //     console.log('ws:error', e.message);
        // };
        //
        // ws.onclose = (e) => {
        //     // connection closed
        //     console.log('ws:close', e.code, e.reason);
        // };
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onAddGroupButtonPress() {
        Actions.push(CREATE_GROUP_SCREEN)
    }

    render() {
        const {scrollViewStyle, groupsHeaderStyle, groupsTextStyle, addGroupStyle} = styles;
        return (
            <ScrollView style={scrollViewStyle}>
                <CurrentUser/>

                <View style={groupsHeaderStyle}>
                    <Text style={groupsTextStyle}>Groups</Text>
                    <TouchableOpacity style={addGroupStyle} onPress={() => this.onAddGroupButtonPress()}>
                        <Icon name='add-circle'/>
                    </TouchableOpacity>
                </View>
                <GroupsList/>
            </ScrollView>
        );
    }
}

const styles = {
    scrollViewStyle: {
        backgroundColor: 'orange'
    },
    groupsHeaderStyle: {
        flexDirection: 'row',
        marginTop: 15,
    },
    groupsTextStyle: {
        flex: 1,
        paddingLeft: 10
    },
    addGroupStyle: {
        flex: 1
    }
};

export default SideBar;
