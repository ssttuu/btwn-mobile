import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import CurrentUser from "../components/CurrentUser";
import GroupsList from "../components/GroupsList";
import {Icon} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import {CREATE_GROUP_SCREEN} from "../RouterTypes";

const Contacts = require('react-native-contacts');

/*
    CurrentUserComponent
    GroupsListComponent
 */
class SideBar extends Component {

    componentWillMount() {
        console.log(`CONTACTS: ${Contacts}`)
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
        flexDirection: 'row'
    },
    groupsTextStyle: {
        flex: 1
    },
    addGroupStyle: {
        flex: 1
    }
};

export default SideBar;
